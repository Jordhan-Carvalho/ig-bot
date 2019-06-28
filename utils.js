const inquirer = require('inquirer');
const puppeteer = require('puppeteer');
const path = require('path');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Qual seu email?',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Qual seu password?',
  },
];

/* ######### PKG DEPLOYMENT CONFIGURATION ########## */
const isPkg = typeof process.pkg !== 'undefined';
// mac path replace
let chromiumExecutablePath = isPkg
  ? puppeteer
      .executablePath()
      .replace(
        /^.*?\/node_modules\/puppeteer\/\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
      )
  : puppeteer.executablePath();

console.log(process.platform);
// check win32
if (process.platform == 'win32') {
  chromiumExecutablePath = isPkg
    ? puppeteer
        .executablePath()
        .replace(
          /^.*?\\node_modules\\puppeteer\\\.local-chromium/,
          path.join(path.dirname(process.execPath), 'chromium')
        )
    : puppeteer.executablePath();
}
/* ######### PKG DEPLOYMENT CONFIGURATION ########## */

const utils = {
  getUserPass: async () => {
    const resp = await inquirer.prompt(questions).then(answers => {
      console.log(`Olá ${answers.name}! Iniciando processo`);
      return answers;
    });
    return resp;
  },
  getPath: chromiumExecutablePath,
};

module.exports = utils;
