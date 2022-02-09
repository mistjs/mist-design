import rimraf from "rimraf";
import {
  SRC_DIR,
  ES_DIR,
  LIB_DIR,
  DECLARATION_FILE,
} from "../../common/constant";
import { copy, existsSync, readdir } from "fs-extra";
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
import { genCssInJs } from "../../compiler/gen-css";
const clear = () => {
  rimraf.sync("dist");
  rimraf.sync("es");
  rimraf.sync("lib");
};

const copySource = () => {
  return Promise.all([copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)]);
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
  await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)]);
  if (existsSync(DECLARATION_FILE)) {
    await execa("tsc", ["-p", DECLARATION_FILE]);
  }
};

const buildESMOutputs = async () => {
  await compileDir(ES_DIR, "esm");
};

const buildCJSOutputs = async () => {
  await compileDir(LIB_DIR, "cjs");
};

const buildBundledOutputs = async () => {
  await compileBundles();
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
export const build = async () => {
  clear();
  await copySource();
  await buildTypeDeclarations();
  await buildESMOutputs();
  await buildCJSOutputs();
  await buildBundledOutputs();
};
