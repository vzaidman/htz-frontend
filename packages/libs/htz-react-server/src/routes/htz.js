import { createLogger, } from '@haaretz/app-utils';

export default function htz(app, server, DEV) {
  const logger = createLogger({
    name: 'htz-router',
  });

  /* Home Page */
  server.get('/', (req, res) => {
    if (req.params[0] && !req.params[0].startsWith('/')) {
      req.params[0] = `/${req.params[0]}`;
    }
    else {
      req.params[0] = '/';
    }
    const query = {
      path: req.params[0],
    };
    return app.render(req, res, '/', query);
  });

  /* Article Page */
  server.get([ /^.*(1\.\d+){1}$/, ], (req, res) => {
    if (DEV) {
      logger.trace(
        'captured an article at  req.path: ',
        req.path,
        ' req.params[0]: ',
        req.params[0]
      );
    }
    if (!req.params[0].startsWith('/')) {
      req.params[0] = `/${req.params[0]}`;
    }
    const query = {
      path: req.query.preview ? req.query.preview : req.params[0],
    };
    return app.render(req, res, '/article', query);
  });
}
