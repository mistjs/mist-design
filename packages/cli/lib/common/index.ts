import fse from "fs-extra";
import { sep, join } from "path";
import { SRC_DIR } from "./constant";

const { lstatSync, existsSync, readdirSync, readFileSync } = fse;

export const EXT_REGEXP = /\.\w+$/;
export const SFC_REGEXP = /\.(vue)$/;
export const DEMO_REGEXP = new RegExp("\\" + sep + "demo$");
export const TEST_REGEXP = new RegExp("\\" + sep + "test$");
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i;
export const STYLE_REGEXP = /\.(css|less|scss)$/;
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export const JSX_REGEXP = /\.(j|t)sx$/;
export const ENTRY_EXTS = ["js", "ts", "tsx", "jsx", "vue"];
export const STYLE_TS_FILE = new RegExp("style/index.(ts|tsx)$");

export function removeExt(path: string) {
  return path.replace(".js", "");
}

export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext);
}

export function hasDefaultExport(code: string) {
  return code.includes("export default") || code.includes("export { default }");
}

export function getComponents() {
  const EXCLUDES = [".DS_Store"];
  const dirs = readdirSync(SRC_DIR);

  return dirs
    .filter((dir) => !EXCLUDES.includes(dir))
    .filter((dir) =>
      ENTRY_EXTS.some((ext) => {
        const path = join(SRC_DIR, dir, `index.${ext}`);
        if (existsSync(path)) {
          return hasDefaultExport(readFileSync(path, "utf-8"));
        }

        return false;
      })
    );
}

export const isDir = (dir: string) => lstatSync(dir).isDirectory();
export const isDemoDir = (dir: string) => DEMO_REGEXP.test(dir);
export const isTestDir = (dir: string) => TEST_REGEXP.test(dir);
export const isAsset = (path: string) => ASSET_REGEXP.test(path);
export const isSfc = (path: string) => SFC_REGEXP.test(path);
export const isStyle = (path: string) => STYLE_REGEXP.test(path);
export const isScript = (path: string) => SCRIPT_REGEXP.test(path);
export const isJsx = (path: string) => JSX_REGEXP.test(path);
export const isStyleFileTS = (path: string) => STYLE_TS_FILE.test(path);

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;

export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function pascalize(str: string): string {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  );
}

export function decamelize(str: string, sep = "-") {
  return str
    .replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2")
    .toLowerCase();
}

export function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

export type ModuleEnv = "esmodule" | "commonjs";
export type NodeEnv = "production" | "development" | "test";
export type BuildTarget = "site" | "package";

export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}
