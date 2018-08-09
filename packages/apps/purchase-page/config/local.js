const connectionPreset = process.env.CONNECTION_PRESET;
let presetOverride = {};
switch (connectionPreset) {
  case 'dev': {
    const baseConfigOverride = require('./development');
    presetOverride = Object.assign(presetOverride, baseConfigOverride.service, {
      service: {
        graphql: baseConfigOverride.service.graphql,
        image: baseConfigOverride.service.image,
      },
      remoteFQDN: baseConfigOverride.remoteFQDN,
      logLevel: baseConfigOverride.logLevel,
      enableHttpLogging: baseConfigOverride.enableHttpLogging,
    });
    break;
  }

  case 'stage': {
    const baseConfigOverride = require('./staging');
    presetOverride = Object.assign(presetOverride, baseConfigOverride, {});
    break;
  }

  case 'prod': {
    const baseConfigOverride = require('./production');
    presetOverride = Object.assign(presetOverride, baseConfigOverride, {});
    break;
  }

  default: {
    break;
  }
}

if (connectionPreset) {
  console.log(`CONNECTION_PRESET=${connectionPreset} detected!`);
  console.log('Override is: ', Object.assign({}, presetOverride));
}
module.exports = Object.assign({}, presetOverride);
