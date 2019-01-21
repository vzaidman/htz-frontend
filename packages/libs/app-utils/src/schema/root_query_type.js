// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import CommentsElement from './types/comments_element_type';
import FinanceGraph from './types/finance/finance_graph_type';
import FinanceAsset from './types/finance/finance_asset_type';
import Footer from './types/footer_type';
import NavMenu from './types/navMenu_type';
import List from './types/list_type';
import BreakingNewsBox from './types/breaking_news_box_type';
import ResetPassword from './types/reset_password_type';
import Page from './types/page_type';
import HomePage from './types/home_page_type';
import { GenerateOtp, } from './types/otp_operations_type';
import Paywall from './types/paywall';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // article queries
    rankArticle: {
      args: {
        articleId: { type: new GraphQLNonNull(GraphQLString), },
        starRanking: { type: new GraphQLNonNull(GraphQLInt), },
      },
      type: GraphQLBoolean,
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.rateArticle(args);
      },
    },

    commentsElement: {
      type: CommentsElement,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, { dataSources, }) {
        return dataSources.PapiAPI.getCmLink(path);
      },
    },
    footer: {
      type: Footer,
      args: { listId: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getList(args);
      },
    },
    list: {
      type: List,
      args: {
        section: { type: GraphQLString, },
        listId: { type: new GraphQLNonNull(GraphQLString), },
        history: { type: new GraphQLList(GraphQLID), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getList(args);
      },
    },
    breakingNewsBox: {
      type: BreakingNewsBox,
      args: {
        cid: { type: new GraphQLNonNull(GraphQLString), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getContent(args);
      },
    },
    navMenu: {
      type: NavMenu,
      args: { listId: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, args, { dataSources, }) {
        console.log(args, dataSources.PapiAPI.getList(args));
        return dataSources.PapiAPI.getList(args);
      },
    },
    nextArticle: {
      type: new GraphQLObjectType({
        name: 'NextArticle',
        fields: () => ({
          result: { type: GraphQLString, },
        }),
      }),
      args: {
        sectionId: { type: new GraphQLNonNull(GraphQLID), },
        readingHistory: { type: new GraphQLList(GraphQLID), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getNextArticle(args);
      },
    },

    paywall: {
      type: Paywall,
      args: {
        articleCount: { type: new GraphQLNonNull(GraphQLInt), },
        platform: { type: new GraphQLNonNull(GraphQLString), },
        isSuperContent: { type: new GraphQLNonNull(GraphQLBoolean), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getPaywallData(args);
      },
    },

    page: {
      type: Page,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, { dataSources, }) {
        return dataSources.PageAPI.getPage(path);
      },
    },
    homePage: {
      type: HomePage,
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PageAPI.getPage('/');
      },
    },

    userExpired: {
      type: GraphQLJSON,
      args: {
        ssoid: { type: new GraphQLNonNull(GraphQLString), },
        product: { type: new GraphQLNonNull(GraphQLString), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.SsoAPI.getUserExpiredDate(args);
      },
    },
    // reset password currently only used by purchase page, will be used by more apps later
    resetPassword: {
      args: { userName: { type: new GraphQLNonNull(GraphQLString), }, },
      type: ResetPassword,
      resolve(parentValue, { userName, }, { dataSources, }) {
        return dataSources.SsoAPI.resetPassword(userName);
      },
    },

    // Purchase page queries
    articleLinkData: {
      args: { id: { type: new GraphQLNonNull(GraphQLString), }, },
      type: new GraphQLObjectType({
        name: 'ArticleLinkData',
        fields: {
          title: {
            type: GraphQLString,
          },
          url: {
            type: GraphQLString,
          },
        },
      }),
      resolve(parentValue, { id, }, { dataSources, }) {
        return dataSources.PurchasePageAPI.getArticleLinkData(id);
      },
    },
    couponProduct: {
      args: { couponCode: { type: new GraphQLNonNull(GraphQLString), }, },
      type: GraphQLJSON,
      resolve(parentValue, { couponCode, }, { dataSources, }) {
        return dataSources.PurchasePageAPI.getCoupon(couponCode);
      },
    },
    payWithExistingCard: {
      args: {
        ssoID: { type: new GraphQLNonNull(GraphQLID), },
        productID: { type: new GraphQLNonNull(GraphQLInt), },
        firstName: { type: new GraphQLNonNull(GraphQLString), },
        lastName: { type: new GraphQLNonNull(GraphQLString), },
        saleCode: { type: new GraphQLNonNull(GraphQLInt), },
        promotionNumber: { type: new GraphQLNonNull(GraphQLInt), },
        email: { type: new GraphQLNonNull(GraphQLString), },
        sumPayment: { type: new GraphQLNonNull(GraphQLString), },
        thankYouEmailTemplate: { type: new GraphQLNonNull(GraphQLString), },
        description: { type: new GraphQLNonNull(GraphQLString), },
        lastFourDigits: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: new GraphQLObjectType({
        name: 'PayWithExistingCardResponse',
        fields: () => ({
          pId: {
            type: GraphQLString,
          },
          success: {
            type: GraphQLBoolean,
          },
        }),
      }),
      resolve(parentValue, paymentData, { dataSources, }) {
        return dataSources.SsoAPI.payWithExistingCard(paymentData);
      },
    },
    purchasePage: {
      type: GraphQLJSON,
      args: { path: { type: GraphQLString, }, userId: { type: GraphQLID, }, },
      resolve(parentValue, { path, userId, }, { dataSources, }) {
        return dataSources.PurchasePageAPI.getPage(path, userId);
      },
    },

    asset: {
      type: FinanceAsset,
      args: {
        assetId: { type: new GraphQLNonNull(GraphQLString), },
      },
      resolve(parentValue, { assetId, }, { dataSources, }) {
        return dataSources.FinanceAPI.getAsset(assetId);
      },
    },

    financeSearch: {
      type: new GraphQLList(FinanceAsset),
      args: {
        query: { type: new GraphQLNonNull(GraphQLString), },
        sortingOrder: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)), },
      },
      resolve(parentValue, { query, sortingOrder, }, { dataSources, }) {
        return dataSources.FinanceAPI.getSearchList(query, sortingOrder);
      },
    },

    assetsList: {
      type: new GraphQLList(FinanceAsset),
      args: {
        assetsId: { type: new GraphQLList(GraphQLString), },
        parentId: { type: GraphQLString, },
        assetSubSection: { type: GraphQLString, },
        assetId: { type: GraphQLString, },
        expirationBenchmarkDate: { type: GraphQLString, },
        mtfCategory: { type: GraphQLString, },
        mtfCategoryExposure: { type: GraphQLString, },
        etfCategory: { type: GraphQLString, },
        etfCategoryPosition: { type: GraphQLString, },
        count: { type: GraphQLInt, },
        sortBy: { type: GraphQLString, },
        sortOrder: { type: GraphQLString, },
        offset: { type: GraphQLInt, },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.FinanceAPI.getAssetsList(args);
      },
    },

    financeGraph: {
      type: FinanceGraph,
      args: {
        type: { type: GraphQLString, },
        time: { type: GraphQLString, },
        assetId: { type: GraphQLString, },
      },
      resolve(parentValue, { type, time, assetId, }, { dataSources, }) {
        return dataSources.FinanceAPI.getGraph(type, time, assetId);
      },
    },

    retrieveOtpHash: {
      type: GenerateOtp,
      args: {
        email: { type: GraphQLString, },
        ssoId: { type: GraphQLString, },
      },
      resolve(parentValue, { email, ssoId, }, { dataSources, }) {
        return dataSources.OtpAPI.retrieveOtpHash(email, ssoId);
      },
    },
  }),
});

export default RootQuery;
