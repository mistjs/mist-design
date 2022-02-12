import { BuildOptions } from "./types";
import { UI } from "./ui";

export const build = async (
  type: string,
  options: BuildOptions = { dir: "src", name: "MistUI" }
) => {
  if (type === "ui") {
    await UI(options);
  }
};
