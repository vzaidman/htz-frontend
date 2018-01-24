// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLInt, } from 'graphql';

const NewSignUpNotificationResponseType = new GraphQLObjectType({
  name: 'NewSignUpNotificationResponse',
  fields: () => ({
    status: { type: GraphQLInt, },
  }),
});

export default NewSignUpNotificationResponseType;
