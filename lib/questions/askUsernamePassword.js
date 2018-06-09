'use strict';

const inquirer = require('inquirer');

const generateQuestions = (source) => {
  return [
    {
      type: 'input',
      name: 'username',
      message: `What is your ${source} username ?`,
      validate: (email) => {
        if (email.length === 0) {
          return "Black Email not allowed."
        } else {
          return true;
        }
      }
    },
    {
      type: 'password',
      name: 'password',
      message: `What is your ${source} password`,
      validate: (input) => {
        if (input.length === 0) {
          return "Blank password not allowed. "
        } else {
          return true;
        }
      }
    }
  ]
}

module.exports = {
  getUsernamePassword: (source) => {
    if (source === undefined) {
      throw ('Source required. ')
    }
    return inquirer.prompt(generateQuestions(source))
  }
}
