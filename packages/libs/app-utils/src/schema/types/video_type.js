import { GraphQLObjectType, GraphQLString, GraphQLID, } from 'graphql';

const VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: () => ({
    videoType: { type: GraphQLString, },
    title: { type: GraphQLString, },
    credit: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    videoContent: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    kind: { type: GraphQLString, },
  }),
});

export default VideoType;
