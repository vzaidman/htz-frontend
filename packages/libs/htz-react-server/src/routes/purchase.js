import path from 'path';
import express from 'express';
import querystring from 'querystring';

const appPrefix = '/promotions-page-react'; // path shown in URL
const folderPrefix = '/promotions-page'; // Project structure relative folder
export const friendlyRoutes = {
  stage1: 'product',
  stage2: 'price',
  stage3: 'login',
  stage4: 'method',
  stage5: 'payment',
};

export default function purchase(app, server) {
  /* Landing Page only */
  server.get(
    `${appPrefix}`,
    (req, res) =>
      (req.query && req.query.msg && req.query.msg === 'thank_user'
        ? res.redirect(`${appPrefix}/thankYou?${encodeURIComponent(req.query)}`)
        : res.redirect(
          `${appPrefix}/${friendlyRoutes.stage1}${
            querystring.stringify(req.query)
              ? `?${querystring.stringify(req.query)}`
              : ''
          }`
        ))
  );
  /* Offers Main Page */
  server.get(
    [ `${appPrefix}/${friendlyRoutes.stage1}`, `${appPrefix}/stage1`, ],
    (req, res) =>
      // // has valid stage param 'or' fallback to stage 1
      // const stage = /^stage\d$/.test(req.query.stage) ? req.query.stage : 'stage1';
      app.render(req, res, `${folderPrefix}/stage1`, req.query)
  );

  /* Stage X */
  server.get(
    [
      new RegExp(`^${appPrefix}/stage[0-9]`, 'g'),
      `${appPrefix}/${friendlyRoutes.stage2}`,
      `${appPrefix}/${friendlyRoutes.stage3}`,
      `${appPrefix}/${friendlyRoutes.stage4}`,
      `${appPrefix}/${friendlyRoutes.stage5}`,
    ],
    (req, res) => {
      const stageNumber = req.path.includes('stage')
        ? req.path.charAt(req.path.indexOf('stage') + 5) || 1
        : 1;
      console.log(
        `got server request to render ${
          req.path
        } - stage rendered in app is: ${folderPrefix}/stage${stageNumber}`
      );
      // return app.render(req, res, `${folderPrefix}/stage${stageNumber}`, req.query);
      let query = `${querystring.stringify(req.query)}`;
      query = query ? `?${query}` : '';
      res.redirect(`${appPrefix}/${friendlyRoutes.stage1}${query}`);
    }
  );

  /* Thank you Page */
  server.get(`${appPrefix}/thankYou`, (req, res) =>
    app.render(req, res, `${folderPrefix}/thankYou`, req.query)
  );

  /* Debt Page */
  server.get(`${appPrefix}/debt`, (req, res) =>
    res.redirect(`${appPrefix}/${friendlyRoutes.stage1}`)
  );

  /* Promos redirect */
  server.get(`${appPrefix}/:promo`, (req, res) => {
    req.query = Object.assign({}, req.query, {
      offer: req.params.promo,
    });
    // const stage = /^stage\d$/.test(req.query.stage) ? req.query.stage : 'stage1';
    const promoQuery = `offer=${encodeURIComponent(req.params.promo)}`;
    return res.redirect(`${appPrefix}/${friendlyRoutes.stage1}?${promoQuery}`);
  });

  /* Promos redirect */
  server.get(`${appPrefix}/:promo/:subPromo`, (req, res) => {
    req.query = Object.assign({}, req.query, {
      offer: req.params.promo,
    });
    const promoQuery = `offer=${encodeURIComponent(req.params.promo)}/${
      req.params.subPromo
    }`;
    return res.redirect(`${appPrefix}/${friendlyRoutes.stage1}?${promoQuery}`);
  });

  /* Redirect to Landing Page */
  server.get('/', (req, res) => res.redirect(`${appPrefix}`));

  server.use(
    [ '/static', `${appPrefix}/static`, ],
    express.static(
      path.join(
        __dirname,
        '../../../../../../packages/apps/purchase-page/static'
      ),
      {
        redirect: false,
      }
    )
  );
}
