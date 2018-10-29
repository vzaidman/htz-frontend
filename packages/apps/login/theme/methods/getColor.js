import { createColorGetter, } from '@haaretz/htz-css-tools';
import { colors, } from '../consts/colors';

const getColor = host => createColorGetter(colors(host));

export default getColor;
