import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import { GraphQLTimestamp, } from './finance_table_type';
import shareHolder from './finance_share_holder_type';
import relatedAsset from './finance_related_asset_type';

const quotePage = new GraphQLObjectType({
  name: 'QuotePage',
  fields: () => ({
    id: { type: GraphQLString, },
    name: { type: GraphQLString, },
    value: { type: GraphQLFloat, },
    changePercentage: { type: GraphQLFloat, },
    numeralChange: { type: GraphQLFloat, },
    assetType: { type: GraphQLString, },
    assetNumber: { type: GraphQLInt, },
    lastTradeTime: { type: GraphQLTimestamp, },
    relatedAssets: { type: new GraphQLList(relatedAsset), },
    volume: { type: GraphQLFloat, },
    dailyAvgVolume: { type: GraphQLFloat, },
    dailyYield: { type: GraphQLFloat, },
    weeklyYield: { type: GraphQLFloat, },
    monthlyYield: { type: GraphQLFloat, },
    quarterlyYield: { type: GraphQLFloat, },
    yearlyYield: { type: GraphQLFloat, },
    threeYearsYield: { type: GraphQLFloat, },
    fiveYearsYield: { type: GraphQLFloat, },
    maxYield: { type: GraphQLFloat, },
    shareHolders: { type: new GraphQLList(shareHolder), },
  }),
});

export default quotePage;
