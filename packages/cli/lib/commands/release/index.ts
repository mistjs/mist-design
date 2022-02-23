import releaseIt from 'release-it';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import findpkg from 'find-package-json';
import { CWD } from '../../common/constant';
import { isMonorepo, isMonorepoProject, setPublishRegistry, setPublishTag } from '../../common';
import { errorConsole } from '../../common/logger';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_PATH = join(__dirname, '../../../../cjs/mist-cli-release-plugin.cjs');

export async function release(command: { tag?: string; registry?: string }) {
  await isMonorepoProject();
  if (command.registry) {
    // 配置了registry
    setPublishRegistry(command.registry);
  }
  let increment;
  let preRelease: boolean | string = false;
  const includes = ['beta', 'alpha', 'rc', 'next'];
  const excludes = ['patch', 'minor', 'major'];
  const p = findpkg(CWD);
  const pkg = p.next().value;
  const v: string | undefined = pkg.version;
  const name: string | undefined = pkg.name;
  if (!pkg || !v || !name) {
    throw new Error('获取package.json失败');
  }
  const splitIndex = name.indexOf('/') === -1 ? 1 : name.indexOf('/') + 1;
  const myName = /^@/.test(name) ? name.slice(splitIndex) : name;
  if (!command.tag) {
    const response = await prompts({
      type: 'select',
      name: 'tag',
      message: '请选择要发布的版本',
      choices: [
        {
          title: '小版本',
          value: 'patch',
          description: '用于小版本更新',
        },
        {
          title: '中版本',
          value: 'minor',
          description: '用于中版本更新',
        },
        {
          title: '大版本',
          value: 'major',
          description: '用于大版本更新',
        },
        {
          title: '内测版本',
          value: 'alpha',
          description: '用于发布内部版本，bug多，不稳定，不断添加新功能',
        },
        {
          title: '公测版本',
          value: 'beta',
          description: '用于发布公测版本的包，比alpha版本稳定，不断添加新功能',
        },
        {
          title: '候选版本',
          value: 'rc',
          description: '用于发布候选版本的包，基本不添加新功能，修复完bug即可进入正式版',
        },
        {
          title: '前瞻版本',
          value: 'next',
          description: '用于发布候选版本的包，基本不添加新功能，修复完bug即可进入正式版',
        },
      ],
    });
    increment = response.tag;
    if (includes.includes(response.tag)) {
      increment = v.includes(response.tag) ? undefined : 'patch';
      preRelease = response.tag;
      command.tag = response.tag;
    }
  } else {
    if (!excludes.includes(command.tag)) {
      increment = v.includes(command.tag) ? undefined : 'patch';
      preRelease = command.tag;
    }
  }
  if (command.tag) {
    setPublishTag(command.tag);
  }
  const tagName = isMonorepo() ? `${myName}-v` + '${version}' : 'v${version}';
  const commitMessage = isMonorepo()
    ? `release(${myName}): ` + '${version}'
    : 'release: ${version}';
  try {
    await releaseIt({
      plugins: {
        [PLUGIN_PATH]: {},
      },
      npm: {
        publish: false,
      },
      increment,
      preRelease,
      git: {
        tagName,
        commitMessage,
      },
    });
  } catch (e) {
    if ((e as any).message.includes('Working dir must be clean')) {
      errorConsole('请先合并或者提交代码');
    } else {
      console.log(e);
    }
  }
}
