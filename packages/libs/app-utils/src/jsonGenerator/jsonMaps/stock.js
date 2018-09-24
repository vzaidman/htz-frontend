// @flow
import string from '../methods/string';
import number from '../methods/number';
import date from '../methods/date';
import list from '../methods/list';

const stockObject: Object = new Map([
  [ 'id', () => string.id(), ],
  [ 'name', () => string.lorem({ count: 1, type: 'word', }), ],
  [ 'value', () => number.float({ max: 10000, min: 0, fixed: 2, }), ],
  [ 'changePercentage', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'changeInCurr', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'stockType', () => string.enum([ 'מניה רגילה', ]), ],
  [ 'stockNumber', () => number.int({ max: 999999, min: 100000, }), ],
  [ 'lastTradeTime', () => date.timestamp({}), ],
  [ 'relatedStocks', () => list(
    [
      {
        method: string.lorem,
        options: { count: 2, type: 'word', },
      },
    ],
    number.int({ max: 5, min: 1, }),
  ), ],
  [ 'volume', () => number.float({ max: 1000000, min: 0, fixed: 2, }), ],
  [ 'dailyAvgVolume', () => number.float({ max: 1000000, min: 0, fixed: 2, }), ],
  [ 'dailyYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'weeklyYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'monthlyYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'quarterlyYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'yearlyYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'threeYearsYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'fiveYearsYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
  [ 'maxYield', () => number.float({ max: 100, min: -100, fixed: 2, }), ],
]);

export default stockObject;
