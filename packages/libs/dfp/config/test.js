module.exports = {
  service: {
    image: 'https://images.haarets.co.il/image',
    newSso: 'https://ms-apps-dev.haaretz.co.il/sso',
    sso: 'https://devsso.haaretz.co.il',
    otp: {
      base: 'https://ms-apps-dev.haaretz.co.il/otp',
      generate: '/generate',
      validate: '/validate',
    },
    userInfoUri: 'https://ms-apps-dev.haaretz.co.il/userInfo',
    htzFunction: 'https://ms-apps-dev.haaretz.co.il/htz-function',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
  },
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  baseHref: 'https://www.haaretz.co.il',
  logLevel: 'debug',
  enableHttpLogging: false,
};
