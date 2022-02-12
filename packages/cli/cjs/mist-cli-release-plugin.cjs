const releaseIt = require('release-it');
const { execSync } = require('child_process');

class MistCliReleasePlugin extends releaseIt.Plugin {
  async beforeRelease() {
    // log an empty line
    console.log('');

    execSync('mist build', { stdio: 'inherit' });
    execSync('mist changelog', { stdio: 'inherit' });
  }
}

module.exports = MistCliReleasePlugin;
