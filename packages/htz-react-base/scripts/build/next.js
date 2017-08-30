/* eslint-disable import/no-dynamic-require */
const resolveFrom = require('resolve-from');

process.argv.push('build');
require(resolveFrom(process.cwd(), 'next/dist/bin/next'));
