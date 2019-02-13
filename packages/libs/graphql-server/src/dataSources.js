/* global fetch */
import config from 'config';
import { RESTDataSource, } from 'apollo-datasource-rest';
import { CookieUtils, UserTransformations, } from '@haaretz/htz-user-utils';
import {
  financeSearchMap,
  jsonGenerator,
  lineGraphMap,
  scatterGraphMap,
  areaGraphMap,
  assetMap,
  assetsMap,
} from '@haaretz/app-utils';
import querystring from 'querystring';

// ttl is in seconds
const ttl = 1;

// Article data sources
class PapiAPI extends RESTDataSource {
  get baseURL() {
    return this.context.serviceBase;
  }


  async getCmLink(path) {
    const fetchPath = `json/cmlink/${path}${path.includes('?') ? '&' : '?'}ts=
    ${new Date().getTime()}`;
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

  async getContent({ cid, }) {
    const fetchPath = `papi/cmlink${
      cid.startsWith('/') ? '' : '/'
    }${cid}?exploded=true`;
    return this.get(fetchPath, {}, { cacheOptions: { ttl, }, });
  }

  async getList({ listId, history, section, }) {
    const fetchPath = `papi/cmlink${
      listId.startsWith('/') ? '' : '/'
    }${listId}?exploded=true${history ? `&exclude=${history.join(',')}` : ''}${section ? `&section=${section}` : ''}`;
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
          Cookie: newComment.cookie,
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
    return this.context.preview ? null : this.context.serviceBase;
  }

  async getPage(path) {
    const fetchPath = this.context.preview || `papi${path}`;

    return this.get(
      fetchPath,
      {},
      {
        cacheOptions: { ttl, },
        ...(this.context.preview
          ? {
            headers: {
              Cookie: `userId=${
                this.context.previewUserId
              }; path=/; domain=172.21.1.160; Expires=Tue, 19 Jan 2038 03:14:07 GMT;`,
            },
          }
          : {}),
      }
    );
  }
}

// purchase page data sources

class SsoAPI extends RESTDataSource {
  get baseURL() {
    return this.context.ssoService;
  }

  async getUserExpiredDate(userData) {
    return this.get('sso/r/getSubscriptionDetails', userData);
  }

  // TODO: check that this function works well
  async overrideMobilePhone({ mobile, ssoId, userName, }) {
    const { prefix, suffix, } = UserTransformations.mobileNumberParser(mobile);
    return fetch(`${this.baseURL()}r/OverrideMobilePhone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        ssoId,
        mobilePrefix: prefix,
        mobileNumber: suffix,
        username: userName,
      }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, msg: 'server error', hash: '', })
    );
  }

  async payWithExistingCard(paymentData) {
    const fetchPath = `${this.baseURL}/sso/r/registerWebUser?${querystring.stringify({
      ...paymentData,
      connectionType: '764',
      failure: false,
    })}`;

    console.log('fetch path from pay with existing card dataSource: ', fetchPath);
    return fetch(fetchPath).then(response => response.json());
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

  async getPage(path, userIdArg, hasFacebookToken) {
    console.log('getting page from data source!!');
    const baseUri = `${this.context.serviceBase}/papi`;
    const polopolyPromotionsPage = this.context.polopolyPromotionsPage;

    const userId = userIdArg
      || (this.context.cookies
        ? CookieUtils.stringToMap(this.context.cookies.get('tmsso') || '', {
          separator: /:\s?/,
        }).userId
        : null);
    const [ pathWithoutQuery, queryPartFromPath, ] = path.split(/\?(.+)/);
    const query = queryPartFromPath ? querystring.parse(queryPartFromPath) : {};
    // eslint-disable-next-line no-param-reassign
    path = query.offer ? `${pathWithoutQuery}/${query.offer}` : `${pathWithoutQuery}`; // Augment request for papi
    // '/promotions-page/more-ads/some-sub-promotion' -> '/more-ads/some-sub-promotion'
    const normalizedPath = `${baseUri}${
      polopolyPromotionsPage.startsWith('/') ? '' : '/'
    }${polopolyPromotionsPage}${(path || '/').replace(`${polopolyPromotionsPage}`, '')}${
      path.includes('?') ? '&' : '?'
    }userId=${userId}${hasFacebookToken ? '&account_linking_token=true' : ''}`;

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
  async getAssetsList(args) {
    const { assetsId, parentId, count, sortBy, sortOrder, assetId, offset, } = args;
    const json = jsonGenerator({
      map: assetsMap,
      args: Object.keys(args).length
        ? {
          assetId,
          assetsId,
          count: count || (assetsId ? assetsId.length : null),
          parentId,
          offset,
        }
        : null,
    });

    if (json && sortBy) {
      json.assets.sort((itemA, itemB) => {
        const valueA = typeof itemA[sortBy] === 'string' ? itemA[sortBy].toUpperCase() : itemA[sortBy]; // ignore upper and lowercase
        const valueB = typeof itemB[sortBy] === 'string' ? itemB[sortBy].toUpperCase() : itemB[sortBy]; // ignore upper and lowercase
        if (valueA < valueB) {
          return sortOrder === 'ascend' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === 'ascend' ? 1 : -1;
        }

        // values must be equal
        return 0;
      });
    }
    return json.assets;
  }

  // eslint-disable-next-line class-methods-use-this
  async getGraph(type, time, assetId) {
    const graphMap = type === 'line' ? lineGraphMap : type === 'scatter' ? scatterGraphMap : areaGraphMap;
    return jsonGenerator({ map: graphMap, args: { time, }, });
  }

  // eslint-disable-next-line class-methods-use-this
  async getAsset(id) {
    return jsonGenerator({ map: assetMap, args: { id, }, });
  }

  // eslint-disable-next-line class-methods-use-this
  async getSearchList(query, sortingOrder = null) {
    const json = jsonGenerator({ map: financeSearchMap, args: { query, }, });
    if (json && sortingOrder) {
      json.assets.sort((itemA, itemB) => {
        const valueA = itemA.type;
        const valueB = itemB.type;
        if (sortingOrder.indexOf(valueA) < sortingOrder.indexOf(valueB)) {
          return -1;
        }
        if (sortingOrder.indexOf(valueA) > sortingOrder.indexOf(valueB)) {
          return 1;
        }

        // values must be equal
        return 0;
      });
    }
    return json.assets;
  }
}

class OtpAPI extends RESTDataSource {
  get baseURL() {
    return this.context.otpService;
  }

  async generateOtp(phoneNum) {
    return fetch(`${this.context.otpService}${config.get('service.otp.generate')}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ typeId: phoneNum, }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, msg: 'server error', hash: '', })
    );
  }

  async retrieveOtpHash(email, ssoId) {
    return fetch(`${this.context.otpService}/retrieve`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, ssoId, }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, msg: "couldn't find hash", })
    );
  }
}

class NewSsoOperationsAPI extends RESTDataSource {
  get baseURL() {
    return this.context.newSsoService;
  }

  async validateEmailPhoneConnect(email, confirmation, mobilePrefix, mobileNum) {
    return fetch(`${this.context.newSsoService}/validateEmailPhoneConnect`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, confirmation, mobilePrefix, mobileNum, }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, msg: 'server error', })
    );
  }

  async validateEmail(email, confirmation) {
    return fetch(`${this.context.newSsoService}/validateEmail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, confirmation, }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, msg: 'server error', })
    );
  }
}

class HtzFunctionOperationsAPI extends RESTDataSource {
  get baseURL() {
    return this.context.functionService;
  }

  // TODO: https://www.apollographql.com/docs/apollo-server/features/data-sources.html
  async sendPhoneMailConnection(email, phone, userName, paramString, url) {
    return fetch(`${this.context.functionService}/sendEmailForConfirmation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmationParams: { email, phone, },
        confirmationType: 'PHONE_VALIDATION',
        templateParams: {
          userName,
          url,
          userMobile: phone,
          // eslint-disable-next-line no-undef
          paramsString: `params=${paramString}&type=phoneEmailConnect`,
        },
      }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, message: 'server error', })
    );
  }

  async sendEmailConfirmation(email, paramString, url) {
    return fetch(`${this.context.functionService}/sendEmailForConfirmation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmationParams: { email, },
        confirmationType: 'MAIL_VALIDATION',
        templateParams: {
          url,
          // eslint-disable-next-line no-undef
          paramsString: `params=${paramString}&type=mailValidation`,
        },
      }),
    }).then(
      success => success.json(),
      () => Promise.resolve({ success: false, message: 'server error', })
    );
  }
}

class TableScoreAPI extends RESTDataSource {
  get baseURL() {
    return this.context.msSportResults;
  }

  async retrieveTableScore(tableType, subType, identifier) {
    const path = `${tableType}/${subType}/${identifier}`;
    const res = await this.get(path);
    console.log(`[tableScore] url (${path}) response:`, res);
    return res;
  }
}

const dataSources = () => ({
  PageAPI: new PageAPI(),
  PapiAPI: new PapiAPI(),
  SsoAPI: new SsoAPI(),
  PurchasePageAPI: new PurchasePageAPI(),
  FinanceAPI: new FinanceAPI(),
  OtpAPI: new OtpAPI(),
  NewSsoOperationsAPI: new NewSsoOperationsAPI(),
  HtzFunctionOperationsAPI: new HtzFunctionOperationsAPI(),
  TableScoreAPI: new TableScoreAPI(),
});
export default dataSources;
