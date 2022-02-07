import { BaseConfig, CompileConfig } from "../typing";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
// @ts-ignore
import multiPlugin from "rollup-plugin-multi-input";
import typescript from "rollup-plugin-typescript2";
import { resolve } from "path";
import * as process from "process";
import { readJsonSync } from "fs-extra";
import babel from "@rollup/plugin-babel";
import esbuild from "rollup-plugin-esbuild";
import ignoreImport from "rollup-plugin-ignore-import";
// @ts-ignore
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { globalLib } from "../../../constant";
import vuePlugin from "rollup-plugin-vue";
import styles from "rollup-plugin-styles";

export type externalType = (string | RegExp)[];

// 设置基本的打包配置文件
export const getPlugins = ({ type, config, isOnly = false }: BaseConfig) => {
  // 获取当前的package.json
  const pkg = readJsonSync(resolve(process.cwd(), "package.json"), "utf-8");
  let external: externalType = [];
  if (pkg) {
    const deps = Object.keys(pkg.dependencies || {});
    const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
    external = [...external, ...deps, ...externalPeerDeps];
  }
  // 此处处理配置文件
  let basePlugins = [nodeResolve(), json(), commonjs()];
  if (!isOnly) {
    basePlugins.unshift(multiPlugin({ relative: config.dir }));
  }
  if (type === "ui") {
    // UI库特殊处理
    external.push(/loadsh/);
    external.push(/@babel\/runtime/);
    const UIPlugins = [
      vuePlugin(),
      esbuild({
        target: "esnext",
        minify: false,
        jsx: "preserve",
      }),
      babel({
        babelHelpers: "runtime",
        extensions: [...DEFAULT_EXTENSIONS, ".vue", ".ts", ".tsx"],
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
            },
          ],
        ],
        plugins: ["@vue/babel-plugin-jsx", "@babel/plugin-transform-runtime"],
      }),
      ignoreImport({
        extensions: [".less", ".css"],
      }),
    ];
    basePlugins = [...basePlugins, ...UIPlugins];
    if (!isOnly) {
      basePlugins.push(
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
            },
          },
        })
      );
    }
  } else {
    external = [...external, "path", "fs", "fs/promise", "process"];
  }
  const global: Record<string, any> = {};
  if (external && external.length > 0) {
    for (const externalElement of external) {
      if (typeof externalElement === "string") {
        if (Reflect.has(globalLib, externalElement)) {
          // @ts-ignore
          global[externalElement] = globalLib[externalElement];
        } else {
          global[externalElement] = externalElement;
        }
      }
    }
  }
  return { plugins: basePlugins, external, global };
};

export const lessRollupPlugins = ({
  config,
  style = false,
}: {
  config: CompileConfig;
  style: boolean;
}) => {
  const basePlugin = [
    multiPlugin({ relative: config.dir }),
    nodeResolve(),
    json(),
    commonjs(),
    esbuild({
      target: "esnext",
      minify: false,
    }),
  ];
  if (style) {
    basePlugin.push(
      styles({
        mode: "extract",
      })
    );
  }
  return {
    plugins: basePlugin,
  };
};

export const onlyCssRollupPlugins = ({ config }: { config: CompileConfig }) => {
  const basePlugin = [
    nodeResolve(),
    json(),
    commonjs(),
    esbuild({
      target: "esnext",
      minify: false,
    }),
    styles({
      mode: "extract",
    }),
  ];
  return {
    plugins: basePlugin,
  };
};
