export type BuildType = "lib" | "ui";

export interface BaseConfig {
  type: BuildType;
  config: CompileConfig;
}

export interface CompileConfig {
  dir: string;
  out: string;
  format:
    | "esm"
    | "cjs"
    | "umd"
    | "esm,cjs"
    | "esm,umd"
    | "cjs,umd"
    | "esm,cjs,umd";
  watch: boolean;
}
