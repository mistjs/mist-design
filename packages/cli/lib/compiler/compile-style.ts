import { parse } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { replaceExt } from '../common';
import { compileCss } from './compile-css';
import { compileLess } from './compile-less';
import { compileSass } from './compile-sass';
import { consola } from '../common/logger';

async function compileFile(filePath: string) {
  const parsedPath = parse(filePath);
  try {
    if (parsedPath.ext === '.less') {
      if (
        parsedPath.base === 'index.less' ||
        parsedPath.base === 'MistUI.less' ||
        parsedPath.base === 'MistUI.dark.less'
      ) {
        const source = await compileLess(filePath);
        return await compileCss(source);
      } else {
        return Promise.resolve();
      }
    }

    if (parsedPath.ext === '.scss') {
      if (parsedPath.base === 'index.scss') {
        const source = await compileSass(filePath);
        return await compileCss(source);
      } else {
        return Promise.resolve();
      }
    }

    const source = readFileSync(filePath, 'utf-8');
    return await compileCss(source);
  } catch (err) {
    consola.error('Compile style failed: ' + filePath);
    throw err;
  }
}

export async function compileStyle(filePath: string) {
  const css = await compileFile(filePath);
  if (css) {
    writeFileSync(replaceExt(filePath, '.css'), css);
  }
}
