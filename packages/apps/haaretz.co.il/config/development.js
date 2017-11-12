module.exports = {
  hostIp: process.env.SSH_CONNECTION.split(' ', 4)[2],
  hostname: process.env.HOSTNAME,
};
