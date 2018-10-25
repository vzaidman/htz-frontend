/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://devsso.haaretz.co.il',
    newSso: 'https://ms-apps.haaretz.co.il/sso',
    userInfoUri: 'https://ms-apps.haaretz.co.il/userInfo',
    otp: {
      base: 'TODO',
      generate: '/generate',
      validate: '/validate',
    },
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.port ? `:${this.port}` : ''}/graphql`;
    }),
    alerts: 'https://dev-alerts.haaretz.co.il',
  },
  appFQDN: defer(function () {
    return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
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
  graphQLuseSSL: true,
  graphQLexposedPort: true,
  // todo: ask tomer if we will add a staging graphql-server with different subDomain
  graphQLSubDomain: process.env.GRAPHQL_SUB_DOMAIN || 'graphql-stg',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
};
