/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const async = require('async');

const ListDir = path.relative(
  process.cwd(),
  path.join('src', 'components', 'List')
);

const viewsPath = path.join(process.cwd(), ListDir, 'views');
const queriesPath = path.join(process.cwd(), ListDir, 'viewsQueries');

async.parallel(
  {
    views: callback => {
      fs.readdir(viewsPath, (err, files) => {
        const views = {};
        if (err) {
          console.log(err);
        }
        else {
          files.forEach(file => {
            if (file.includes('.js')) {
              views[file.slice(0, file.indexOf('.'))] = `./views/${file}`;
            }
          });
        }
        callback(err, views);
      });
    },
    queries: callback => {
      fs.readdir(queriesPath, (err, files) => {
        const queries = {};
        if (err) {
          console.log(err);
        }
        else {
          files.forEach(file => {
            if (file.includes('.js')) {
              queries[
                file.slice(0, file.indexOf('.'))
              ] = `./viewsQueries/${file}`;
            }
          });
        }
        callback(err, queries);
      });
    },
  },
  (err, results) => {
    if (!err) {
      writeFiles(results);
    }
  }
);

function writeFiles({ views, queries, }) {
  const listsFileTemplate = require(path.join(
    process.cwd(),
    ListDir,
    'listsFileTemplate.js'
  ));

  const listViewsFileTemplate = require(path.join(
    process.cwd(),
    ListDir,
    'listViewsFileTemplate.js'
  ));

  // Write styleguide example file
  const listFile = listsFileTemplate(views);
  const listViewsFile = listViewsFileTemplate(views, queries);

  const listFilePath = path.join(process.cwd(), ListDir, 'Lists.js');
  const listViewsFilePath = path.join(process.cwd(), ListDir, 'getView.js');

  async.each(
    [
      { file: listFile, path: listFilePath, },
      { file: listViewsFile, path: listViewsFilePath, },
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
