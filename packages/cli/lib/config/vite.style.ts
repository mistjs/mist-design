import { join } from 'path';
import { CWD, DIST_DIR, ES_DIR, getMistBuildName } from '../common/constant';
import type { InlineConfig, LibraryFormats } from 'vite';

export function getViteStyleConfigForPackage({
  minify,
  external,
  formats,
}: {
  minify: boolean;
  formats: LibraryFormats[];
  external: string[];
}): InlineConfig {
  const name = getMistBuildName();
  return {
    root: CWD,
    logLevel: 'silent',
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      emptyOutDir: false,
      lib: {
        name,
        entry: join(ES_DIR, 'style.js'),
        formats,
        fileName: () => 'theme.js',
      },
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
        output: {
          assetFileNames: `${name}.css`,
          dir: DIST_DIR,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
}
