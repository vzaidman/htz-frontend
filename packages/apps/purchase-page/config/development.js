/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  // Service contains service endpoints as a full URL of the form:
  // (protocol://FQDN/path) (/path is optional, service dependent)
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    ds: 'https://ms-apps-dev.haaretz.co.il/ds',
    newSso: 'https://ms-apps-dev.haaretz.co.il/sso/',
    sso: 'https://devsso.haaretz.co.il',
    otp: {
      base: 'https://ms-apps-dev.haaretz.co.il/otp',
      generate: '/generate',
      validate: '/validate',
    },
    payment: 'https://ms-purchase-dev.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
    htzFunction: 'https://ms-apps-dev.haaretz.co.il/htz-function',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.graphQLPort ? `:${this.graphQLPort}` : ''}/`;
    }),
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
  },
  // Locally run app stack
  appFQDN: defer(function () {
    return `${this.graphQLSubDomain ? `${this.graphQLSubDomain}.` : ''}${this.domain}`;
  }),
  // Connection to remote
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
  // Path of promotions page in Polopoly CM
  polopolyPromotionsPagePath: 'promotions-page-react',
  logLevel: 'debug',
  enableHttpLogging: true,
};
