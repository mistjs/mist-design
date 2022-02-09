import fse from "fs-extra";
import { join } from "path";
import { build } from "vite";
import { getPackageJson, LIB_DIR } from "../common/constant";
import { getViteConfigForPackage } from "../config/vite.package";

// generate entry file for nuxt
async function genEntryForSSR() {
  const name = "MistUI";

  const cjsPath = join(LIB_DIR, "ssr.js");
  const mjsPath = join(LIB_DIR, "ssr.mjs");

  const cjsContent = `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../dist/${name}.cjs.min.js');
} else {
  module.exports = require('./dist/${name}.cjs.js');
};
`;

  const mjsContent = `export * from './index.js';\n`;

  return Promise.all([
    fse.outputFile(cjsPath, cjsContent),
    fse.outputFile(mjsPath, mjsContent),
  ]);
}

export async function compileBundles() {
  const dependencies = getPackageJson().dependencies || {};
  const externals = Object.keys(dependencies);

  const configs = [
    // umd bundle
    getViteConfigForPackage({
      minify: false,
      formats: ["umd"],
      external: ["vue"],
    }),
    // umd bundle (minified)
    getViteConfigForPackage({
      minify: true,
      formats: ["umd"],
      external: ["vue"],
    }),
    // esm/cjs bundle
    getViteConfigForPackage({
      minify: false,
      formats: ["es", "cjs"],
      external: ["vue", ...externals],
    }),
    // esm/cjs bundle (minified)
    // vite will not minify es bundle
    // see: https://github.com/vuejs/vue-next/issues/2860
    getViteConfigForPackage({
      minify: true,
      formats: ["es", "cjs"],
      external: ["vue", ...externals],
    }),
  ];

  await Promise.all(configs.map((config) => build(config)));
  await genEntryForSSR();
}
