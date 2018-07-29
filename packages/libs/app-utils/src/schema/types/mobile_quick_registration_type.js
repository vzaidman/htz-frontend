import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const MobileQuickRegistrationType = new GraphQLObjectType({
  name: 'MobileQuickRegistration',
  fields: () => ({
    teaserBody: { type: GraphQLString, },
    doubleOptIn: { type: GraphQLString, },
    mailto: { type: GraphQLString, },
    mailSubject: { type: GraphQLString, },
    mailBody: { type: GraphQLString, },
    teaserButton: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
  }),
});

export default MobileQuickRegistrationType;
