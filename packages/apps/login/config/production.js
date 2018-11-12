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
      base: 'TODO',
      generate: '/generate',
      validate: '/validate',
    },
    image: 'https://images.haarets.co.il/image',
    ds: 'https://ms-apps.haaretz.co.il/ds',
    htzFunction: 'http://docker.themarker.com:8129/htz-function',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.port ? `:${this.port}` : ''}/graphql`;
    }),
    alerts: 'https://alerts.haaretz.co.il',
  },
  appFQDN: defer(function () {
    return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `www.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: false,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '2004',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  logLevel: 'error',
  assetPrefix: '',
  enableHttpLogging: false,
};
