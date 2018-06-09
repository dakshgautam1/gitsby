'use strict';

const fs = require('fs');
const touch = require('touch');


module.exports = {
  createGitIgnore: async (ignoredFileList = []) => {
    if (ignoredFileList.length !== 0) {
      fs.writeFileSync('.gitignore', ignoredFileList.join('\n'));
    } else {
      touch('.gitignore');
    }
  }
}

