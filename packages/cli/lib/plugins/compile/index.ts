import { Command } from "commander";
import { BuildType, CompileConfig } from "./typing";
import { buildLib } from "./lib";
import { buildUI } from "./ui";

export const compile = (...args: any[]) => {
  // 获取command
  const command: Command = args[args.length - 1];
  // 获取打包参数
  const params = args.slice(0, args.length - 1);
  // 获取打包类型
  const buildType: BuildType = params[0];
  // 获取打包的配置项
  const config: CompileConfig = params[1];
  // 获取当前的版本信息
  if (buildType === "lib") {
    buildLib(config, command);
  } else {
    buildUI(config, command);
  }
};
