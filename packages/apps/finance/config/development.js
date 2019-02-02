/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    ds: 'https://ms-apps-dev.haaretz.co.il/ds',
    newSso: 'https://ms-apps-dev.haaretz.co.il/sso',
    sso: 'https://devsso.haaretz.co.il',
    otp: {
      base: 'https://ms-apps-dev.haaretz.co.il/otp',
      generate: '/generate',
      validate: '/validate',
    },
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
    htzFunction: 'https://ms-apps-dev.haaretz.co.il/htz-function',
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/`;
    }),
    d3: defer(function () {
      return `http${
        this.d3useSSL ? 's' : ''
      }://${this.appFQDN}${this.d3exposedPort && this.d3Port ? `:${this.d3Port}` : ''}`;
    }),
    alerts: 'https://dev-alerts.haaretz.co.il',
  },
  appFQDN: defer(function () {
    return `${this.graphQLSubDomain ? `${this.graphQLSubDomain}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `pre.${this.domain}`;
  }),
  useSSL: false,
  graphQLuseSSL: false,
  graphQLexposedPort: true,
  graphQLSubDomain: process.env.HOSTNAME,
  d3useSSL: false,
  d3exposedPort: true,
  d3SubDomain: process.env.HOSTNAME,
  domain: 'themarker.com',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '3000',
  graphQLPort: process.env.GRAPHQL_PORT || '4000',
  d3Port: process.env.D3_PORT || '6000',
  logLevel: 'debug',
  assetPrefix: '',
  enableHttpLogging: false,
};
