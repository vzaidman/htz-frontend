// @flow
import number from '../methods/number';
import list from '../methods/list';
import object from '../methods/object';
import { assetObject, } from './asset';

const tableMap: Object = new Map([
  [ 'assets', ({ args, }) => list(
    [
      {
        method: object,
        options: assetObject,
      },
    ],
    args && args.count && !(args.offset && args.count !== args.offset)
      ? args.count
      : number.int({ max: 20, min: 3, })
    ,
    args,
  ), ],
]);

export default tableMap;
