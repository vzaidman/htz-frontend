const isFromMaster = require('./is-from-master');

async function runHooks() {
  const fromAllowed = await isFromMaster();

  return fromAllowed;
}

runHooks();
