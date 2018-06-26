module.exports = {
  service: {
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
  },
  domain: 'haaretz.co.il',
  hostIp: process.env.SSH_CONNECTION
    ? process.env.SSH_CONNECTION.split(' ', 4)[2]
    : 'localhost',
  hostname: process.env.HOSTNAME,
  baseHref: 'https://www.haaretz.co.il',
  port: process.env.PORT || '6060',
};
