/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    sso: 'https://sso.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    graphql: defer(function () {
      return `http${
        this.useSSL ? 's' : ''
      }://${this.appFQDN}${this.port ? `:${this.port}` : ''}/graphql`;
    }),
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.appFQDN}`;
    }),
    polopolyImageBaseHref: defer(function () {
      return `http${
        this.useSSL ? 's' : ''
      }://${this.hostname ? `${this.hostname}.` : ''}${this.domain}${this.port ? `:${this.port}` : ''}`;
    }),
  },
  appFQDN: defer(function () {
    return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `www.${this.domain}`;
  }),
  useSSL: true,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '2004',
  // baseHref: 'https://www.haaretz.co.il',
};
