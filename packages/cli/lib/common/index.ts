import fse from 'fs-extra';
import { join, sep } from 'path';
import { CWD, SRC_DIR } from './constant';
import findWorkspaceDir from '@pnpm/find-workspace-dir';
import { PackageSelector, readProjects } from '@pnpm/filter-workspace-packages';
import yaml from 'yaml';
import { FilterMonorepoPackage } from '../typing';

const { lstatSync, existsSync, readdirSync, readFileSync } = fse;

export const EXT_REGEXP = /\.\w+$/;
export const SFC_REGEXP = /\.(vue)$/;
export const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$');
export const TEST_REGEXP = new RegExp('\\' + sep + 'test$');
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i;
export const STYLE_REGEXP = /\.(css|less|scss)$/;
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export const JSX_REGEXP = /\.(j|t)sx$/;
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];
export const STYLE_TS_FILE = new RegExp('style/index.(ts|tsx)$');

export function removeExt(path: string) {
  return path.replace('.js', '');
}

export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext);
}

export function hasDefaultExport(code: string) {
  return code.includes('export default') || code.includes('export { default }');
}

export function getComponents() {
  const EXCLUDES = ['.DS_Store'];
  const dirs = readdirSync(SRC_DIR);

  return dirs
    .filter(dir => !EXCLUDES.includes(dir))
    .filter(dir =>
      ENTRY_EXTS.some(ext => {
        const path = join(SRC_DIR, dir, `index.${ext}`);
        if (existsSync(path)) {
          return hasDefaultExport(readFileSync(path, 'utf-8'));
        }

        return false;
      }),
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
  return camelize(str).replace(pascalizeRE, (_, c1, c2) => c1.toUpperCase() + c2);
}

export function decamelize(str: string, sep = '-') {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
    .toLowerCase();
}

export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

export type ModuleEnv = 'esmodule' | 'commonjs';
export type NodeEnv = 'production' | 'development' | 'test';
export type BuildTarget = 'site' | 'package';

export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isMonorepo() {
  return process.env.MIST_CLI_IS_MONOREPO === 'monorepo';
}

export function getMonorepoDir() {
  return process.env.MIST_CLI_IS_MONOREPO_DIR;
}

// 判断当前是不是一个monorepo的项目
export const isMonorepoProject = async (): Promise<boolean> => {
  const pnpmWorkspacePkgs = await findWorkspaceDir(CWD);
  if (pnpmWorkspacePkgs) {
    process.env.MIST_CLI_IS_MONOREPO = 'monorepo';
    process.env.MIST_CLI_IS_MONOREPO_DIR = pnpmWorkspacePkgs;
  }
  return !!pnpmWorkspacePkgs;
};

// 获取所有的monorepo包
export const getMonorepoPkgs = async (): Promise<string[]> => {
  const pnpmWorkspacePkgs = await findWorkspaceDir(CWD);
  if (pnpmWorkspacePkgs) {
    // 获取里面的数据
    const source = readFileSync(join(pnpmWorkspacePkgs, '/pnpm-workspace.yaml'), 'utf-8');
    const parseData = yaml.parse(source);
    if (parseData && parseData.packages) {
      return parseData.packages;
    } else {
      return [];
    }
  }
  return [];
};

export const filterMonorepoPkg = async (
  filter?: string,
): Promise<FilterMonorepoPackage[] | false> => {
  if (isMonorepo()) {
    // 判断哪些是需要忽略的哪些是需要包含的
    const pkgSelectors: PackageSelector[] = [];
    if (filter) {
      pkgSelectors.push({
        namePattern: filter,
      });
    }
    const { selectedProjectsGraph } = await readProjects(getMonorepoDir() || CWD, pkgSelectors);
    // 转为数组
    return Object.entries(selectedProjectsGraph).map(
      v =>
        ({
          dir: v[1].package.dir,
          name: v[1].package.manifest.name,
          version: v[1].package.manifest.version,
        } as FilterMonorepoPackage),
    );
  }
  return false;
};

export const setPublishRegistry = (r: string) => {
  process.env.MIST_CLI_PUBLISH_REGISTRY = r;
};

export const setPublishTag = (t: string) => {
  process.env.MIST_CLI_PUBLISH_TAG = t;
};
