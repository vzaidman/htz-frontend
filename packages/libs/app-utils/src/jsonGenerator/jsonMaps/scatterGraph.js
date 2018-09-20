// @flow
import string from '../methods/string';
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';

const count: number = number.int({ min: 5, max: 500, });

const scatterMap: Object = new Map([
  [ 'xLabel', () => string.lorem({ count: 1, type: 'word', }), ],
  [ 'yLabel', () => string.lorem({ count: 1, type: 'word', }), ],
  [ 'dataSource', () => list(
    [
      {
        method: object,
        options: {
          x: () => number.float({ max: 50000, min: 0, fixed: 2, }),
          y: () => number.float({ max: 25, min: -15, fixed: 2, }),
          id: () => string.id(),
          name: () => string.lorem({ count: 1, type: 'word', }),
          symbol: () => string.lorem({ count: 1, type: 'word', }),
        },
      },
    ],
    count
  ), ],
]);

export default scatterMap;
