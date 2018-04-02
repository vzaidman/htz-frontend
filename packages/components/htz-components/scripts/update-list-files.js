/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const async = require('async');

const ListDir = path.relative(
  process.cwd(),
  path.join('src', 'components', 'List')
);

const viewsPath = path.join(ListDir, 'views');

fs.readdir(viewsPath, (err, files) => {
  const views = {};
  if (err) {
    console.log(err);
  }
  else {
    files.forEach(view => {
      const viewPath = path.join(viewsPath, view);
      if (fs.lstatSync(viewPath).isDirectory()) {
        views[view] = getViewFiles(view, viewPath);
      }
    });
    writeFiles(views);
  }
});

function getViewFiles(view, viewPath) {
  if (
    fs.lstatSync(path.join(viewPath, `${view}.view.js`)).isFile() &&
    fs.lstatSync(path.join(viewPath, `${view}.query.js`)).isFile()
  ) {
    return {
      view: `./views/${view}/${view}.view.js`,
      query: `./views/${view}/${view}.query.js`,
    };
  }
  return null;
}

function writeFiles(views) {
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
  const listViewsFile = listViewsFileTemplate(views);

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
