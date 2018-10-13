import config from 'config';
import express from 'express';

const server = express();
const port = parseInt(process.env.D3_PORT || (config.has('d3Port') ? config.get('d3Port') : '6000'), 10);

async function run() {
  server.get('/', (req, res) => res.json('I\'m Alive !!'));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`🚀 D3 server is up and ready at ${config.get('hostIp')}:${port} `);
  });

}

try {
  run();
}
catch (e) {
  console.error(e, e.message, e.stack);
  process.exit(1);
}
