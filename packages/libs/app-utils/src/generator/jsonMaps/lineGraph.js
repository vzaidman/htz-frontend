// @flow
import string from '../methods/string';
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';
import date from '../methods/date';

const now: number = new Date().getTime();

const scatterMap: Object = new Map([
  [ 'xLabel', () => string.lorem({ count: 1, type: 'word', }), ],
  [ 'yLabel', () => string.lorem({ count: 1, type: 'word', }), ],
  [ 'startTime', () => date.timestamp({}), ],
  [ 'endTime', () => date.timestamp({}), ],
  [ 'dataSource', () => list(
    [
      {
        method: object,
        options: {
          time: index => date.steppingTimestamp({ initialTime: now, step: 300000, index, }),
          value: () => number.float({ max: 2600, min: 2550, fixed: 2, }),
          change: () => number.float({ max: 25, min: -15, fixed: 2, }),
          volume: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
          yieldSpread: () => number.float({ max: 25, min: -15, fixed: 2, }),
          name: () => string.lorem({ count: 1, type: 'word', }),
          symbol: () => string.lorem({ count: 1, type: 'word', }),
        },
      },
    ],
    20
  ), ],
]);

export default scatterMap;
