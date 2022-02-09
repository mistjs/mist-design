import less from "less";
import { join } from "path";
import { readFileSync } from "fs";
import { CWD } from "../common/constant";

export async function compileLess(filePath: string) {
  const source = readFileSync(filePath, "utf-8");
  // @ts-ignore
  const { css } = await less.render(source, {
    filename: filePath,
    paths: [join(CWD, "node_modules")],
  });
  return css;
}
