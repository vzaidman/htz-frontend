// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import ImageType from './image_type';

const ClickTrackerBanner = new GraphQLObjectType({
  name: 'ClickTrackerBanner',
  fields: () => ({
    inputTemplate: { type: GraphQLString, },
    contentName: { type: GraphQLString, },
    contentId: { type: GraphQLID, },
    priority: { type: GraphQLInt, },
    text: { type: GraphQLString, },
    link: { type: GraphQLString, },
    linkTarget: { type: GraphQLString, },
    departments: { type: new GraphQLList(GraphQLString), },
    replaceDomainForAdBlocker: { type: GraphQLBoolean, },
    clicktrackerimage: { type: ImageType, },
    advertiserCamp: { type: GraphQLString, },
    percentage: { type: GraphQLInt, },
    minRange: { type: GraphQLInt, },
    maxRange: { type: GraphQLInt, },
    chance: { type: GraphQLFloat, },
  }),
});

export default ClickTrackerBanner;
