import { Command } from "commander";
import * as process from "process";
import pkg from "../package.json";
import { build } from "./plugins/build";
const program = new Command("mist");

program
  .usage("<command> [options]")
  .helpOption("-h,--help", "mist cli 帮助文档")
  .version(pkg.version, "-v,--version", "查看版本信息");

program
  .command("build [type]")
  .description("项目编译工具")
  .option("-d, --dir <dir>", "打包项目的输入的目录", "src")
  .option("-n, --name <name>", "打包项目输出的目录", "index")
  .action(build);

program.parse(process.argv);
