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
import Footer from './types/footer_type';
import NavMenu from './types/navMenu_type';
import List from './types/list_type';
import ResetPassword from './types/reset_password_type';
import Page from './types/page_type';
import IsEmailValid from './types/is_email_valid_type';
import IsPhoneConnectedWithEmail from './types/is_phone_connected_with_email';
import IsPhoneValid from './types/is_phone_valid';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    articleLinkData: {
      args: { id: { type: new GraphQLNonNull(GraphQLString), }, },
      type: new GraphQLObjectType({
        name: 'ArticleLinkData',
        fields: () => ({
          title: {
            type: GraphQLString,
          },
          url: {
            type: GraphQLString,
          },
        }),
      }),
      resolve(parentValue, { id, }, context) {
        return context.articleLinkDataLoader.load(id);
      },
    },
    commentsElement: {
      type: CommentsElement,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, context) {
        return context.cmlinkLoader.load(path);
      },
    },
    footer: {
      type: Footer,
      args: { listId: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, args, context) {
        return context.listsLoader.load(args);
      },
    },
    navMenu: {
      type: NavMenu,
      args: { listId: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, args, context) {
        return context.listsLoader.load(args);
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
      resolve(parentValue, args, context) {
        return context.nextArticleLoader.load(args);
      },
    },
    list: {
      type: List,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLString), },
        history: { type: new GraphQLList(GraphQLID), },
      },
      resolve(parentValue, args, context) {
        return context.listsLoader.load(args);
      },
    },
    page: {
      type: Page,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, context) {
        return context.pageLoader.load(path);
      },
    },
    purchasePage: {
      type: GraphQLJSON,
      args: { path: { type: GraphQLString, }, },
      resolve(parentValue, { path, }, context) {
        return context.purchasePageLoader.load(path);
      },
    },
    couponProduct: {
      args: { couponCode: { type: new GraphQLNonNull(GraphQLString), }, },
      type: GraphQLJSON,
      resolve(parentValue, { couponCode, }, context) {
        return context.couponProductLoader.load(couponCode);
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
        failure: { type: new GraphQLNonNull(GraphQLBoolean), },
        connectionType: { type: new GraphQLNonNull(GraphQLInt), },
        lastFourDigits: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: GraphQLBoolean,
      resolve(parentValue, paymentData, context) {
        return context.payWithExistingCardLoader
          .load(paymentData)
          .then(({ success, }) => success);
      },
    },
    resetPassword: {
      args: { userName: { type: new GraphQLNonNull(GraphQLString), }, },
      type: ResetPassword,
      resolve(parentValue, { userName, }, context) {
        return context.resetPasswordLoader.load(userName).then(res => res);
      },
    },
    isEmailValid: {
      args: { email: { type: new GraphQLNonNull(GraphQLString), }, },
      type: IsEmailValid,
      resolve(parentValue, args, context) {
        // TODO remove mock
        return context.isEmailValid.load(args).then(res => {
          if (res.status === 404) {
            return ({
              isEmailValid: true,
              success: true,
            });
          }
          return res;
        });
      },
    },
    isPhoneValid: {
      args: {
        email: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: IsPhoneValid,
      resolve(parentValue, args, context) {
        // TODO remove mock
        return context.isPhoneValid.load(args.email).then(res => {
          if (res.status === 404) {
            return ({
              isPhoneValid: true,
              success: true,
            });
          }
          return res;
        });
      },
    },
    isPhoneConnectedWithEmail: {
      args: {
        email: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: IsPhoneConnectedWithEmail,
      resolve(parentValue, args, context) {
        // TODO remove mock
        return context.isPhoneConnectedWithEmail.load(args).then(res => {
          if (res.status === 404) {
            return ({
              isPhoneConnectedWithEmail: false,
              success: true,
            });
          }
          return res;
        });
      },
    },
  }),
});

export default RootQuery;
