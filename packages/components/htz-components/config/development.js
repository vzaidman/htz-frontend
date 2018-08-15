module.exports = {
  service: {
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    alerts: 'https://dev-alerts.haaretz.co.il',
    newSso: {
      HTZ_HEB: 'https://ms-apps.haaretz.co.il/sso-dev',
      HTZ_COM: 'https://ms-apps.haaretz.com/sso-dev',
      TM: 'https://ms-apps.themarker.com/sso-dev',
    },
  },
  domain: 'haaretz.co.il',
  hostIp: process.env.SSH_CONNECTION
    ? process.env.SSH_CONNECTION.split(' ', 4)[2]
    : 'localhost',
  hostname: process.env.HOSTNAME,
  baseHref: 'https://www.haaretz.co.il',
  port: process.env.PORT || '6060',
};
