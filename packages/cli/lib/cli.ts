import { Command } from 'commander';
import * as process from 'process';
import pkg from '../package.json';
import { build } from './commands/build';
import { changeLog } from './commands/change-log';
import { commitLint } from './commands/commit-lint';
import { release } from './commands/release';
const program = new Command('mist');

program
  .usage('<command> [options]')
  .helpOption('-h,--help', 'mist cli 帮助文档')
  .version(pkg.version, '-v,--version', '查看版本信息');

program
  .command('build [type]')
  .description('项目编译工具')
  .option('-d, --dir <dir>', '打包项目的输入的目录', 'src')
  .option('-n, --name <name>', '打包项目输出的目录', 'index')
  .action(build);

program.command('changelog').description('生成日志工具').action(changeLog);

program.command('commit-lint <gitParams>').description('代码提交规范').action(commitLint);

program.description('版本发布').option('-t,--tag <tag>', '需要发布的版本类型').action(release);

program.parse(process.argv);
