/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://devsso.haaretz.co.il',
    newSso: 'https://ms-apps.haaretz.co.il/sso-dev',
    userInfoUri: 'https://ms-apps.haaretz.co.il/userInfo-dev',
    otp: {
      base: 'http://docker.themarker.com:8124/otp-dev',
      generate: '/generate',
      validate: '/validate',
    },
    htzFunction: 'http://docker.themarker.com:8129/htz-function',
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
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
};
