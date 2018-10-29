/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://devsso.haaretz.co.il',
    newSso: 'https://ms-apps.haaretz.co.il/sso-dev',
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
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
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/`;
    }),
    alerts: 'https://dev-alerts.haaretz.co.il',
  },
  appFQDN: defer(function () {
    return `${this.graphQLSubDomain ? `${this.graphQLSubDomain}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `pre.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: true,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '3000',
  logLevel: 'info',
  assetPrefix: '',
  enableHttpLogging: false,
  // todo: ask tomer if we will add a staging graphql-server with different subDomain
  graphQLSubDomain: process.env.GRAPHQL_SUB_DOMAIN || 'graphql-stg',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
};
