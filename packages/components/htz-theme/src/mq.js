import { createMqFunc, } from '@haaretz/htz-css-tools';

export const bps = Object.freeze({
  widths: Object.freeze({
    s: 600,
    m: 768,
    l: 1024,
    xl: 1280,
  }),
  misc: Object.freeze({
    landscape: '(orientation: landscape)',
    partrait: '(orientation: portrait)',
    hidpi: '(min-resolution: 1.5dppx)',
  }),
});

const mq = createMqFunc(bps);
export default mq;
