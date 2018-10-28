/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    newSso: 'https://ms-apps.haaretz.co.il/sso-dev',
    sso: 'https://devsso.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
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
  useSSL: false,
  graphQLuseSSL: false,
  graphQLexposedPort: true,
  graphQLSubDomain: process.env.HOSTNAME,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '3000',
  graphQLPort: process.env.GRAPHQL_PORT || '4000',
  logLevel: 'debug',
  assetPrefix: '',
  enableHttpLogging: false,
};
