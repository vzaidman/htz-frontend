import bunyan from 'bunyan';

export default function createBrowserLogger(options) {
  function MyRawStream() {}
  MyRawStream.prototype.write = function log(rec) {
    console.log(
      '[%s] %s: %s',
      rec.time.toISOString(),
      bunyan.nameFromLevel[rec.level],
      rec.msg
    );
  };

  const logger = bunyan.createLogger({
    name: options.name,
    streams: [
      {
        level: 'info',
        stream: new MyRawStream(),
        type: 'raw',
      },
    ],
  });

  return logger;
}
