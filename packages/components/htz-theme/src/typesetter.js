import { createTypesetter, } from '@haaretz/htz-css-tools';
import mq, { bps, } from './mq';

export const typeConf = {
  default: {
    base: 16,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 6,
    steps: 5,
  },
  xl: {
    base: 18,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 7,
    steps: 5,
  },
};

console.log(JSON.stringify(typeConf));

const typesetter = createTypesetter(mq, typeConf, bps.widths);
export default typesetter;
