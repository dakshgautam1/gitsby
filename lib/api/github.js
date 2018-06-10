'use strict';

const octokit = require('@octokit/rest')({
  debug: true // TODO: remove it while pushing. 
});
const ora = require('ora');
const utils = require('../utils');
const chalk = require('chalk');
const git = require('simple-git/promise')();

const createGitIgnore = require('../create/gitIgnoreCreate');
const errorHandling = require('../error');

const generateToken = async () => {
    const response = await octokit.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: `Gitiy key generated on ${utils.getTodayDateTime()}`
    });
    
    // TODO: Handle for 2 factor authentication. 

    let token = response.data.token;
    if (token) {
      return { token: token }
    } else {
      return undefined;
    }
}

const executeGitCommand = async (startMessage, fn, endMessage) => {
  let spinner = ora(startMessage).start();
  await fn()
  spinner.succeed(endMessage);
  spinner.stop();
}

const performGitOperations = async (remoteUrl) => {

  let statusSummary = null;
  try {
    await executeGitCommand("Intializing .git repository", git.init, "Initialized .git repository");
    await executeGitCommand("Adding .gitignore", () => git.add('./.gitignore'), "Added .gitignore");
    await executeGitCommand("Committing .gitignore", () => git.commit("First commit - .gitignore added"), "Committed .gitignore");
    await executeGitCommand(`Adding remote "origin"`, () => git.addRemote('origin', remoteUrl), `Added remote "origin"`);
    await executeGitCommand(`Pushing to the "master" branch`, () => git.push('origin', 'master'), `Code pushed to "master" branch`);
  }
  catch (e) { 
  }
}


const createRepositoryOnGitHub = async (repositoryArguments) => {

  const { name, description } = repositoryArguments; // cant extract "private", as it is a reserved keyword. 
  const result = await octokit.repos.create({
    "name": name, 
    "description": description, 
    "private": repositoryArguments['private']
  });

  // TODO: Error handling if repository already present. 
  return result.data.ssh_url;
}

module.exports = {
  getInstance: () => octokit,

  authenticateWithCredentials: async ({ username, password }) =>  {

    octokit.authenticate({
      type: 'basic',
      username,
      password
    });
    
    
    let spinner = ora('Authenticating your github credentials. ').start();
    spinner.color = 'green';
    try {

      const token = await generateToken();
      spinner.succeed('Authenticated. Your username and password is correct.');
      return token;

    } catch(error) {
      
      spinner.fail('Authentication failed. ');
      errorHandling.handleCredentials(error);
      process.exit();
    } 
 
  },

  setAuthenticationWithToken: (token) => {
    octokit.authenticate({
      type: 'oauth',
      token: token
    });
  },

  startRepositoryCreation: async (repositoryArguments) => {

    try {
      await createGitIgnore.createGitIgnore(repositoryArguments.gitIgnoreOptions);
    } catch(error) {
      console.log(chalk.color('.gitignore file cant be created. Contact support.'));
      process.exit();
    }

    let remoteUrl;
    try {
      remoteUrl = await createRepositoryOnGitHub(repositoryArguments);
    } catch(error) {      
      errorHandling.handleGitRepositoryCreation(error);
      process.exit();
    }

    try {
      await performGitOperations(remoteUrl);
    } catch(error) {
      process.exit();
    }
  }
}