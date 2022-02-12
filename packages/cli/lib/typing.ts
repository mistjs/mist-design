import { RollupOptions } from "rollup";

export interface MistOptions {
  rollupOptions: RollupOptions;
}

export interface FilterMonorepoPackage {
  dir: string;
  name: string;
  version: string;
}
