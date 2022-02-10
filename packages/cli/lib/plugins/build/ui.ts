import rimraf from "rimraf";
import {
  SRC_DIR,
  ES_DIR,
  LIB_DIR,
  DECLARATION_FILE,
  setMistBuildDir,
  setMistBuildName,
  DIST_DIR,
  getMistBuildName,
} from "../../common/constant";
import { copy, existsSync, outputFileSync, readdir } from "fs-extra";
import execa from "execa";
import { join } from "path";
import {
  isAsset,
  isDemoDir,
  isDir,
  isScript,
  isSfc,
  isStyle,
  isStyleFileTS,
  isTestDir,
} from "../../common";
import { compileSfc } from "../../compiler/compile-sfc";
import { compileScript } from "../../compiler/compile-script";
import { compileStyle } from "../../compiler/compile-style";
import { Format } from "esbuild";
import { compileBundles } from "../../compiler/compile-bundles";
import { genComponentLessFile, genCssInJs } from "../../compiler/gen-css";
import { BuildOptions } from "./types";
import ora, { Ora } from "ora";
const clear = () => {
  rimraf.sync("dist");
  rimraf.sync("es");
  rimraf.sync("lib");
};

function exit(e: unknown, spinner: Ora, msg = "加载失败") {
  console.log(e);
  spinner.fail(msg);
  process.exit();
}

const copySource = async () => {
  const spinner = ora().start("资源加载中...\n");
  try {
    await Promise.all([copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)]);
    genComponentLessFile();
    spinner.succeed("资源加载完成");
  } catch (e) {
    exit(e, spinner, "资源加载失败");
  }
};

const preCompileDir = async (dir: string) => {
  const files = await readdir(dir);
  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename);
      if (isDemoDir(filePath) || isTestDir(filePath)) {
        return rimraf.sync(filePath);
      }
      if (isStyleFileTS(filePath)) {
        return genCssInJs(filePath);
      }
      if (isDir(filePath)) {
        return preCompileDir(filePath);
      }
      if (isSfc(filePath)) {
        return compileSfc(filePath);
      }
      return Promise.resolve();
    })
  );
};

const buildTypeDeclarations = async () => {
  const spinner1 = ora().start("正在检查资源状态...");
  try {
    await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)]);
    spinner1.succeed("资源状态检查成功");
  } catch (e) {
    exit(e, spinner1, "资源状态检查失败");
  }
  if (existsSync(DECLARATION_FILE)) {
    const spinner = ora().start("类型构建中...");
    try {
      await execa("tsc", ["-p", DECLARATION_FILE]);
      spinner.succeed("类型构建完成");
    } catch (e) {
      exit(e, spinner, "类型构建失败");
    }
  }
};

const buildESMOutputs = async () => {
  const spinner = ora().start("ESM构建中...");
  try {
    await compileDir(ES_DIR, "esm");
    spinner.succeed("ESM构建成功");
  } catch (e) {
    exit(e, spinner, "ESM构建失败");
  }
};

const buildCJSOutputs = async () => {
  const spinner = ora().start("LIB构建中...");
  try {
    await compileDir(LIB_DIR, "cjs");
    spinner.succeed("LIB构建成功");
  } catch (e) {
    exit(e, spinner, "LIB构建失败");
  }
};

const buildBundledOutputs = async () => {
  const spinner = ora().start("Bundle构建中");
  try {
    await compileBundles();
    spinner.succeed("Bundle构建成功");
  } catch (e) {
    exit(e, spinner, "Bundle构建失败");
  }
};

const genBundleLessOutPuts = async () => {
  const spinner = ora().start("处理全局样式...");
  try {
    // 输出样式
    const baseLess = `@import '../lib/style/index.less';
@import '../lib/style/components.less';`;
    const darkLess = `@import '../lib/style/dark.less';
@import '../lib/style/components.less';`;
    const baseFileDir = join(
      DIST_DIR,
      (getMistBuildName() || "MistUI") + ".less"
    );
    const darkFileDir = join(
      DIST_DIR,
      (getMistBuildName() || "MistUI") + ".dark.less"
    );
    outputFileSync(baseFileDir, baseLess);
    outputFileSync(darkFileDir, darkLess);
    await compileStyle(baseFileDir);
    await compileStyle(darkFileDir);
    spinner.succeed("全局样式处理成功");
  } catch (e) {
    exit(e, spinner, "全局样式处理失败");
  }
};

async function compileFile(filePath: string, format: Format) {
  if (isScript(filePath)) {
    return compileScript(filePath, format);
  }
  if (isStyle(filePath)) {
    return compileStyle(filePath);
  }
  if (isAsset(filePath)) {
    return Promise.resolve();
  }
  return rimraf.sync(filePath);
}
async function compileDir(dir: string, format: Format) {
  const files = await readdir(dir);
  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename);
      return isDir(filePath)
        ? compileDir(filePath, format)
        : compileFile(filePath, format);
    })
  );
}

const init = (options: BuildOptions) => {
  const spinner = ora().start("正在初始化");
  clear();
  setMistBuildDir(options.dir);
  setMistBuildName(options.name);
  spinner.succeed("完成初始化");
};

export const UI = async (
  options: BuildOptions = { dir: "src", name: "MistUI" }
) => {
  init(options);
  await copySource();
  await buildTypeDeclarations();
  await buildESMOutputs();
  await buildCJSOutputs();
  await buildBundledOutputs();
  await genBundleLessOutPuts();
};
