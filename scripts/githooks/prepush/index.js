/* eslint-disable import/no-extraneous-dependencies */

const preventDestructivePush = require('./prevent-destructive-push');

// const [ executor #<{(| command |)}>#, , ...args ] = process.argv;

async function runHooks() {
  preventDestructivePush([ 'master', 'dev', ]);
}

runHooks();
