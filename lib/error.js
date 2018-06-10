'use strict';

const chalk = require('chalk');

module.exports = {
  handleCredentials: (error) => {
    switch(error.code) {
      case 401:
        console.log(chalk.red('Username/Password wrong. Please re-run the command.'));
        break;
      default:
        console.log(chalk.red('Error occured while authentication. Please re-run the command.'));
    }
  },

  handleGitRepositoryCreation: (error) => {
    switch(error.code) {
      case 422:
        let errorDetails = JSON.parse(error);
        if ('message' in errorDetails && 'errors' in errorDetails) {
          console.log(chalk.red(`Repository ${errorDetails["errors"][0]["message"]}`));
        } else {
          console.log(chalk.red(errorDetails['message']));
        }    
        break;
      default:
        console.log(chalk.red('Could not create repository on github.'));
    }
  }
}