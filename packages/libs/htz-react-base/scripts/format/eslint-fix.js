const spawn = require('cross-spawn');

// Since we're running a `format` task and not `lint`, don't print any normal
// lint errors. Instead, capture them and only log them if they're fatal (like
// a parsing error, which Prettier most likely would have bailed on anyway).
const args = [ require.resolve('../lint'), '--fix', '--format', 'json', ].concat(
  // At least one path is required.
  process.argv.slice(2)
);
const result = spawn.sync('node', args, { encoding: 'utf8', });
if (result.error) {
  throw result.error;
}
if (result.signal) {
  console.error(result.signal);
  process.exit(1);
}

if (result.status) {
  let hasFatalError = false;
  let files;
  try {
    files = JSON.parse(result.stdout);
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
  files.forEach(file => {
    if (file.errorCount) {
      file.messages.forEach(message => {
        if (message.fatal) {
          console.error(
            `${file.filePath}:${message.line}:${message.column}: ${message.message}`
          );
          hasFatalError = true;
        }
      });
    }
  });
  if (hasFatalError) {
    process.exit(result.status);
  }
}
