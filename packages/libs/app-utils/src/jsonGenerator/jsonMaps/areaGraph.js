// @flow
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';
import date from '../methods/date';

const now: number = new Date().getTime();

const argsFromTime: Object = new Map([
  [ 'year', { count: 12, step: 2592000000, }, ],
  [ 'fiveYears', { count: 10, step: 2592000000 * 6, }, ],
  [ 'tenYears', { count: 10, step: 31536000000, }, ],
  [ 'fifteenYears', { count: 15, step: 31536000000, }, ],
  [ 'twentyYears', { count: 20, step: 31536000000, }, ],
]);


const scatterMap: Object = new Map([
  [ 'dataSource', ({ args, }) => list(
    [
      {
        method: object,
        options: {
          time: ({ index, args: { time, }, }) =>
            date.steppingTimestamp({ initialTime: now, step: argsFromTime.get(time).step, index, }),
          value: () => number.float({ max: 2600, min: 2550, fixed: 2, }),
          peRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
        },
      },
    ],
    argsFromTime.get(args.time).count,
    args,
  ), ],
]);

export default scatterMap;
