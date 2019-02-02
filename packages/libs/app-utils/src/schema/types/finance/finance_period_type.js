import { GraphQLEnumType, } from 'graphql';

const periodType = new GraphQLEnumType({
  name: 'PeriodType',
  values: {
    daily: { value: 'daily', },
    weekly: { value: 'weekly', },
    monthly: { value: 'monthly', },
    yearly: { value: 'yearly', },
    tripleYear: { value: 'tripleYear', },
    max: { value: 'max', },
  },
});

export default periodType;
