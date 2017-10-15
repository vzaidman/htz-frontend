import stripUnit from '../stripUnit';

describe('# stripUnit()', () => {
  it('Should return a number when passed a number-string with unit', () => {
    expect(stripUnit('320rem')).toEqual(320);
  });
  it('Should return a number when passed a unitless number-string', () => {
    expect(stripUnit('320')).toEqual(320);
  });
  it('Should throw when passed a string that cannot be parsed to number', () => {
    expect(() => stripUnit('rem320')).toThrow();
  });
});
