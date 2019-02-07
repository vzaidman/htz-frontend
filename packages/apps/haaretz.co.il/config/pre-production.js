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
    return `pre-prod.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: false,
  graphQLSubDomain: process.env.GRAPHQL_SUB_DOMAIN || 'graphql-pp2p',
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '2004',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  logLevel: 'error',
  assetPrefix: '',
  enableHttpLogging: false,
  configName: 'production',
};
