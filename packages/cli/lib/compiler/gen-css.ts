import {
  IMPORT_STYLE_PATH_RE,
  IMPORT_STYLE_RE,
  replaceCSSImportCSS,
} from "../common/css";
import { existsSync, outputFileSync, readFileSync } from "fs-extra";
import { dirname } from "path";
import {
  COMPONENT_LESS_FILE,
  OUT_PUT_COMPONENTS_LESS_FILE,
} from "../common/constant";

export const genCssInJs = (filePath: string) => {
  const code = getFileCode(filePath);
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

export const genComponentLessFile = () => {
  const filePath = COMPONENT_LESS_FILE;
  if (existsSync(filePath)) {
    const code = readFileSync(filePath, "utf-8");
    const myCode = code.replace(IMPORT_STYLE_RE, (str) => {
      const importCode = IMPORT_STYLE_PATH_RE.exec(str);
      if (importCode && importCode.length > 0) {
        const replaceCode = importCode[1];
        return str
          .replace(replaceCode, `.${replaceCode}/index.less`)
          .replace("import", "@import");
      } else {
        return "";
      }
    });
    outputFileSync(OUT_PUT_COMPONENTS_LESS_FILE, myCode, "utf-8");
  }
};
