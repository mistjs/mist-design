import { readFileSync } from 'fs';
import { consola } from '../../common/logger';
import { isMonorepo, isMonorepoProject } from '../../common';

const commitRE =
  /^(revert: )?(fix|feat|docs|perf|test|types|style|build|chore|release|refactor|breaking change)(\(.+\))?: .{1,50}/;
const mergeRE = /Merge /;

const monorepoExample = `
例子如下: 

- fix(cli): 子项目cli的changelog
- feat(ui): 子项目UI库的changelog
- fix: 全局的changelog
`;
const baseExample = `
例子如下: 

- fix: 这是提交的项目信息
- feat: 子项目UI库的changelog
`;
export async function commitLint(gitParams: string) {
  await isMonorepoProject();
  const commitMsg = readFileSync(gitParams, 'utf-8').trim();

  if (!commitRE.test(commitMsg) && !mergeRE.test(commitMsg)) {
    const example = isMonorepo() ? monorepoExample : baseExample;
    consola.error(`提交代码的格式不正确: "${commitMsg}".

您需要按照下面的格式进行提交您本地的代码.
${example}
支持提交的类型:

- fix
- feat
- docs
- perf
- test
- types
- build
- chore
- release
- refactor
- breaking change
- Merge branch 'foo' into 'bar'
`);
    process.exit(1);
  }
}
