// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLNonNull, GraphQLString, } from 'graphql';
import CommentsElement from './types/comments_element_type';
import Footer from './types/footer_type';
import OsakaList from './types/osaka_list_type';
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
    osakaList: {
      type: OsakaList,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, context) {
        return context.cmlinkLoader.load(path);
      },
    },
    page: {
      type: Page,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, context) {
        return context.pageLoader.load(path);
      },
    },
  }),
});

export default RootQuery;
