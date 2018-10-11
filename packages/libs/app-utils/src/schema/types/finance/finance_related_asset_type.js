import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { AssetType, } from './finance_asset_type';

const relatedAsset = new GraphQLObjectType({
  name: 'RelatedAsset',
  fields: () => ({
    type: { type: AssetType, },
    name: { type: GraphQLString, },
    id: { type: GraphQLString, },
  }),
});

export default relatedAsset;
