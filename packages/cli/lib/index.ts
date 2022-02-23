import type { MistOptions } from './typing';
export * from './cli';
export const defineConfig = <T extends MistOptions>(options: T): T => {
  return options;
};
