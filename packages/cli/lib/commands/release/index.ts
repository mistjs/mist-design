import releaseIt from "release-it";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_PATH = join(
  __dirname,
  "../../../../cjs/mist-cli-release-plugin.cjs"
);

export async function release(command: { tag?: string }) {
  let increment;
  const includes = ["beta", "alpha", "rc", "next"];
  if (!command.tag) {
    const response = await prompts({
      type: "select",
      name: "tag",
      message: "请选择要发布的版本",
      choices: [
        {
          title: "小版本",
          value: "patch",
          description: "用于小版本更新",
        },
        {
          title: "中版本",
          value: "minor",
          description: "用于中版本更新",
        },
        {
          title: "大版本",
          value: "major",
          description: "用于大版本更新",
        },
        {
          title: "内测版本",
          value: "alpha",
          description: "用于发布内部版本，bug多，不稳定，不断添加新功能",
        },
        {
          title: "公测版本",
          value: "beta",
          description: "用于发布公测版本的包，比alpha版本稳定，不断添加新功能",
        },
        {
          title: "候选版本",
          value: "rc",
          description:
            "用于发布候选版本的包，基本不添加新功能，修复完bug即可进入正式版",
        },
        {
          title: "前瞻版本",
          value: "next",
          description:
            "用于发布候选版本的包，基本不添加新功能，修复完bug即可进入正式版",
        },
      ],
    });
    increment = response.tag;
    if (includes.includes(response.tag)) {
      increment = "pre" + response.tag;
      command.tag = response.tag;
    }
  } else {
    increment = "pre" + command.tag;
  }

  await releaseIt({
    plugins: {
      [PLUGIN_PATH]: {},
    },
    npm: false,
    increment,
    git: {
      tagName: "v${version}",
      commitMessage: "release: ${version}",
    },
  });
}
