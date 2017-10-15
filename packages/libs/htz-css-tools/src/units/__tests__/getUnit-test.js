import getUnit from '../getUnit';

describe('## getUnit()', () => {
  it('Should return the unit when passed a number-string with unit', () => {
    expect(getUnit('320rem')).toEqual('rem');
  });
  it('Should return a `unitless` when passed a unitless number-string', () => {
    expect(getUnit('320')).toEqual('unitless');
  });
  it('Should throw when passed a string that cannot be parsed to number', () => {
    expect(() => getUnit('rem320')).toThrow();
  });
});
