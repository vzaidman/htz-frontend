#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const sourceFilePath = './src/index.js';
const flowDefinitionsFile = 'index.js.flow';

fs.readFile(sourceFilePath, 'utf8', (err, contents) => {
  console.log(`\n${chalk.magenta.bold('Distributing FlowType definitions')}`);

  if (err) {
    console.error(`Faild to read ${sourceFilePath}`);
    throw err;
  }

  const replacedContents = contents.replace(/\.\//gm, '../../src/');

  [ 'lib', 'esm', 'esnext', ].forEach(dir => {
    const flowDefinitionsPath = path.join('dist', dir, flowDefinitionsFile);
    if (fs.existsSync(flowDefinitionsPath)) {
      console.log(`Old flow definitions file found: ${flowDefinitionsPath}`);
      console.log('Cleaning...');
      fs.unlinkSync(flowDefinitionsPath);
    }

    fs.writeFile(flowDefinitionsPath, replacedContents, error => {
      if (error) {
        console.error(
          `Faild to write flow definitions to ${flowDefinitionsPath}`
        );
        throw error;
      }
      console.log(`Flow definitions written to: ${flowDefinitionsPath}`);
    });
  });
});
