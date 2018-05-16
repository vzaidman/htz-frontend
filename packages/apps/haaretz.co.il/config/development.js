const os = require('os');

function getLocalExternalIp() {
  return Array.prototype.concat
    .apply([], Object.values(os.networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address;
}

module.exports = {
  hostIp: getLocalExternalIp(),
  hostname: process.env.HOSTNAME,
  imgBaseUrl: 'https://images.haarets.co.il/image',
  domain: 'haaretz.co.il',
  port: '3000',
  graphqlSubdomain: '',
  graphqlProtocol: 'http',
  papiSubDomain: 'elia',
  papiProtocol: 'http',
  ssoSubDomain: 'devsso',
  paymentSubDomain: 'dev-',
  baseHref: 'https://www.haaretz.co.il',
};
