/* global window */
import mqPolyfill from 'mq-polyfill';
import getRemFromPx from '../getRemFromPx';

mqPolyfill(window);
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    ...(width ? { innerWidth: width, outerWidth: width, } : {}),
    ...(height ? { innerHeight: height, outerHeight: height, } : {}),
  }).dispatchEvent(new this.Event('resize'));
};

const typeConf = {
  default: {
    base: 16,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 6,
    steps: 5,
  },
  l: {
    base: 18,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 7,
    steps: 5,
  },
  xl: {
    base: 18,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 8,
    steps: 5,
  },
};

const widthBps = {
  s: 320,
  m: 780,
  l: 1024,
  xl: 1280,
};

describe('getRemFromPx()', () => {
  it('return correct value in breakpoint', () => {
    window.resizeTo(1200);
    expect(getRemFromPx(widthBps, typeConf, 42)).toBe(6);
  });
  it('return correct value of default typeConf when no breakpoint matches', () => {
    window.resizeTo(300);

    expect(getRemFromPx(widthBps, typeConf, 42)).toBe(7);
  });
  it('fallback to "default" even when it doesn\'t match', () => {
    window.resizeTo(300);

    expect(
      getRemFromPx(
        widthBps,
        { l: { rhythmUnit: 7, }, xl: { rhythmUnit: 8, }, },
        42
      )
    ).toBe(undefined);
  });
});
