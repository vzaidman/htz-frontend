/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

const connectionPreset = process.env.CONNECTION_PRESET;
let presetOverride = {};
switch (connectionPreset) {
  case 'dev': {
    const baseConfigOverride = require('./development');
    presetOverride = Object.assign(presetOverride, baseConfigOverride, {
      service: {
        image: 'http://res.cloudinary.com/kfirlevy/image',
        polopolyImageBaseHref: defer(function () {
          return `http${
            this.useSSL ? 's' : ''
          }://${this.hostname ? `${this.hostname}.` : ''}${this.domain}${this.port ? `:${this.port}` : ''}`;
        }),
      },
      alerts: baseConfigOverride.service.alerts,
      remoteFQDN: baseConfigOverride.appFQDN,
      useSSL: false,
      graphQLuseSSL: false,
      graphQLexposedPort: true,
    });
    // presetOverride = Object.assign(presetOverride, baseConfigOverride.service, {
    //   service: {
    //     graphql: baseConfigOverride.service.graphql,
    //     image: baseConfigOverride.service.image,
    //     polopolyImageBaseHref: baseConfigOverride.service.polopolyImageBaseHref,
    //   },
    //   remoteFQDN: baseConfigOverride.remoteFQDN,
    //   logLevel: baseConfigOverride.logLevel,
    //   assetPrefix: baseConfigOverride.assetPrefix,
    //   enableHttpLogging: baseConfigOverride.enableHttpLogging,
    // });
    break;
  }

  // Added for verbosity: this should be the same as 'NODE_ENV=development'
  // case 'dev2stage': {
  //   const baseConfigOverride = require('./staging');
  //   presetOverride = Object.assign(presetOverride, baseConfigOverride, {
  //     useSSL: true,
  //     graphQLuseSSL: false,
  //     graphQLexposedPort: true,
  //   });
  //   break;
  // }

  case 'dev2prod': {
    const baseConfigOverride = require('./production');
    presetOverride = Object.assign(presetOverride, baseConfigOverride, {
      appPort: presetOverride.appPort,
      graphQLPort: baseConfigOverride.graphQLPort,
      graphQLSubDomain: process.env.HOSTNAME,
      useSSL: true,
      graphQLuseSSL: false,
      graphQLexposedPort: true,
    });
    break;
  }

  case 'stage': {
    const baseConfigOverride = require('./staging');
    presetOverride = Object.assign(presetOverride, baseConfigOverride, {});
    break;
  }

  case 'pre-prod': {
    const baseConfigOverride = require('./pre-production');
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
  console.log(
    'Override is: ',
    JSON.stringify(Object.assign({}, presetOverride))
  );
}
module.exports = Object.assign({}, presetOverride);
