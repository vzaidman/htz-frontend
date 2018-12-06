/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    newSso: 'https://ms-apps.haaretz.co.il/sso',
    sso: 'https://sso.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    userInfoUri: 'https://ms-apps.haaretz.co.il/userInfo',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/`;
    }),
    d3: defer(function () {
      return `http${
        this.d3useSSL ? 's' : ''
      }://${this.appFQDN}${this.d3exposedPort && this.d3Port ? `:${this.d3Port}` : ''}/`;
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
  graphQLSubDomain: 'graphql',
  d3useSSL: true,
  d3exposedPort: false,
  d3SubDomain: 'graphql',
  domain: 'themarker.com',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '2004',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  d3Port: process.env.D3_PORT || '6004',
  logLevel: 'error',
  assetPrefix: '',
  enableHttpLogging: false,
  configName: 'production',
};
