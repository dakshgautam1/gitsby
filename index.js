#!/usr/bin/env node
'use strict';

const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

const directory = require('./lib/directory');
const store = require('./lib/store');
const constants = require('./lib/constants');
const question = require('./lib/questions/askUsernamePassword');
const github = require('./lib/api/github');
const repoDetails = require('./lib/questions/getRepositoryDetails');

clear();

console.log(chalk.green(
  figlet.textSync('Gitsby', {
    font: "3D-ASCII",
    horizontalLayout: "full",
  })
))


if (directory.checkGitFolderExists(directory.getFileLocation())) {
  console.log(chalk.red(`".git" repository already initialized`));
  process.exit();
}



const main = async() => {
  var config;

  if (!store.isConfigPresent(constants.GITHUB)) {

    // Ask for credentials. 
    const askCredentials = await question.getUsernamePassword(constants.GITHUB);

    // Generate Token with credentials. 
    const token = await github.authenticateWithCredentials(askCredentials);

    if (token) {

      // Add the token to the store. 
      config = store.putConfig(constants.GITHUB, token, 'token');
      
    } else {
      console.log(chalk.red('Something wrong with credentials. '));
      process.exit();
    }

  } else {

    // Get the token from the store. 
    config = store.getConfigFromStore(constants.GITHUB, 'token');
  }
  
  // Set token for further requests. 
  github.setAuthenticationWithToken(config);
  

  const repositoryDetails = await repoDetails.getRepositoryDetails();
  await github.startRepositoryCreation(repositoryDetails);

  
}

main();
