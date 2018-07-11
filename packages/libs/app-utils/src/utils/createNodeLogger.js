import bunyan from 'bunyan';

export default function createNodeLogger(options) {
  const nodeLogger = bunyan.createLogger({
    name: options.name,
    streams: [
      {
        level: 'info',
        stream: process.stdout,
      },
      // TODO connect slack web-hook here for fatal errors (stage)
      //   {
      //     level: 'error',
      //     path: '/var/tmp/bunyan-test-error.log', // log ERROR and above to a file
      //   },
    ],
    level: 'info',
  });
  return nodeLogger;
}
