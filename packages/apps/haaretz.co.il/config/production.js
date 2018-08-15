/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://sso.haaretz.co.il',
    newSso: {
      HTZ_HEB: 'https://ms-apps.haaretz.co.il/sso-dev',
      HTZ_COM: 'https://ms-apps.haaretz.com/sso-dev',
      TM: 'https://ms-apps.themarker.com/sso-dev',
    },
    image: 'https://images.haarets.co.il/image',
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
  logLevel: 'error',
  assetPrefix: '',
  enableHttpLogging: false,
};
