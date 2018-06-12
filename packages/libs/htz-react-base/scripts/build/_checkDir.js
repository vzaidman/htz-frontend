const fs = require('fs');

function checkDir(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      resolve(!err && stats.isDirectory());
    });
  });
}

module.exports = {
  checkDir,
};
