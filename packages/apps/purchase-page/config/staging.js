/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    newSso: 'https://ms-apps-dev.haaretz.co.il/sso',
    sso: 'https://devsso.haaretz.co.il',
    payment: 'https://dev-payment.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/`;
    }),
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
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
  graphQLSubDomain: process.env.GRAPHQL_SUB_DOMAIN || 'graphql-stg',
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  appPort: process.env.APP_PORT || '2002',
  graphQLPort: process.env.GRAPHQL_PORT || '4004',
  // Path of promotions page in Polopoly CM
  polopolyPromotionsPagePath: 'promotions-page-react',
  logLevel: 'info',
  enableHttpLogging: false,
};
