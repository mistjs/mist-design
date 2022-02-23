import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream, readFileSync } from 'fs';
import { ROOT } from '../../common/constant';
import conventionalChangelog from 'conventional-changelog';
import { transform } from './transform';
import { slimPath } from '../../common/logger';
import ora from 'ora';
import { isMonorepoProject } from '../../common';
const DIST_FILE = join(ROOT, './CHANGELOG.md');
const __dirname = dirname(fileURLToPath(import.meta.url));
const MAIN_TEMPLATE = join(__dirname, '../../../../template/changelog-main.hbs');
const HEADER_TEMPLATE = join(__dirname, '../../../../template/changelog-header.hbs');
const COMMIT_TEMPLATE = join(__dirname, '../../../../template/changelog-commit.hbs');

const mainTemplate = readFileSync(MAIN_TEMPLATE, 'utf-8');
const headerPartial = readFileSync(HEADER_TEMPLATE, 'utf-8');
const commitPartial = readFileSync(COMMIT_TEMPLATE, 'utf-8');

export const changeLog = async (): Promise<void> => {
  const spinner = ora('日志生成中...').start();
  await isMonorepoProject();
  return new Promise(resolve => {
    conventionalChangelog(
      {
        preset: 'angular',
        releaseCount: 2,
      },
      null,
      null,
      null,
      {
        mainTemplate,
        headerPartial,
        commitPartial,
        transform,
      },
    )
      .pipe(createWriteStream(DIST_FILE))
      .on('close', () => {
        spinner.succeed(`Changelog generated at ${slimPath(DIST_FILE)}`);
        resolve();
      });
  });
};
