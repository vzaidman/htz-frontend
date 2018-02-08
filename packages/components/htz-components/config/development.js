module.exports = {
  imgBaseUrl: 'https://images.haarets.co.il/image',
  domain: 'https://www.haaretz.co.il',
  hostIp: process.env.SSH_CONNECTION ? process.env.SSH_CONNECTION.split(' ', 4)[2] : 'localhost',
  hostname: process.env.HOSTNAME,
};
