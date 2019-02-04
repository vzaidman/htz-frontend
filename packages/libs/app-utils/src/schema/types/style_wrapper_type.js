import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLUnionType,
  GraphQLObjectType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import getSchema, { allTypes, } from '../getSchema';
import content from './content_type';
import list from './list_type';

const StyleWrapper = new GraphQLObjectType({
  name: 'StyleWrapper',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    miscStyles: { type: GraphQLJSON, },
    contentLists: {
      type: new GraphQLList(
        new GraphQLUnionType({
          name: 'StyleWrapperItem',
          types: [ ...allTypes, content, list, ],
          resolveType: value => getSchema(value.kind || value.inputTemplate) || content,
        }),
      ),
      resolve: ({ contentLists, contentId, }) => {
        console.log(contentId, contentLists);
        contentLists.forEach((item, index) => {
          if (!item) {
            contentLists[index] = {
              message: `Got Null in StyleWrapper of element ${contentId}, position: ${index}`,
              kind: 'error',
              errorCode: 6,
            };
          }
        });
        return contentLists;
      },
    },
  }),
});

export default StyleWrapper;
