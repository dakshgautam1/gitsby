const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

'use strict';

module.exports = {
  getFileLocation: () => {
    return process.cwd();
  },
  checkGitFolderExists: (directoryLocation) => {
    try {
      let isDirectoryPresent = fs.lstatSync(path.join(directoryLocation, ".git")).isDirectory();
      if (isDirectoryPresent) {
        return true;
      } else {
        console.log(chalk.green(`A file '.git' exists, but generating directory`));
        return false;
      }
    } catch(error) {
      //console.log(error);
      return false;
    }
  }
}