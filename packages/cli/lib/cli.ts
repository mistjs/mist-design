import { Command } from "commander";
import * as process from "process";
// import pkg from "../package.json";
import { compile } from "./plugins/compile";
const program = new Command("mist");
const pkg = {
  version: "1.0.0",
};
program
  .usage("<command> [options]")
  .helpOption("-h,--help", "mist cli 帮助文档")
  .version(pkg.version, "-v,--version", "查看版本信息");

program
  .command("compile [type]")
  .description("项目编译工具")
  .option("-d, --dir <dir>", "打包项目的输入的目录", "src")
  .option("-o, --out <out>", "打包项目输出的目录", "dist")
  .option(
    "-f, --format <format>",
    "打包输出的类型，支持类型有esm,cjs,umd",
    "esm,cjs"
  )
  .option("-w, --watch", "是否开启监听模式", false)
  .action(compile);

program.parse(process.argv);
