import fs from "fs/promises";
import { cwd } from "process";
import { resolve } from "path";
export const DEFAULT_CONFIG_BASE = "mist.config";
export async function getConfigPath(config: string | true): Promise<string> {
  // 获取配置文件的目录地址
  if (config === true) {
    return resolve(await findConfigFileNameInCwd());
  }
  return resolve(config);
}

async function findConfigFileNameInCwd(): Promise<string> {
  const filesInWorkingDir = new Set(await fs.readdir(cwd()));
  for (const extension of ["mjs", "cjs", "ts"]) {
    const fileName = `${DEFAULT_CONFIG_BASE}.${extension}`;
    if (filesInWorkingDir.has(fileName)) return fileName;
  }
  return `${DEFAULT_CONFIG_BASE}.js`;
}
