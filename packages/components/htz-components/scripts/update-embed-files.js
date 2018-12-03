/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const async = require('async');

const elements = {};

const EmbedDir = path.relative(
  process.cwd(),
  path.join('src', 'components', 'Embed')
);

const elementsPath = path.join(process.cwd(), EmbedDir, 'elements');

const utilsPath = path.join(process.cwd(), EmbedDir, 'utils');

fs.readdir(elementsPath, (err, files) => {
  if (err) {
    console.log(err);
  }
  else {
    files.forEach(file => {
      if (file.includes('.js')) {
        elements[file.slice(0, file.indexOf('.'))] = `./elements/${file}`;
      }
    });
  }
  readFromFiles();
});

function readFromFiles() {
  const views = {};
  const exceptionalElements = [];
  async.eachSeries(
    Object.keys(elements),
    (fileName, callback) => {
      fs.readFile(`${elementsPath}/${fileName}.js`, 'utf8', (err, data) => {
        if (err) callback(err);

        const searchString = 'This element accepts these inputTemplates:';
        const index = data ? data.indexOf(searchString) : null;

        if (index && index > -1) {
          let inputTemplates = data
            .substring(index + searchString.length, data.indexOf(']'))
            .trim();
          inputTemplates = inputTemplates.replace(/\r?\n|\r|\[|]/g, '');
          if (inputTemplates[inputTemplates.length - 1] === ',') {
            inputTemplates = inputTemplates.slice(0, inputTemplates.length - 1);
          }
          inputTemplates = inputTemplates.split(',');
          inputTemplates.forEach(inputTemplate => {
            views[inputTemplate.trim()] = `${path.relative(
              utilsPath,
              elementsPath
            )}/${fileName}`
              .replace('\\', '/');
          });
        }

        if (
          data &&
          data.indexOf('This element does not emits an onLoad event') >= 0
        ) {
          exceptionalElements.push(fileName);
        }

        callback();
      });
    },
    err => {
      if (!err) {
        writeFiles(views, exceptionalElements);
      }
    }
  );
}

function writeFiles(views, exceptionalElements) {
  const embedsFileTemplate = require(path.join(
    process.cwd(),
    EmbedDir,
    'utils',
    'embedsFileTemplate.js'
  ));

  const embedTypesFileTemplate = require(path.join(
    process.cwd(),
    EmbedDir,
    'utils',
    'embedTypesFileTemplate.js'
  ));

  // Write styleguide example file
  const embedFile = embedsFileTemplate(elements, exceptionalElements);
  const embedTypesFile = embedTypesFileTemplate(views);

  const embedFilePath = path.join(process.cwd(), EmbedDir, 'Embeds.js');
  const embedTypesFilePath = path.join(utilsPath, 'embedTypes.js');

  async.each(
    [
      { file: embedFile, path: embedFilePath, },
      { file: embedTypesFile, path: embedTypesFilePath, },
    ],
    (file, callback) => {
      fs.writeFile(file.path, file.file, err => {
        if (err) {
          console.error(
            `${err.stack}\n${chalk.yellow(
              chalk.bold(`Failed to write '${file.path}' to disk.`)
            )}`
          );
        }
        callback();
      });
    },
    err => {
      if (err) console.log(err);
    }
  );
}
