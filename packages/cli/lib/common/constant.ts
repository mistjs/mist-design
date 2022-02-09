import { existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

function findRootDir(dir: string): string {
  if (existsSync(join(dir, "vant.config.mjs"))) {
    return dir;
  }

  const parentDir = dirname(dir);
  if (dir === parentDir) {
    return dir;
  }

  return findRootDir(parentDir);
}

// Root paths
export const CWD = process.cwd();
export const ROOT = CWD;
export const ES_DIR = join(ROOT, "es");
export const LIB_DIR = join(ROOT, "lib");
export const DIST_DIR = join(ROOT, "dist");
export const DOCS_DIR = join(ROOT, "docs");
export const VETUR_DIR = join(ROOT, "vetur");
export const SITE_DIST_DIR = join(ROOT, "site-dist");
export const DECLARATION_FILE = join(ROOT, "tsconfig.declaration.json");
export const PACKAGE_JSON_FILE = join(ROOT, "package.json");

// Relative paths
// const __dirname = dirname(fileURLToPath(import.meta.url));
export const CJS_DIR = join(__dirname, "..", "..", "..", "cjs");
// export const DIST_DIR = join(__dirname, "..", "..", "dist");
export const CONFIG_DIR = join(__dirname, "..", "config");
export const SITE_SRC_DIR = join(__dirname, "..", "..", "site");

// Dist files
export const PACKAGE_ENTRY_FILE = join(DIST_DIR, "package-entry.js");
export const PACKAGE_STYLE_FILE = join(DIST_DIR, "package-style.css");

export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, "style-deps.json");

// Config files
export const POSTCSS_CONFIG_FILE = join(CJS_DIR, "postcss.config.cjs");
export const JEST_CONFIG_FILE = join(CJS_DIR, "jest.config.cjs");

export const SCRIPT_EXTS = [".js", ".jsx", ".vue", ".ts", ".tsx"];
export const STYLE_EXTS = [".css", ".less", ".scss"];

export function getPackageJson() {
  const rawJson = readFileSync(PACKAGE_JSON_FILE, "utf-8");
  return JSON.parse(rawJson);
}

// function getSrcDir() {
//   const vantConfig = getVantConfig();
//   const srcDir = vantConfig.build?.srcDir;
//
//   if (srcDir) {
//     if (isAbsolute(srcDir)) {
//       return srcDir;
//     }
//
//     return join(ROOT, srcDir);
//   }
//
//   return join(ROOT, "src");
// }

export const SRC_DIR = join(ROOT, "components");
export const STYLE_DIR = join(SRC_DIR, "style");
