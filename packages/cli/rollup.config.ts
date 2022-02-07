import { defineConfig } from "rollup";
// @ts-ignore
import multiPlugin from "rollup-plugin-multi-input";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";
const external = Object.keys(pkg.dependencies);
export default defineConfig({
  input: ["lib/**/*.ts"],
  external: [
    ...external,
    "rollup-plugin-vue",
    "fs/promises",
    "path",
    "process",
  ],
  output: [
    {
      dir: "dist/es",
      format: "esm",
    },
    {
      dir: "dist/lib",
      format: "cjs",
    },
  ],
  plugins: [
    alias({
      entries: [],
    }),
    multiPlugin({ relative: "lib" }),
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
      },
    }),
  ],
});
