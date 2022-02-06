import { defineConfig } from "rollup";
// @ts-ignore
import multiPlugin from "rollup-plugin-multi-input";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
const external = Object.keys(pkg.dependencies);
export default defineConfig({
  input: ["lib/**/*.ts"],
  external: [...external, "fs/promises", "path", "process"],
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
    multiPlugin({ relative: "lib" }),
    typescript({
      tsconfigOverride: {
        include: ["lib/**/*.ts"],
        compilerOptions: {
          declaration: true,
        },
      },
    }),
    nodeResolve(),
    commonjs(),
    json(),
  ],
});
