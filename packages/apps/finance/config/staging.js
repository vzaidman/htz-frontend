/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    newSso: 'https://ms-apps-dev.haaretz.co.il/sso',
    sso: 'https://devsso.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
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
  // todo: ask tomer if we will add a staging graphql-server with different subDomain
  graphQLSubDomain: 'graphql',
  d3useSSL: true,
  d3exposedPort: true,
  // todo: ask tomer if we will add a staging d3-server with different subDomain
  d3SubDomain: 'd3',
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '2002',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  d3Port: process.env.D3_PORT || '6004',
  logLevel: 'info',
  assetPrefix: '',
  enableHttpLogging: false,
  configName: 'staging',
};
