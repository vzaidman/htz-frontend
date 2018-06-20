/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.appFQDN}`;
    }),
    sso: 'https://devsso.haaretz.co.il',
    image: 'http://res.cloudinary.com/kfirlevy/image',
    graphql: defer(function () {
      return `http${
        this.useSSL ? 's' : ''
      }://${this.appFQDN}${this.port ? `:${this.port}` : ''}/graphql`;
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
  useSSL: false,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '3000',
  // baseHref: 'https://www.haaretz.co.il',
};
