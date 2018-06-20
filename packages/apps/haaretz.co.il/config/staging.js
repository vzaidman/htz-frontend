/* global window */
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
    papi: 'http://elia.haaretz.co.il',
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
    return `pre.${this.domain}`;
  }),
  useSSL: false,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '3000',
};
