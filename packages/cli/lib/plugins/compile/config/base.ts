import { BaseConfig } from "../typing";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";

// 设置基本的打包配置文件
export const baseConfig = ({ type, config }: BaseConfig) => {
  // 获取基础的配置文件的信息

  // 此处处理配置文件
  const basePlugins = [nodeResolve(), json(), commonjs()];
};

export const getPlugins = () => {
  // 配置插件
};
