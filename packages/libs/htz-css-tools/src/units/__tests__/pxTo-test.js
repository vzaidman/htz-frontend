import pxTo, { pxToRem, pxToEm, } from '../pxTo';

describe('# Px to Unit Factory', () => {
  describe('## pxTo()', () => {
    const pxToPt = pxTo('pt');
    const pxToCm = pxTo('mm');
    it('Return a function', () => {
      expect(typeof pxToPt).toEqual('function');
      expect(typeof pxToCm).toEqual('function');
    });
    it('Return a function with an arity of two', () => {
      expect(pxToPt.length).toEqual(2);
    });
    it('Throw when trying to creae a converter to a non-convertable unit', () => {
      expect(() => pxTo('vh')).toThrow(
        '"pxTo()" cannot create a converter from pixels to the "vh" unit'
      );
    });
  });
});
describe('# pxToEm()', () => {
  it('Convert px to unit based on base value', () => {
    expect(pxToEm(24, 16)).toEqual('1.5em');
  });
  it('Convert an array of values to unit based on base value', () => {
    expect(pxToEm([ 12, 24, ], 6)).toEqual('2em 4em');
  });
});
describe('# pxToRem()', () => {
  it('Convert px to unit based on base value, when both args are numbers', () => {
    expect(pxToRem(24, 16)).toEqual('1.5rem');
  });
  it('Convert an array of values to unit based on base value', () => {
    expect(pxToRem([ 12, 24, ], 6)).toEqual('2rem 4rem');
  });
});
