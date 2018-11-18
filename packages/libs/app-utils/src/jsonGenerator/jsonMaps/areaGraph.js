// @flow
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';
import date from '../methods/date';

const scatterMap: Object = new Map([
  [ 'dataSource', ({ args, }) => list(
    [
      {
        method: object,
        options: {
          time: ({ index, }) =>
            date.steppingTimestamp({ initialTime: 1541023200000, step: -2592000000, index, }),
          value: () => number.float({ max: 2600, min: 2550, fixed: 2, }),
          peRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
        },
      },
    ],
    240,
    args,
  ), ],
]);

export default scatterMap;
