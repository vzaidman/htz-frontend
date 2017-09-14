module.exports = {
  HostIP: process.env.SSH_CONNECTION.split(' ', 4)[2],
  HostName: process.env.HOSTNAME,
};
