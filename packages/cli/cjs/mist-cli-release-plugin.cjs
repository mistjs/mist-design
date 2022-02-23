const releaseIt = require('release-it');
const { execSync } = require('child_process');

class MistCliReleasePlugin extends releaseIt.Plugin {
  async beforeRelease() {
    // log an empty line
    console.log('');

    execSync('pnpm build', { stdio: 'inherit' });
    execSync('mist changelog', { stdio: 'inherit' });
  }
  async afterRelease() {
    // 发布完成后，进行版本的最终发布
    let registry = 'https://registry.npmjs.org/';
    if (process.env.MIST_CLI_PUBLISH_REGISTRY) {
      registry = process.env.MIST_CLI_PUBLISH_REGISTRY;
    }
    if (process.env.MIST_CLI_PUBLISH_TAG) {
      execSync(`pnpm publish --registry=${registry} --tag=${process.env.MIST_CLI_PUBLISH_TAG}`);
    } else {
      execSync(`pnpm publish --registry=${registry}`);
    }
  }
}

module.exports = MistCliReleasePlugin;
