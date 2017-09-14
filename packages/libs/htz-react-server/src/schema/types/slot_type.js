// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, GraphQLList, } from 'graphql';

import ContentType from './content_type';

const SlotType = new GraphQLObjectType({
  name: 'Slot',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    content: {
      type: new GraphQLList(ContentType),
    },
  }),
});
export default SlotType;
