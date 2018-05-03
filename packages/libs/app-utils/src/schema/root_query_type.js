// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import CommentsElement from './types/comments_element_type';
import Footer from './types/footer_type';
import List from './types/list_type';
import ResetPassword from './types/reset_password_type';
import Page from './types/page_type';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    commentsElement: {
      type: CommentsElement,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, context) {
        return context.cmlinkLoader.load(path);
      },
    },
    footer: {
      type: Footer,
    },
    list: {
      type: List,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, context) {
        return context.listsLoader.load(path);
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
        sumPayment: { type: new GraphQLNonNull(GraphQLInt), },
        thankYouEmailTemplate: { type: new GraphQLNonNull(GraphQLInt), },
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
  }),
});

export default RootQuery;
