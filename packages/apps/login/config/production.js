/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://sso.haaretz.co.il',
    newSso: 'https://ms-apps.haaretz.co.il/sso',
    userInfoUri: 'https://ms-apps.haaretz.co.il/userInfo',
    otp: {
      base: 'https://ms-apps.haaretz.co.il/otp',
      generate: '/generate',
      validate: '/validate',
    },
    htzFunction: 'https://ms-apps.haaretz.co.il/htz-function',
    image: 'https://images.haarets.co.il/image',
    ds: 'https://ms-apps.haaretz.co.il/ds',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    msSportResults: 'https://ms-apps-dev.themarker.com/ms-sport-results',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/`;
    }),
    alerts: 'https://alerts.haaretz.co.il',
  },
  appFQDN: defer(function () {
    return `${this.graphQLSubDomain ? `${this.graphQLSubDomain}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `www.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: false,
  graphQLSubDomain: process.env.GRAPHQL_SUB_DOMAIN || 'graphql',
  msServiceDomain: 'ms-apps',
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '2004',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  logLevel: 'error',
  assetPrefix: '',
  enableHttpLogging: false,
  configName: 'production',
};
