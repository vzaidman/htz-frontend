module.exports = {
  service: {
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    newSso: {
      HTZ_HEB: 'https://ms-apps.haaretz.co.il/sso-dev',
      HTZ_COM: 'https://ms-apps.haaretz.com/sso-dev',
      TM: 'https://ms-apps.themarker.com/sso-dev',
    },
  },
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: 3000,
};
