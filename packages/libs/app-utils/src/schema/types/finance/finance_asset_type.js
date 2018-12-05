import {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLFloat,
  GraphQLError,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { Kind, } from 'graphql/language/kinds';

import shareHolder from './finance_share_holder_type';
import eventPrediction from './finance_event_prediction_type';

// eslint-disable-next-line no-restricted-globals
const isDate = value => typeof value === 'number' && !isNaN(value.valueOf());

const coerceDate = value => {
  const date = new Date(value).getTime();
  if (!isDate(date)) {
    const message = `Date can't represent non-date value: ${value}`;
    throw new TypeError(message);
  }
  return date;
};

export const GraphQLTimestamp = new GraphQLScalarType({
  name: 'Timestamp',
  serialize: value => coerceDate(value),
  parseValue: coerceDate,
  parseLiteral(valueNode) {
    const { kind, value, } = valueNode;
    let date;
    switch (kind) {
      case Kind.INT:
      case Kind.FLOAT:
        date = new Date(+value);
        break;
      case Kind.STRING:
        date = new Date(value);
        break;
      default:
    }
    if (!isDate(date)) {
      throw new GraphQLError(`Expected date value but got: ${value}`, [
        valueNode,
      ]);
    }
    return date;
  },
});

export const AssetType = new GraphQLEnumType({
  name: 'AssetType',
  values: {
    bonds: { value: 'bonds', },
    stocks: { value: 'stocks', },
    indices: { value: 'indices', },
    options: { value: 'options', },
    mtf: { value: 'mtf', },
    etf: { value: 'etf', },
    exchange: { value: 'exchange', },
    crypto: { value: 'crypto', },
  },
});

const financeAsset = new GraphQLObjectType({
  name: 'Asset',
  fields: () => ({
    name: { type: GraphQLString, },
    id: { type: GraphQLString, },
    symbol: { type: GraphQLString, },
    type: { type: AssetType, },
    subType: { type: GraphQLString, },
    assetNumber: { type: GraphQLInt, },
    assetSummary: { type: GraphQLString, },
    assetComponents: { type: new GraphQLList(financeAsset), },
    etfComponents: { type: new GraphQLList(financeAsset), },
    mtfComponents: { type: new GraphQLList(financeAsset), },
    relatedAssets: { type: new GraphQLList(financeAsset), },
    shareHolders: { type: new GraphQLList(shareHolder), },
    eventsPrediction: { type: new GraphQLList(eventPrediction), },
    value: { type: GraphQLFloat, },
    USDValue: { type: GraphQLFloat, },
    numeralValue: { type: GraphQLFloat, },
    baseValue: { type: GraphQLFloat, },
    openingValue: { type: GraphQLFloat, },
    dailyHigh: { type: GraphQLFloat, },
    dailyLow: { type: GraphQLFloat, },
    changePercentage: { type: GraphQLFloat, },
    numeralChange: { type: GraphQLFloat, },
    lastTradeTime: { type: GraphQLTimestamp, },
    tradeTime: { type: GraphQLTimestamp, },
    assetStateDate: { type: GraphQLTimestamp, },
    tradingStatus: { type: GraphQLString, },
    volume: { type: GraphQLFloat, },
    arbGap: { type: GraphQLFloat, },
    openPositions: { type: GraphQLInt, },
    putCallRatio: { type: GraphQLFloat, },
    avgDuration: { type: GraphQLFloat, },
    purchasePrice: { type: GraphQLFloat, },
    redemptionPrice: { type: GraphQLFloat, },
    redemptionYield: { type: GraphQLFloat, },
    yieldToMaturity: { type: GraphQLFloat, },
    dailyYield: { type: GraphQLFloat, },
    weeklyYield: { type: GraphQLFloat, },
    monthlyYield: { type: GraphQLFloat, },
    quarterlyYield: { type: GraphQLFloat, },
    yearlyYield: { type: GraphQLFloat, },
    threeYearsYield: { type: GraphQLFloat, },
    fiveYearsYield: { type: GraphQLFloat, },
    maxYield: { type: GraphQLFloat, },
    dailyParentYield: { type: GraphQLFloat, },
    weeklyParentYield: { type: GraphQLFloat, },
    monthlyParentYield: { type: GraphQLFloat, },
    quarterlyParentYield: { type: GraphQLFloat, },
    yearlyParentYield: { type: GraphQLFloat, },
    threeYearsParentYield: { type: GraphQLFloat, },
    fiveYearsParentYield: { type: GraphQLFloat, },
    maxParentYield: { type: GraphQLFloat, },
    dailyAvgMtfYield: { type: GraphQLFloat, },
    monthlyAvgMtfYield: { type: GraphQLFloat, },
    quarterlyAvgMtfYield: { type: GraphQLFloat, },
    yearlyAvgMtfYield: { type: GraphQLFloat, },
    threeYearsAvgMtfYield: { type: GraphQLFloat, },
    fiveYearsAvgMtfYield: { type: GraphQLFloat, },
    maxAvgMtfYield: { type: GraphQLFloat, },
    bondYieldSpread: { type: GraphQLFloat, },
    averageMtfYieldInCategory: { type: GraphQLFloat, },
    monthlyinflows: { type: GraphQLFloat, },
    quarterlyinflows: { type: GraphQLFloat, },
    yearlyinflows: { type: GraphQLFloat, },
    monthlyoutflows: { type: GraphQLFloat, },
    quarterlyoutflows: { type: GraphQLFloat, },
    yearlyoutflows:  { type: GraphQLFloat, },
    assetsUnderManagement:  { type: GraphQLFloat, },
    managementFee: { type: GraphQLFloat, },
    standardDeviation: { type: GraphQLFloat, },
    peRatio: { type: GraphQLFloat, },
    pbRatio: { type: GraphQLFloat, },
    psRatio: { type: GraphQLFloat, },
    historicalProfit: { type: GraphQLFloat, },
    dailyAvgVolume: { type: GraphQLFloat, },
    issuerName: { type: GraphQLString, },
    marketCap: { type: GraphQLFloat, },
    roe: { type: GraphQLFloat, },
    netProfitMargin: { type: GraphQLFloat, },
    capitalBalanceRatio: { type: GraphQLFloat, },
    per: { type: GraphQLFloat, },
    yieldFactor: { type: GraphQLFloat, },
    daysToMaturity: { type: GraphQLInt, },
    classification: { type: GraphQLString, },
    issueDate: { type: GraphQLTimestamp, },
    redemptionDate: { type: GraphQLTimestamp, },
    periodicalInterest: { type: GraphQLFloat, },
    periodicalInterestDate: { type: GraphQLFloat, },
    yearlyInterest: { type: GraphQLFloat, },
    retailTax: { type: GraphQLFloat, },
    linkageType: { type: GraphQLString, },
    parentId: { type: GraphQLString, },
    parentName: { type: GraphQLString, },
    paymentDate: { type: GraphQLTimestamp, },
    exDate: { type: GraphQLTimestamp, },
    redemptionRate: { type: GraphQLFloat, },
    floatRate: { type: GraphQLFloat, }, // שער רציף
    fixedRate: { type: GraphQLFloat, }, // שער יציג
    sharpIndex: { type: GraphQLFloat, }, // (0-10)
    inflowsPercentageChange: { type: GraphQLFloat, },
    outflowsPercentageChange: { type: GraphQLFloat, },
    // relates to MTFs and ETFs
    manager: { type: GraphQLString, },
    trustee: { type: GraphQLString, },
    exposureProfile: { type: GraphQLString, },
    indexExposure: { type: new GraphQLList(financeAsset), },
    assetBaseHoldingRatio: { type: GraphQLFloat, },
    foundingDate: { type: GraphQLTimestamp, },
    tradingHours: { type: GraphQLString, },
    dividendClassification: { type: GraphQLString, },
    trusteeFee: { type: GraphQLFloat, },
    loadChargeRate: { type: GraphQLFloat, },
    distributionCommission: { type: GraphQLFloat, },
    mainCurrency: { type: GraphQLString, },
    mtfHoldingRatio: { type: GraphQLFloat, },
    mtfLinkForeignExchange: { type: GraphQLFloat, },
    mtfLinkIndex: { type: GraphQLFloat, },
    mtfLinkShekel: { type: GraphQLFloat, },
    mtfLinkOptions: { type: GraphQLFloat, },
    mtfLinkStocks: { type: GraphQLFloat, },
    mtfLinkFunds: { type: GraphQLFloat, },
    mtfEtfPolicy: { type: GraphQLString, },
    policyChangeDate: { type: GraphQLTimestamp, },
    primeClassification: { type: GraphQLString, },
    mainClassification: { type: GraphQLString, },
    secondaryClassification: { type: GraphQLString, },
    taxClassification: { type: GraphQLString, },
    stocksExposure: { type: GraphQLFloat, },
    currencyExposure: { type: GraphQLFloat, },
    currencyPeg: { type: GraphQLString, },
    etfType: { type: GraphQLString, },
    etfIssuer: { type: GraphQLString, },
    conversionType: { type: GraphQLString, },
    baseAsset: { type: GraphQLString, },
    conversionFee: { type: GraphQLFloat, },
    dividendPolicy: { type: GraphQLString, }, // a longer sentence
    accumulatedDividend: { type: GraphQLFloat, },
    accumulatedInterest: { type: GraphQLFloat, },
    managementFeeFactor: { type: GraphQLFloat, },
    unitsVolume: { type: GraphQLFloat, },
    openPositionsChangeRate: { type: GraphQLFloat, },
    contractSize: { type: GraphQLInt, },
    expirationPrice: { type: GraphQLFloat, },
    daysToExpiration: { type: GraphQLInt, },
    expirationDate: { type: GraphQLTimestamp, },
    /* options */
    expirationBenchmarkDates: { type: new GraphQLList(GraphQLString), },
    theoreticalValue: { type: GraphQLFloat, },
    theoreticalValueGap: { type: GraphQLFloat, },
  }),
});

export default financeAsset;
