import { CompileConfig } from "./typing";
import { Command } from "commander";
import {
  getPlugins,
  lessRollupPlugins,
  onlyCssRollupPlugins,
} from "./config/base";
import { rollup } from "rollup";
import ora from "ora";
// @ts-ignore
import cpx from "cpx";
import rimraf from "rimraf";
import { terser } from "rollup-plugin-terser";

const clearLib = () => {
  rimraf.sync("es");
  rimraf.sync("dist");
  rimraf.sync("lib");
};

export const buildUI = async (options: CompileConfig, command: Command) => {
  // 清空包
  clearLib();
  // 打包UI库
  const { plugins, external } = getPlugins({
    type: "ui",
    config: options,
    isOnly: false,
  });
  // 库打包
  const spinner = ora().start("正在打包库...\n");
  try {
    const outputData = await rollup({
      input: [
        `${options.dir}/**/*.tsx`,
        `${options.dir}/**/*.ts`,
        `!${options.dir}/**/__tests__`,
        `!${options.dir}/**/*.d.ts`,
        `!${options.dir}/**/docs`,
        `!${options.dir}/**/style`,
      ],
      external,
      plugins,
    });
    await Promise.all([
      outputData.write({
        format: "esm",
        dir: "es",
        chunkFileNames: "_chunks/[hash].js",
      }),
      outputData.write({
        format: "cjs",
        dir: "lib",
        chunkFileNames: "_chunks/[hash].js",
        exports: "named",
      }),
    ]);
    spinner.succeed("库打包完成");
  } catch (e) {
    console.log(e);
    spinner.fail("库打包失败");
  }
  // 打包less
  const { plugins: plugins1 } = lessRollupPlugins({
    config: options,
    style: true,
  });
  const spinner1 = ora().start("开始打包样式...\n");
  try {
    const lessRollupOut = await rollup({
      input: [
        `${options.dir}/**/style/index.ts`,
        `!${options.dir}/**/__tests__`,
      ],
      plugins: plugins1,
      external: [...external],
    });

    await Promise.all([
      lessRollupOut.write({
        dir: "es",
        format: "esm",
        assetFileNames: "[name].css",
      }),
      lessRollupOut.write({
        dir: "lib",
        format: "cjs",
        assetFileNames: "[name].css",
      }),
    ]);
    const { plugins: plugins2 } = lessRollupPlugins({
      config: options,
      style: false,
    });

    const styleRollupOut = await rollup({
      input: [
        `${options.dir}/**/style/index.ts`,
        `!${options.dir}/**/__tests__`,
      ],
      plugins: plugins2,
      external: [...external, /^\./],
    });
    await Promise.all([
      styleRollupOut.write({
        dir: "es",
        format: "esm",
      }),
      styleRollupOut.write({
        dir: "lib",
        format: "cjs",
      }),
    ]);

    spinner1.succeed("样式打包成功");
  } catch (e) {
    console.log(e);
    spinner1.fail("样式打包失败");
  }
  // 移动less和css
  cpx.copySync(`${options.dir}/**/*.less`, "lib");
  cpx.copySync(`${options.dir}/**/*.less`, "es");
  // umd
  const spinner2 = ora().start("开始打独立包...\n");
  try {
    const { plugins, external, global } = getPlugins({
      type: "ui",
      config: options,
      isOnly: true,
    });
    const onlyBuild = await rollup({
      plugins,
      external,
      input: [`${options.dir}/index.ts`],
    });
    await Promise.all([
      onlyBuild.write({
        exports: "named",
        name: options.name,
        format: "umd",
        globals: global,
        file: `dist/${options.name}.js`,
      }),
      onlyBuild.write({
        exports: "named",
        name: options.name,
        globals: global,
        format: "umd",
        plugins: [terser()],
        file: `dist/${options.name}.min.js`,
      }),
    ]);
    const { plugins: pluginsCss } = onlyCssRollupPlugins({ config: options });
    const cssOnlyBuild = await rollup({
      input: [`${options.dir}/style.ts`],
      plugins: pluginsCss,
      external,
    });
    await cssOnlyBuild.write({
      name: options.name,
      format: "esm",
      exports: "named",
      globals: global,
      file: "dist/css.js",
      assetFileNames: `${options.name}.css`,
    });
    // 删除无用的css.js文件
    rimraf.sync("dist/css.js");
    spinner2.succeed("打包成功");
  } catch (e) {
    console.log(e);
    spinner2.fail("打包失败");
  }
};
