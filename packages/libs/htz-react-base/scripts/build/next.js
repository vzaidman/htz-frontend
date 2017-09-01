const resolveFrom = require('resolve-from');

process.argv.push('build');
require(resolveFrom(process.cwd(), 'next/dist/bin/next'));
