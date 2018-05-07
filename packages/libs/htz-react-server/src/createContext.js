/* global fetch */
import DataLoader from 'dataloader';
import querystring from 'querystring';
import config from 'config';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import Cookies from 'universal-cookie';

const host = (config.has('hostname') && config.get('hostname')) || 'www';
const ssoSubDomain =
  (config.has('ssoSubDomain') && config.get('ssoSubDomain')) || 'devsso';

const appPrefix = '/promotions-page-react';

// const protocol = (config.has('polopolyPapiProtocl') && config.get('polopolyPapiProtocl')) || 'http';
// const domain = (config.has('polopolyPapiDomain') && config.get('polopolyPapiDomain')) || '.haaretz.co.il';

export function createLoaders(req) {
  const cookies = new Cookies(req.headers.cookie);
  // TODO: By default, `DataLoader` just caches the results forever,
  // but we should eventually expunge them from the cache.
  const cmlinkLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        // TODO change hardcoded host
        fetch(`http://${host}.haaretz.co.il/json/cmlink/${path}`).then(
          response => response.json()
        )
      )
    )
  );
  const pageLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        fetch(`http://${host}.haaretz.co.il/papi${path}`).then(response =>
          response.json()
        )
      )
    )
  );

  const purchasePageLoader = new DataLoader(keys => {
    let baseUri = `https://${host}.haaretz.co.il/papi`;
    if (req !== undefined && process.env.NODE_ENV === 'production') {
      const papiSubDomainhost = config.get('papiSubDomain');
      const papiProtocol = config.get('papiProtocol');
      const papiHostname = `${papiSubDomainhost}.${req.hostname
        .split('.')
        .splice(1)
        .join('.')}`;
      baseUri = `${papiProtocol}://${papiHostname}/papi`;
    }
    const userId = CookieUtils.stringToMap(cookies.get('tmsso') || '', {
      separator: /:\s?/,
    }).userId;
    console.log('userId from loader: ', userId);
    return Promise.all(
      keys.map(path => {
        // Replaces and normalizes path names:
        // path -> normlized_path
        // '/' -> '/'
        // '/promotions-page' -> ''
        // '/promotions-page/offers' -> '/promotions-page' (special case)
        // '/promotions-page/promotions-page' -> '/promotions-page'
        // '/promotions-page/promotions-page/promotions-page' -> '/promotions-page/promotions-page'
        // '/promotions-page/less-ads' -> '/less-ads'
        const [ pathWithoutQuery, queryPartFromPath, ] = path.split(/\?(.+)/);
        const query = queryPartFromPath
          ? querystring.parse(queryPartFromPath)
          : {};
        // eslint-disable-next-line no-param-reassign
        path = query.offer
          ? `${pathWithoutQuery}/${query.offer}`
          : `${pathWithoutQuery}`; // Augment request for papi
        // '/promotions-page/more-ads/some-sub-promotion' -> '/more-ads/some-sub-promotion'
        const normlizedPath = `${baseUri}${appPrefix}${(path || '/')
          .replace(new RegExp(`${appPrefix}/stage[0-9]`), `${appPrefix}`)
          .replace(`${appPrefix}/offers`, `${appPrefix}`)
          .replace(`${appPrefix}`, '')}${
          path.includes('?') ? '&' : '?'
        }userId=${userId}`;
        console.log(
          'GRAPHQL - fetching data from papi using endpoint: ',
          normlizedPath
        );
        return fetch(normlizedPath)
          .then(response => {
            if (response.ok) {
              return response;
            }
            return fetch(`${baseUri}${appPrefix}`);
          })
          .then(response => response.json());
      })
    );
  });
  const couponProductLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(couponCode =>
        fetch(
          `https://${host}.haaretz.co.il/papi${appPrefix}?couponCode=${couponCode}`
        ).then(response => response.json())
      )
    )
  );
  const listsLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        fetch(
          `http://${host}.haaretz.co.il/papi/cmlink/${path}?vm=whtzResponsive&exploded=true`
        ).then(response => response.json())
      )
    )
  );
  const payWithExistingCardLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(paymentData =>
        fetch(
          `https://${ssoSubDomain}.haaretz.co.il/sso/r/registerWebUser?${querystring.stringify(
            paymentData
          )}`
        ).then(response => response.json())
      )
    )
  );
  const resetPasswordLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(userName =>
        fetch(`https://${ssoSubDomain}.themarker.com/sso/r/resetPassword`, {
          method: 'post',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: querystring.stringify({
            newsso: true,
            layer: 'sendpassword',
            site: 80,
            userName,
          }),
        }).then(response => response.json())
      )
    )
  );

  return {
    pageLoader,
    cmlinkLoader,
    listsLoader,
    purchasePageLoader,
    couponProductLoader,
    payWithExistingCardLoader,
    resetPasswordLoader,
  };
}

export function createPosters(cookies) {
  const cmlinkCommentPoster = newComment =>
    fetch(
      `http://${host}.haaretz.co.il/cmlink/${newComment.commentElementId}`,
      {
        method: 'post',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: querystring.stringify({
          commentsId: newComment.commentElementId,
          comment_author: newComment.commentAuthor,
          comment_title: newComment.commentTitle,
          comment_text: newComment.commentText,
          articleId: newComment.articleId,
          parentCommentId: newComment.parentCommentId,
          formId: 'comments-form',
          action: 'CREATE_COMMENT',
          ajax: true,
        }),
      }
    )
      .then(response => response.json())
      .then(data => data);

  const cmlinkCommentAbuseReport = newAbuseReport =>
    fetch(
      `http://${host}.haaretz.co.il/cmlink/${newAbuseReport.commentElementId}`,
      {
        method: 'post',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          origin: `http://${host}.haaretz.co.il`,
        },
        body: querystring.stringify({
          commentId: newAbuseReport.commentId,
          action: 'REPORT_COMMENT_ABUSE',
          invisible: true,
          'g-recaptcha-response': newAbuseReport.captchaKey,
          ajax: true,
        }),
      }
    )
      .then(response => response.status)
      .then(data => data);

  const loggerVotePoster = newVote =>
    fetch(
      // Todo: Change Mador (2.285) from hardcoded to dynamic
      `http://${host}.haaretz.co.il/logger/p.gif?type=COMMENTS_RATINGS&a=%2F2.285%2F${
        newVote.articleId
      }&comment=${newVote.commentId}&group=${
        newVote.group
      }&_=${new Date().getTime()}`,
      {
        method: 'get',
        credentials: 'include',
        headers: {
          Accept: '*/*',
        },
      }
    )
      .then(response => response.status)
      .then(data => data);

  const notificationSignUpPoster = newSignUpData =>
    fetch(`http://${host}.haaretz.co.il/comments/acceptreject`, {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: querystring.stringify({
        userEmail: newSignUpData.userEmail,
        c: newSignUpData.commentId,
        h: newSignUpData.hash,
        a: '2',
        // todo: cheack what needs to be here allowMarketing true /false ?
        m: '',
        // todo: check what needs to be here paying/anonymous check from cookie?
        ut: 'anonymous',
      }),
    })
      .then(response => response.status)
      .then(data => data);

  const newsLetterRegister = newsletterSignUp =>
    fetch(
      `http://${host}.haaretz.co.il/newsLetterRegister?EMAIL_FIELD=${
        newsletterSignUp.userEmail
      }${
        newsletterSignUp.checkBox ? '&ALLOW_MARKETING_MESSAGES_FIELD=true' : ''
      }&segmentId=${newsletterSignUp.segmentId}&_=${new Date().getTime()}`,
      {
        method: 'get',
        credentials: 'include',
        headers: {
          Accept: '*/*',
        },
      }
    ).then(response => response.ok);
  return {
    cmlinkCommentPoster,
    cmlinkCommentAbuseReport,
    loggerVotePoster,
    notificationSignUpPoster,
    newsLetterRegister,
  };
}

export default function createContext(req) {
  const loaders = createLoaders(req);
  const posters = createPosters(req);
  return {
    req,
    ...loaders,
    ...posters,
  };
}
