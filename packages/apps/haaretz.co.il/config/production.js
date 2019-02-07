/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    ds: 'https://ms-apps.haaretz.co.il/ds',
    newSso: 'https://ms-apps.haaretz.co.il/sso',
    sso: 'https://sso.haaretz.co.il',
    otp: {
      base: 'https://ms-apps.haaretz.co.il/otp',
      generate: '/generate',
      validate: '/validate',
    },
    userInfoUri: 'https://ms-apps.haaretz.co.il/userInfo',
    htzFunction: 'https://ms-apps.haaretz.co.il/htz-function',
    image: 'https://images.haarets.co.il/image',
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
    return `${
      this.graphQLSubDomain ? `${this.graphQLSubDomain}.` : ''
    }${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `www.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: false,
  graphQLSubDomain: process.env.GRAPHQL_SUB_DOMAIN || 'graphql',
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '2004',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  logLevel: 'error',
  assetPrefix: '',
  enableHttpLogging: false,
  configName: 'production',
  msServiceDomain: 'ms-apps',
};
