// @flow
import string from '../methods/string';
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';
import date from '../methods/date';

const now: number = new Date().getTime();

const argsFromTime: Object = new Map([
  [ 'daily', { count: 96, step: 300000, }, ],
  [ 'weekly', { count: 7, step: 86400000, }, ],
  [ 'monthly', { count: 25, step: 86400000, }, ],
  [ 'yearly', { count: 260, step: 86400000, }, ],
  [ 'tripleYear', { count: 150, step: 604800000, }, ],
  [ 'max', { count: 250, step: 604800000, }, ],
]);


const lineMap: Object = new Map([
  [ 'startTime', () => date.timestamp({}), ],
  [ 'endTime', () => date.timestamp({}), ],
  [ 'dataSource', ({ args, }) => list(
    [
      {
        method: object,
        options: {
          time: ({ index, args: { time, }, }) => date.steppingTimestamp({ initialTime: now, step: argsFromTime.get(time).step, index, }),
          value: () => number.float({ max: 2600, min: 2550, fixed: 2, }),
          change: () => number.float({ max: 25, min: -15, fixed: 2, }),
          volume: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
          yieldSpread: () => number.float({ max: 25, min: -15, fixed: 2, }),
          name: () => string.lorem({ count: 1, type: 'word', }),
          symbol: () => string.lorem({ count: 1, type: 'word', }),
        },
      },
    ],
    argsFromTime.get(args.time).count,
    args,
  ), ],
]);

export default lineMap;
