/* global fetch */
import path from 'path';
import express from 'express';
import querystring from 'querystring';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import { getWithDomain, } from '@haaretz/app-utils';
import Cookies from 'universal-cookie';
import config from 'config';

export const friendlyRoutes = {
  stage1: 'product',
  stage2: 'price',
  stage3: 'login',
  stage4: 'method',
  stage5: 'payment',
  thankYou: 'thankYou',
};
const polopolyPromotionsPage = config.has('polopolyPromotionsPagePath')
  ? config.get('polopolyPromotionsPagePath')
  : 'promotions-page-react';
const appPrefix = '/promotions-page'; // path shown in URL
const folderPrefix = '/promotions-page'; // Project structure relative folder

let globalStageToRender = null;
let isRedirect = false;

/**
 * A function that fetches data from papi endpoint and determines the first page
 * the app should render
 * @param {any} req An express.js request
 * @param {boolean} DEV is in development mode
 * @returns {string} a stage to render, one of [ stage1, stage2, thankYou ]
 */
async function getPageToRender(req, DEV = false) {
  // Path of promotions page in Polopoly CM
  const baseService = getWithDomain(req.hostname, config.get('service.base'));

  DEV && console.log('promo from getPageToRender', req.params.promo);
  const promoPath = req.params.promo ? `/${req.params.promo}` : null;
  DEV && console.log('hostname from getPageToRender', req.hostname);
  const cookies = new Cookies(req.headers.cookie);
  const userId = CookieUtils.stringToMap(cookies.get('tmsso') || '', {
    separator: /:\s?/,
  }).userId;
  // const fetchUrl = `${protocol}://${subDomain}.${domain}/papi${polopolyPromotionsPage}${promoPath ||
  //   ''}?userId=${userId} `;
  const fetchUrl = `${baseService}/papi${polopolyPromotionsPage}${promoPath ||
    ''}?userId=${userId} `;
  DEV && console.log('path from getPageToRender', fetchUrl);
  try {
    const fetchData = await fetch(fetchUrl);
    const { pageNumber, } = await fetchData.json();
    const stageToRender =
      Math.floor(pageNumber) === 7
        ? 'thankYou'
        : Math.floor(pageNumber) === 3
          ? 'stage2'
          : 'stage1';
    globalStageToRender = stageToRender;
    DEV && console.log('pageNumber from async await', pageNumber);
    DEV && console.log('stageToRender ', stageToRender);
    DEV && console.log('location@@@@', friendlyRoutes[stageToRender]);

    return stageToRender;
  }
  catch (error) {
    console.log('error from getPageToRender, defaulting to stage1', error);
    return 'stage1';
  }
}

export default function purchase(app, server, DEV = false) {
  function render(req, res, stageToRender) {
    isRedirect = false;
    return app.render(req, res, `${folderPrefix}/${stageToRender}`, req.query);
  }

  function redirect(req, res, pageToRender) {
    isRedirect = true;
    let query = `${querystring.stringify(req.query)}`;
    query = query ? `?${query}` : '';
    return res.redirect(`${appPrefix}/${friendlyRoutes[pageToRender]}${query}`);
  }

  /* Offers stage1 */
  server.get(
    [ `${appPrefix}/${friendlyRoutes.stage1}`, `${appPrefix}/stage1`, ],
    async (req, res) => {
      DEV &&
        console.log('globalStageToRender from stage 1', globalStageToRender);
      DEV && console.log('isRedirect from stage 1', isRedirect);
      const pageToRender =
        isRedirect && globalStageToRender
          ? globalStageToRender
          : await getPageToRender(req, DEV);

      if (pageToRender === 'stage1') {
        return render(req, res, 'stage1');
      }
      return redirect(req, res, pageToRender);
    }
  );

  /* Offers stage2 */
  server.get(
    [ `${appPrefix}/${friendlyRoutes.stage2}`, `${appPrefix}/stage2`, ],
    async (req, res) => {
      DEV &&
        console.log(
          'globalStageToRender from stage 2 before fetch',
          globalStageToRender
        );
      DEV && console.log('isRedirect from stage 2', isRedirect);

      const pageToRender =
        isRedirect && globalStageToRender
          ? globalStageToRender
          : await getPageToRender(req, DEV);

      if (pageToRender === 'stage2') {
        return render(req, res, 'stage2');
      }
      return redirect(req, res, pageToRender);
    }
  );

  /* Offers thankYou */
  server.get(`${appPrefix}/thankYou`, async (req, res) => {
    DEV &&
      console.log(
        'globalStageToRender from stage thankYou before fetch',
        globalStageToRender
      );
    DEV && console.log('isRedirect from stage thankYou', isRedirect);
    const pageToRender =
      isRedirect && globalStageToRender
        ? globalStageToRender
        : await getPageToRender(req, DEV);
    if (pageToRender === 'thankYou' || req.query.msg === 'thank_user') {
      return render(req, res, 'thankYou');
    }
    return redirect(req, res, pageToRender);
  });

  /* all other stages */
  server.get(
    [
      '/',
      `${appPrefix}/`,
      `${appPrefix}/${friendlyRoutes.stage3}`,
      `${appPrefix}/${friendlyRoutes.stage4}`,
      `${appPrefix}/${friendlyRoutes.stage5}`,
      `${appPrefix}/debt`,
    ],
    async (req, res) => {
      const pageToRender = await getPageToRender(req, DEV);
      return redirect(req, res, pageToRender);
    }
  );

  // send robots.txt file
  const options = {
    root: path.join(`${process.cwd()}/static`),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  };
  server.get('/robots.txt', (req, res) =>
    res.status(200).sendFile('robots.txt', options)
  );

  /* Promos */

  server.get(`${appPrefix}/:promo`, async (req, res) => {
    req.query = Object.assign({}, req.query, {
      offer: req.params.promo,
    });
    DEV &&
      console.log(
        'promo from /:promo redirect req.param.promo',
        req.params.promo
      );
    const promoQuery = `offer=${encodeURIComponent(req.params.promo)}`;
    const pageToRender = await getPageToRender(req, DEV);
    isRedirect = true;
    return res.redirect(
      `${appPrefix}/${friendlyRoutes[pageToRender]}?${promoQuery}`
    );
  });

  /* Promos with subPromos redirect */
  server.get(`${appPrefix}/:promo/:subPromo`, async (req, res) => {
    req.query = Object.assign({}, req.query, {
      offer: req.params.promo,
    });
    DEV &&
      console.log(
        'promo from /:promo/:subPromo redirect req.param.promo',
        req.params.promo
      );
    const promoQuery = `offer=${encodeURIComponent(req.params.promo)}/${
      req.params.subPromo
    }`;
    const pageToRender = await getPageToRender(req, DEV);
    isRedirect = true;
    return res.redirect(
      `${appPrefix}/${friendlyRoutes[pageToRender]}?${promoQuery}`
    );
  });

  server.use(
    [ '/static', `${appPrefix}/static`, ],
    express.static(path.join(`${process.cwd()}/static`), {
      redirect: false,
    })
  );
}
