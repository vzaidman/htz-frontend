/* global fetch */
import DataLoader from 'dataloader';
import querystring from 'querystring';
import config from 'config';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import { switchToDomain, createLogger, } from '@haaretz/app-utils';
import Cookies from 'universal-cookie';

const logger = createLogger({
  name: 'createContext',
});
// Path of promotions page in Polopoly CM
const polopolyPromotionsPage = config.has('polopolyPromotionsPagePath')
  ? config.get('polopolyPromotionsPagePath')
  : 'promotions-page-react';

export function createLoaders(req) {
  const hostname = req.hostname;
  const ssoService = config.get('service.sso');
  const newSsoService = config.get('service.newSso');
  const serviceBase = switchToDomain(hostname, config.get('service.base'));
  const cookies = new Cookies(req.headers.cookie);
  // TODO: By default, `DataLoader` just caches the results forever,
  // but we should eventually expunge them from the cache.

  const articleLinkDataLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(id => {
        logger.info(
          'articleLinkDataLoader path: ',
          `${serviceBase}/cmlink/Haaretz.Element.ArticleDataElement/${id}`
        );
        return fetch(
          `${serviceBase}/cmlink/Haaretz.Element.ArticleDataElement/${id}`
        ).then(response => response.json());
      })
    )
  );
  const cmlinkLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        fetch(`${serviceBase}/json/cmlink/${path}`).then(response =>
          response.json()
        )
      )
    )
  );
  const pageLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path => {
        const fetchPath = path.includes('preview')
          ? `http:${path}`
          : `${serviceBase}/papi${path.startsWith('/') ? '' : '/'}${path}`;
        logger.info(`pageLoader - papi - loading: ${fetchPath}`);
        return fetch(fetchPath).then(response => response.json());
      })
    )
  );

  const nextArticleLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(({ sectionId, readingHistory = [], }) =>
        fetch(
          `${serviceBase}/findNextArticleBySection?sectionId=${sectionId}&excludedArticles=${readingHistory.join(
            ','
          )}`
        ).then(response => response.json())
      )
    )
  );

  const purchasePageLoader = new DataLoader(keys => {
    const baseUri = `${serviceBase}/papi`;
    const userId = CookieUtils.stringToMap(cookies.get('tmsso') || '', {
      separator: /:\s?/,
    }).userId;
    return Promise.all(
      // 'path' means campaign path relative to polopoly root campaign page (which is '/')
      keys.map(path => {
        const [ pathWithoutQuery, queryPartFromPath, ] = path.split(/\?(.+)/);
        const query = queryPartFromPath
          ? querystring.parse(queryPartFromPath)
          : {};
        // eslint-disable-next-line no-param-reassign
        path = query.offer
          ? `${pathWithoutQuery}/${query.offer}`
          : `${pathWithoutQuery}`; // Augment request for papi
        // '/promotions-page/more-ads/some-sub-promotion' -> '/more-ads/some-sub-promotion'
        const normlizedPath = `${baseUri}${
          polopolyPromotionsPage.startsWith('/') ? '' : '/'
        }${polopolyPromotionsPage}${(path || '/').replace(
          `${polopolyPromotionsPage}`,
          ''
        )}${path.includes('?') ? '&' : '?'}userId=${userId}`;
        logger.info(
          'GRAPHQL - fetching data from papi using endpoint: ',
          normlizedPath
        );
        return fetch(normlizedPath)
          .then(response => {
            if (response.ok) {
              return response;
            }
            return fetch(
              `${baseUri}${
                polopolyPromotionsPage.startsWith('/') ? '' : '/'
              }${polopolyPromotionsPage}`
            );
          })
          .then(response => response.json());
      })
    );
  });
  const couponProductLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(couponCode =>
        fetch(
          `${serviceBase}/papi${
            polopolyPromotionsPage.startsWith('/') ? '' : '/'
          }${polopolyPromotionsPage}?couponCode=${couponCode}`
        ).then(response => response.json())
      )
    )
  );
  const listsLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(({ listId, history, }) =>
        fetch(
          `${serviceBase}/papi/cmlink${
            listId.startsWith('/') ? '' : '/'
          }${listId}?vm=whtzResponsive&exploded=true&exclude=${
            history ? history.join(',') : ''
          }`
        ).then(response => response.json())
      )
    )
  );
  const payWithExistingCardLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(paymentData => {
        console.log(
          'fetch url for payWithExistingCard from create context: ',
          `${ssoService}/sso/r/registerWebUser?${querystring.stringify(
            paymentData
          )}`
        );
        return fetch(
          `${ssoService}/sso/r/registerWebUser?${querystring.stringify(
            paymentData
          )}`
        ).then(response => response.json());
      })
    )
  );

  const isEmailValid = new DataLoader(keys =>
    Promise.all(
      keys.map(email => {
        console.log(
          'fetch url for isEmailValid from create context: ',
          `${newSsoService}/isUserEmailValid?${querystring.stringify(
            email
          )}`
        );
        return fetch(
          `${newSsoService}/isUserEmailValid?${querystring.stringify(
            email
          )}`
        ).then(response => response.json());
      })
    )
  );

  const isPhoneValid = new DataLoader(keys =>
    Promise.all(
      keys.map(phoneData => {
        console.log(
          'fetch url for isPhoneValid from create context: ',
          `${newSsoService}/isPhoneValid?${querystring.stringify(
            phoneData
          )}`
        );
        return fetch(
          `${newSsoService}/isPhoneValid?${querystring.stringify(
            phoneData
          )}`
        ).then(response => response.json());
      })
    )
  );

  const isPhoneConnectedWithEmail = new DataLoader(keys =>
    Promise.all(
      keys.map(phoneData => {
        console.log(
          'fetch url for isPhoneConnectedWithEmail from create context: ',
          `${newSsoService}/isPhoneConnectedWithEmail?${querystring.stringify(
            phoneData
          )}`
        );
        return fetch(
          `${newSsoService}/isPhoneConnectedWithEmail?${querystring.stringify(
            phoneData
          )}`
        ).then(response => response.json());
      })
    )
  );

  const resetPasswordLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(userName =>
        fetch(`${ssoService}/sso/r/resetPassword`, {
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
    articleLinkDataLoader,
    pageLoader,
    nextArticleLoader,
    cmlinkLoader,
    listsLoader,
    purchasePageLoader,
    couponProductLoader,
    payWithExistingCardLoader,
    resetPasswordLoader,
    isEmailValid,
    isPhoneValid,
    isPhoneConnectedWithEmail,
  };
}

export function createPosters(req) {
  const hostname = req.hostname;
  const papiBaseService = switchToDomain(hostname, config.get('service.base'));
  // const cookies = new Cookies(req.headers.cookie);

  const cmlinkCommentPoster = newComment =>
    fetch(`${papiBaseService}/cmlink/${newComment.commentElementId}`, {
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
    })
      .then(response => response.json())
      .then(data => data);

  const cmlinkCommentAbuseReport = newAbuseReport =>
    fetch(`${papiBaseService}/cmlink/${newAbuseReport.commentElementId}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // origin: `${papiBaseService}`,
      },
      body: querystring.stringify({
        commentId: newAbuseReport.commentId,
        action: 'REPORT_COMMENT_ABUSE',
        invisible: true,
        'g-recaptcha-response': newAbuseReport.captchaKey,
        ajax: true,
      }),
    })
      .then(response => response.status)
      .then(data => data);

  const loggerVotePoster = newVote =>
    fetch(
      // Todo: Change Mador (2.285) from hardcoded to dynamic
      `${papiBaseService}/logger/p.gif?type=COMMENTS_RATINGS&a=%2F2.285%2F${
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
    fetch(`${papiBaseService}/comments/acceptreject`, {
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
      `${papiBaseService}/newsLetterRegister?EMAIL_FIELD=${
        newsletterSignUp.userEmail
      }${
        newsletterSignUp.checkBox ? '&ALLOW_MARKETING_MESSAGES_FIELD=true' : ''
      }&segmentId=${
        newsletterSignUp.segmentId
      }&_=${new Date().getTime()}&responseType=json`,
      {
        method: 'get',
        credentials: 'include',
        headers: {
          Accept: '*/*',
        },
      }
    ).then(response => response.json());
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
