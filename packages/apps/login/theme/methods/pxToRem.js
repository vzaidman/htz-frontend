import { createRemFunction, } from '@haaretz/htz-css-tools';
import mq from './mq';
import bps from '../consts/bps';
import typeConf from '../consts/typeConf';

const pxToRem = createRemFunction(mq, typeConf, bps.widths);
export default pxToRem;
