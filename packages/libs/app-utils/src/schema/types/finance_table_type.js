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

const isDate = value =>
  // eslint-disable-next-line no-restricted-globals
  typeof (value) === 'number' && !isNaN(value.valueOf());

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

const AssetType = new GraphQLEnumType({
  name: 'AssetType',
  values: {
    index: { value: 'index', },
    bond: { value: 'bond', },
    stock: { value: 'stock', },
    options: { value: 'options', },
    mtf: { value: 'mtf', },
    etf: { value: 'etf', },
    currency: { value: 'currency', },
  },
});

const TradingStatus = new GraphQLEnumType({
  name: 'TradingStatus',
  values: {
    steady: { value: 'רציף', },
    lock: { value: 'נעולה', },
    close: { value: 'סגורה', },
    preLock: { value: 'טרום נעילה', },
    preOpen: { value: 'טרום פתיחה', },
  },
});

const financeAssetFields = new GraphQLObjectType({
  name: 'TableAsset',
  fields: () => ({
    name: { type: GraphQLString, },
    id: { type: GraphQLString, },
    symbol: { type: GraphQLString, },
    type: { type: AssetType, },
    value: { type: GraphQLFloat, },
    USDValue: { type: GraphQLFloat, },
    baseValue: { type: GraphQLFloat, },
    openingValue: { type: GraphQLFloat, },
    maxValue: { type: GraphQLFloat, },
    minValue: { type: GraphQLFloat, },
    changePercentage: { type: GraphQLFloat, },
    lastTradeTime: { type: GraphQLTimestamp, },
    tradingStatus: { type: TradingStatus, },
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
    weeklyAvgMtfYield: { type: GraphQLFloat, },
    monthlyAvgMtfYield: { type: GraphQLFloat, },
    quarterlyAvgMtfYield: { type: GraphQLFloat, },
    yearlyAvgMtfYield: { type: GraphQLFloat, },
    threeYearsAvgMtfYield: { type: GraphQLFloat, },
    fiveYearsAvgMtfYield: { type: GraphQLFloat, },
    maxAvgMtfYield: { type: GraphQLFloat, },
    managementFee: { type: GraphQLFloat, },
    inflows: { type: GraphQLFloat, },
    outflows: { type: GraphQLFloat, },
    mtfBeat: { type: new GraphQLList(GraphQLInt), },
    standardDeviation: { type: GraphQLFloat, },
    peRatio: { type: GraphQLFloat, },
    pbRatio: { type: GraphQLFloat, },
    psRatio: { type: GraphQLFloat, },
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
    holdingsRatio: { type: GraphQLFloat, },
    sharpIndex: { type: GraphQLFloat, }, // (0-10)
    inflowsPercentageChange: { type: GraphQLFloat, },
    outflowsPercentageChange: { type: GraphQLFloat, },
    // relates to MTFs and ETFs
    manager: { type: GraphQLString, },
    trustee: { type: GraphQLString, },
    exposure: { type: GraphQLString, },
    exposureProfile: { type: GraphQLString, },
    foundingDate: { type: GraphQLTimestamp, },
    tradingHours: {
      type: new GraphQLObjectType({
        name: 'TradingHours',
        fields: () => ({
          start: { type: GraphQLTimestamp, },
          end: { type: GraphQLTimestamp, },
        }),
      }),
    },
    dividendClassification: { type: GraphQLString, },
    trusteeFee: { type: GraphQLFloat, },
    loadChargeRate: { type: GraphQLFloat, },
    distributionCommission: { type: GraphQLFloat, },
    mainCurrency: { type: GraphQLString, },
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
    expirationBenchmarkDate: { type: GraphQLTimestamp, },
    theoreticalValue: { type: GraphQLFloat, },
    theoreticalValueGap: { type: GraphQLFloat, },
  }),
});

export default new GraphQLObjectType({
  name: 'FinanceTable',
  fields: () => ({
    assets: { type: new GraphQLList(financeAssetFields), },
  }),
});
