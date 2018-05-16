// const os = require('os');

// function getLocalExternalIp() {
//   return Array.prototype.concat
//     .apply([], Object.values(os.networkInterfaces()))
//     .filter(details => details.family === 'IPv4' && !details.internal)
//     .pop().address;
// }

module.exports = {
  // hostIp: getLocalExternalIp(),
  hostIp: 'elia.haaretz.co.il',
  hostname: 'pre',
  imgBaseUrl: 'https://images.haarets.co.il/image',
  domain: 'https://www.haaretz.co.il',
  port: process.env.PORT || '3000',
  graphqlSubdomain: 'ms-apps',
  graphqlProtocol: 'http',
  papiSubDomain: 'pre',
  papiProtocol: 'https',
  ssoSubDomain: 'devsso',
  paymentSubDomain: 'dev-',
  baseHref: 'https://www.haaretz.co.il',
};
