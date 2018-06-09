'use strict';

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const getFilesAndFolders = () => {
  return fs.readdirSync(process.cwd()).map(file => file);
}

const checkGitignore = (folderList = []) => (folderList.length === 0 || folderList.includes(".gitignore"));

const generateQuestions = () => {
  const argv = require('minimist')(process.argv.slice(2));
  const name = argv['_'][0] || undefined;
  const description = argv['_'][1] || undefined;

  const questions =  [
    {
      type: 'input',
      name: 'name',
      message: `What is name of repository ?`,
      default: name || path.basename(process.cwd()),
      validate: (name) => {
        if (name.length === 0) {
          return "Blank repo name not allowed. ";
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      description: 'description',
      message: 'What is the description for your repository ?',
      default: description || undefined,
    },
    {
      type: 'list',
      name: 'repo',
      message: 'Select the type of the repository. ',
      default: 'public',
      choices: ['public', 'private'],
    }
  ];


  const filesAndFolders = getFilesAndFolders();
  if (!checkGitignore(filesAndFolders)) {
    questions.push({
        type: 'checkbox',
        name: 'gitIgnoreOptions',
        message: 'Select the folder/files to be ignored. ',
        choices: filesAndFolders,
      })
  }


  return questions;
}

const askQuestions = async () => {
  let answers = await inquirer.prompt(generateQuestions());
  if (answers['repo'] === 'public') {
    delete answers['repo'];
    answers['private'] = false;
  } else {
    delete answers['repo'];
    answers['private'] = true;
  }

  return answers;

}

module.exports = {
  getRepositoryDetails: async () => {
    const getUserInputs = await askQuestions();
    return getUserInputs;
  }

}