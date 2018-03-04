// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLInterfaceType, GraphQLID, GraphQLString, } from 'graphql';

// define interface type ,extend by other types like : Page, Content
const ContentInterface = new GraphQLInterfaceType({
  name: 'ContentInterface',
  fields: () => ({
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
  }),
  // resolveType: (data) => {
  //   if (data.lin) return tagType;
  //   if (data.email) return userType;
  // And so on.
  // But how to return a proper Type if my Tag Type is similar to
  // Category Type? That's the reason why I prefer the second way and
  // use isTypeOf
  //   return null;
  // }
});

export default ContentInterface;
