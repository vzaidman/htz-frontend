// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, } from 'graphql';

const NewAbuseReportResponseType = new GraphQLObjectType({
  name: 'NewAbuseReportResponse',
  fields: () => ({
    status: { type: GraphQLInt, },
  }),
});

export default NewAbuseReportResponseType;
