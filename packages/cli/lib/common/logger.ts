import ora from "ora";
import chalk from "chalk";
// @ts-ignore
import consola from "consola";
import { ROOT } from "./constant";

export function slimPath(path: string) {
  return chalk.yellow(path.replace(ROOT, ""));
}

export function errorConsole(str: string) {
  return console.log(chalk.red(str));
}

export { ora, consola };
