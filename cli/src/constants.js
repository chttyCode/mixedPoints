const { version } = require('../package.json');

const donwnLoadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;
module.exports = {
  version,
  donwnLoadDirectory,
};
