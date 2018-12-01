// @flow
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';
import { assetObject, } from './asset';

const searchMap: Object = new Map([
  [ 'assets', ({ args, }) => list(
    [
      {
        method: object,
        options: assetObject,
      },
    ],
    number.int({ max: 50, min: 5, }),
    args,
  ), ],
]);

export default searchMap;
