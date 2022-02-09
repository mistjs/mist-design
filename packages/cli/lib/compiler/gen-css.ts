import { replaceCSSImportCSS } from "../common/css";
import { readFileSync, outputFileSync, existsSync } from "fs-extra";
import { dirname } from "path";
export const genCssInJs = (filePath: string) => {
  const code = getFileCode(filePath);
  // console.log(filePath);
  const newCode = replaceCSSImportCSS(code, "style", "css");
  // 完成替换以后
  const cssPath = dirname(filePath) + "/css.ts";
  if (!existsSync(cssPath)) {
    outputFileSync(cssPath, newCode);
  }
};

export const getFileCode = (filePath: string) => {
  return readFileSync(filePath, "utf-8");
};
