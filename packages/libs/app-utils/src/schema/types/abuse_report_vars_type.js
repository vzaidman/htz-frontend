// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLInputObjectType, GraphQLID, GraphQLString, } from 'graphql';

const abuseReportVars = new GraphQLInputObjectType({
  name: 'abuseReportVars',
  fields: () => ({
    commentElementId: { type: GraphQLID, },
    commentId: { type: GraphQLID, },
    captchaKey: { type: GraphQLString, },
  }),
});

export default abuseReportVars;
