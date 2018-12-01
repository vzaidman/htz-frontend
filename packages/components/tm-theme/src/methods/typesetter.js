import { createTypesetter, } from '@haaretz/htz-css-tools';
import mq from './mq';
import bps from '../consts/bps';
import typeConf from '../consts/typeConf';

const typesetter = createTypesetter(mq, typeConf, bps.widths);
export default typesetter;
