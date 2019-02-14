/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://devsso.haaretz.co.il',
    newSso: 'https://ms-apps-dev.haaretz.co.il/sso',
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
    otp: {
      base: 'https://ms-apps-dev.haaretz.co.il/otp',
      generate: '/generate',
      validate: '/validate',
    },
    htzFunction: 'http://docker.themarker.com:8129/htz-function',
    ds: 'https://ms-apps-dev.haaretz.co.il/ds',
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    msSportResults: 'https://ms-apps-dev.themarker.com/ms-sport-results',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/graphql`;
    }),
    alerts: 'https://dev-alerts.haaretz.co.il',
  },
  appFQDN: defer(function () {
    return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `pre.${this.domain}`;
  }),
  useSSL: false,
  graphQLuseSSL: false,
  graphQLexposedPort: true,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '3000',
  graphQLPort: process.env.GRAPHQL_PORT || '4000',
  logLevel: 'debug',
  assetPrefix: '',
  enableHttpLogging: false,
  msServiceDomain: 'ms-apps-dev',
};
