/* eslint-disable func-names */
// const defer = require('config/defer').deferConfig;

const connectionPreset = process.env.CONNECTION_PRESET;
let presetOverride = {};
switch (connectionPreset) {
  case 'dev':
    presetOverride = require('./development');
    break;
  case 'staging':
    presetOverride = require('./staging');
    break;
  case 'prod':
    presetOverride = require('./production');
    break;
  default:
    break;
}

module.exports = Object.assign({}, presetOverride);
// module.exports = {
//   service: {
//     base: defer(function () {
//       return `http${
//         this.useSSL ? 's' : ''
//       }://${this.remoteFQDN}`;
//     }),
//     sso: 'https://sso.haaretz.co.il',
//     image: 'https://images.haarets.co.il/image',
//     graphql: defer(function () {
//       return `http${
//         this.graphQLuseSSL ? 's' : ''
//       }://${this.appFQDN}${this.port ? `:${this.port}` : ''}/graphql`;
//     }),
//     polopolyImageBaseHref: defer(function () {
//       return `http${
//         this.useSSL ? 's' : ''
//       }://${this.hostname ? `${this.hostname}.` : ''}${this.domain}${this.port ? `:${this.port}` : ''}`;
//     }),
//   },
//   appFQDN: defer(function () {
//     return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
//   }),
//   remoteFQDN: defer(function () {
//     return `www.${this.domain}`;
//   }),
//   useSSL: true,
//   graphQLuseSSL: false,
//   domain: 'haaretz.co.il',
//   hostname: process.env.HOSTNAME,
//   port: process.env.PORT || '2004',
//   // baseHref: 'https://www.haaretz.co.il',
// };
