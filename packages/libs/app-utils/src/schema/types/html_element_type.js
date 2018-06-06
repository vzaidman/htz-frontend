// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
} from 'graphql';

const HtmlElement = new GraphQLObjectType({
  name: 'HtmlElement',
  fields: () => ({
    code: { type: GraphQLString, },
    hideOnSite: { type: GraphQLBoolean, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
  }),
});

export default HtmlElement;
