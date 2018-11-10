import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

import advisors from './routes/advisors';
import finance from './routes/finance';

const app = express();
const port = parseInt(process.env.D3_PORT || (config.has('d3Port') ? config.get('d3Port') : '6000'), 10);

async function run() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false, }));

  // Routes by Apps
  app.use('/finance', finance);
  app.use('/advisors', advisors);

  app.listen(port, err => {
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
