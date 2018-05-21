const os = require('os');

function getLocalExternalIp() {
  if (process.env.BIND_ADDRESS) {
    return process.env.BIND_ADDRESS;
  }

  return Array.prototype.concat
    .apply([], Object.values(os.networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address;
}

// todo: can also be TheMarker

module.exports = {
  hostIp: getLocalExternalIp(),
  //  todo : change hostname
  hostname: 'www',
  imgBaseUrl: 'https://images.haarets.co.il/image',
  domain: 'haaretz.co.il',
  baseHref: 'https://www.haaretz.co.il',
  port: process.env.PORT || '2004',
  graphqlSubdomain: 'promotions',
  graphqlProtocol: process.env.NO_SSL ? 'http' : 'https',
  papiSubDomain: 'www',
  papiProtocol: process.env.NO_SSL ? 'http' : 'https',
  ssoSubDomain: 'sso',
};
