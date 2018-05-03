import path from 'path';
import express from 'express';

const appPrefix = '/promotions-page-react';
const folderPrefix = '/promotions-page'; // Project structure relative folder
module.exports = (app, server) => {
  /* Redirect to Landing Page */
  server.get('/', (req, res) => res.redirect(`${appPrefix}`));

  /* Offers Main Page */
  server.get(
    [ `${appPrefix}/offers`, `${appPrefix}/offers/:promo`, ],
    (req, res) => app.render(req, res, `${folderPrefix}/stage1`)
  );

  /* Thank you Page */
  server.get(`${appPrefix}/thankYou`, (req, res) =>
    app.render(req, res, `${folderPrefix}/thankYou`, req.query)
  );

  /* Redirect to Main Page */
  server.get(
    new RegExp(`^${appPrefix}/stage[0-9]|^${appPrefix}/debt$`, 'g'),
    (req, res) => res.redirect(`${appPrefix}/offers`)
  );

  /* Landing Page and promos */
  server.get(
    `${appPrefix}`,
    (req, res) =>
      (req.query && req.query.msg && req.query.msg === 'thank_user'
        ? res.redirect(`${appPrefix}/thankYou?${encodeURIComponent(req.query)}`)
        : app.render(req, res, '/'))
  );

  /* Promos */
  server.get(`${appPrefix}/:promo`, (req, res) => {
    req.query = Object.assign({}, req.query, {
      promo: req.params.promo,
    });
    return app.render(req, res, `${folderPrefix}/stage1`);
  });

  server.use(
    [ '/static', `${appPrefix}/static`, ],
    express.static(
      path.join(
        __dirname,
        '../../../../../../packages/apps/purchase-page/static'
      )
    )
  );
};
