import { existsSync } from "fs";
import { isAbsolute, join } from "path";
import { SRC_DIR, STYLE_DIR } from "./constant";

type CSS_LANG = "css" | "less" | "scss";

function getCssLang(): CSS_LANG {
  return "less";
}

export const CSS_LANG = getCssLang();

export function getCssBaseFile() {
  let path = join(STYLE_DIR, `base.${CSS_LANG}`);

  const baseFile = "";
  if (baseFile) {
    path = isAbsolute(baseFile) ? baseFile : join(SRC_DIR, baseFile);
  }

  if (existsSync(path)) {
    return path;
  }

  return null;
}

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// "import 'a.less';" => "import 'a.css';"
export function replaceCSSImportExt(code: string) {
  return code.replace(IMPORT_STYLE_RE, (str) =>
    str.replace(`.${CSS_LANG}`, ".css")
  );
}
