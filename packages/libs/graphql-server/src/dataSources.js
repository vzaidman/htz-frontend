/* global fetch */
import { RESTDataSource, } from 'apollo-datasource-rest';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import {
  financeTableMap,
  jsonGenerator,
  lineGraphMap,
  scatterGraphMap,
} from '@haaretz/app-utils';
import querystring from 'querystring';

const ttl = 1000;

// Article data sources
class PapiAPI extends RESTDataSource {
  get baseURL() {
    return this.context.serviceBase;
  }
  async getCmLink(path) {
    const fetchPath = `json/cmlink/${path}`;
    return this.get(fetchPath, {}, { cacheOptions: { ttl, }, });
  }

  async rateArticle({ articleId, starRanking, }) {
    fetch(
      `${this.baseUrl}/cmlink/ArticleSocialMetaData.${articleId}?rankArticle=${starRanking}`
    ).then(response => {
      console.log('response from article social meta loader', response.statusText);
      return response.statusText === 'OK';
    });
  }

  async getList({ listId, history, }) {
    const fetchPath = `papi/cmlink${
      listId.startsWith('/') ? '' : '/'
    }${listId}?vm=whtzResponsive&exploded=true&exclude=${history ? history.join(',') : ''}`;
    return this.get(fetchPath, {}, { cacheOptions: { ttl, }, });
  }

  async getNextArticle({ sectionId, readingHistory = [], }) {
    const fetchPath = `findNextArticleBySection?sectionId=${sectionId}&excludedArticles=${readingHistory.join(
      ','
    )}`;
    console.log('fetchPath form getNextArticle papi api ', fetchPath);
    return this.get(fetchPath, {}, { cacheOptions: { ttl, }, });
  }

  // mutations

  async createComment(newComment) {
    console.log('creating new comment from data source: ', newComment);
    const fetchPath = `/cmlink/${newComment.commentElementId}`;
    return this.post(
      fetchPath,
      // body
      querystring.stringify({
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
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    );
  }

  async newsLetterSignUp(newsletterSignUp) {
    console.log('creating new newsletterSignUp from data source: ', newsletterSignUp);
    const fetchPath = `newsLetterRegister?EMAIL_FIELD=${newsletterSignUp.userEmail}${
      newsletterSignUp.checkBox ? '&ALLOW_MARKETING_MESSAGES_FIELD=true' : ''
    }&segmentId=${newsletterSignUp.segmentId}&_=${new Date().getTime()}&responseType=json`;
    return this.get(
      fetchPath,
      {},
      {
        credentials: 'include',
        headers: {
          Accept: '*/*',
        },
      }
    );
  }

  // like / dislike comment
  async rateComment(newVote) {
    console.log('creating new Vote from data source: ', newVote);
    const fetchPath = `logger/p.gif?type=COMMENTS_RATINGS&a=%2F2.285%2F${
      newVote.articleId
    }&comment=${newVote.commentId}&group=${newVote.group}&_=${new Date().getTime()}`;
    return this.get(
      fetchPath,
      {},
      {
        credentials: 'include',
        headers: {
          Accept: '*/*',
        },
      }
    );
  }

  async reportCommentAbuse(newAbuseReport) {
    console.log('creating new AbuseReport from data source: ', newAbuseReport);
    const fetchPath = `/cmlink/${newAbuseReport.commentElementId}`;
    return this.post(
      fetchPath,
      // body
      querystring.stringify({
        commentId: newAbuseReport.commentId,
        action: 'REPORT_COMMENT_ABUSE',
        invisible: true,
        'g-recaptcha-response': newAbuseReport.captchaKey,
        ajax: true,
      }),
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    );
  }

  async signUpCommentNotifications(signUpData) {
    console.log('creating new signUpData from data source: ', signUpData);
    const fetchPath = 'comments/acceptreject';
    return this.post(
      fetchPath,
      // body
      querystring.stringify({
        userEmail: signUpData.userEmail,
        c: signUpData.commentId,
        h: signUpData.hash,
        a: '2',
        // todo: cheack what needs to be here allowMarketing true /false ?
        m: '',
        // todo: check what needs to be here paying/anonymous check from cookie?
        ut: 'anonymous',
      }),
      {
        credentials: 'include',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    );
  }
}

class PageAPI extends RESTDataSource {
  get baseURL() {
    return this.context.preview || this.context.serviceBase;
  }
  async getPage(path) {
    const fetchPath = this.context.preview ? '' : `papi${path}`;

    // return this.get(fetchPath);
    return this.get(fetchPath, {}, { cacheOptions: { ttl, }, });
  }
}

// purchase page data sources

class SsoAPI extends RESTDataSource {
  get baseURL() {
    return this.context.ssoService;
  }

  async payWithExistingCard(paymentData) {
    console.log(`payWithExistingCard paymentData: ${paymentData}`);
    return this.get(`sso/r/registerWebUser?${querystring.stringify(paymentData)}`);
  }

  async resetPassword(userName) {
    console.log(`resetPassword username: ${userName}`);
    return this.post(
      'sso/r/resetPassword',
      querystring.stringify({
        newsso: true,
        layer: 'sendpassword',
        site: 80,
        userName,
      }),
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    );
  }
}

class PurchasePageAPI extends RESTDataSource {
  get baseURL() {
    return this.context.serviceBase;
  }

  async getArticleLinkData(id) {
    console.log(`article link data id: ${id}`);
    return this.get(`cmlink/Haaretz.Element.ArticleDataElement/${id}`);
  }

  async getCoupon(couponCode) {
    console.log(`get coupon: ${couponCode}`);
    const polopolyPromotionsPage = this.context.polopolyPromotionsPage;
    return this.get(
      `papi${
        polopolyPromotionsPage.startsWith('/') ? '' : '/'
      }${polopolyPromotionsPage}?couponCode=${couponCode}`
    );
  }

  async getPage(path) {
    console.log('getting page from data source!!');
    const baseUri = `${this.context.serviceBase}/papi`;
    const polopolyPromotionsPage = this.context.polopolyPromotionsPage;

    const userId = this.context.cookies
      ? CookieUtils.stringToMap(this.context.cookies.get('tmsso') || '', {
        separator: /:\s?/,
      }).userId
      : null;
    const [ pathWithoutQuery, queryPartFromPath, ] = path.split(/\?(.+)/);
    const query = queryPartFromPath ? querystring.parse(queryPartFromPath) : {};
    // eslint-disable-next-line no-param-reassign
    path = query.offer ? `${pathWithoutQuery}/${query.offer}` : `${pathWithoutQuery}`; // Augment request for papi
    // '/promotions-page/more-ads/some-sub-promotion' -> '/more-ads/some-sub-promotion'
    const normalizedPath = `${baseUri}${
      polopolyPromotionsPage.startsWith('/') ? '' : '/'
    }${polopolyPromotionsPage}${(path || '/').replace(`${polopolyPromotionsPage}`, '')}${
      path.includes('?') ? '&' : '?'
    }userId=${userId}`;

    return fetch(normalizedPath)
      .then(response => {
        if (response.ok) {
          return response;
        }
        return fetch(
          `${baseUri}${polopolyPromotionsPage.startsWith('/') ? '' : '/'}${polopolyPromotionsPage}`
        );
      })
      .then(response => response.json());
  }
}

class FinanceAPI extends RESTDataSource {
  get baseURL() {
    return this.context.preview || this.context.serviceBase;
  }

  // eslint-disable-next-line class-methods-use-this
  async getTable({ assetsId, parentId, count, marketId, }) {
    return jsonGenerator({
      map: financeTableMap,
      args: {
        parentId,
        assetsId,
        count: count || assetsId.length,
        marketId,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async getGraph(type, time, assetId) {
    const graphMap = type === 'line' ? lineGraphMap : scatterGraphMap;
    return jsonGenerator({ map: graphMap, args: { time, }, });
  }
}

const dataSources = () => ({
  PageAPI: new PageAPI(),
  PapiAPI: new PapiAPI(),
  SsoAPI: new SsoAPI(),
  PurchasePageAPI: new PurchasePageAPI(),
  FinanceAPI: new FinanceAPI(),
});
export default dataSources;
