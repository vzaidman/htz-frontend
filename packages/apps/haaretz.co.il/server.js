require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const next = require('next');
require('isomorphic-fetch');

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dev: DEV, });
const handle = app.getRequestHandler();

const MOCK_ARTICLES = {
  1.808116: {
    section: 'archaeology',
    title: 'How Ancient Babylonians Could Have Predicted the 2017 Eclipse',
    author: 'Ruth Schuster',
  },
  1.807195: {
    section: 'archaeology',
    title: "Tombs Found in Egypt's Nile Valley Date Back More Than 2,000 Years",
    author: 'The Associated Press and Ruth Schuster',
  },
};

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression()); // Compress responses.
    server.use(helmet()); // Various security-minded settings.

    // Mock API endpoints, so we can try fetching data.
    server.get('/mock-api/stories.json', (req, res) => {
      res.json({
        stories: Object.keys(MOCK_ARTICLES).map(id =>
          Object.assign({ id, }, MOCK_ARTICLES[id])
        ),
      });
    });

    server.get('/mock-api/article/:id.json', (req, res) => {
      const article = MOCK_ARTICLES[req.params.id];

      if (article) {
        res.json(article);
      }
      else {
        res.status(404).json({});
      }
    });

    server.get('/:section/:id(\\d[.]\\d+)', (req, res) => {
      const query = {
        section: req.params.section,
        id: req.params.id,
      };
      app.render(req, res, '/article', query);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(PORT, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
