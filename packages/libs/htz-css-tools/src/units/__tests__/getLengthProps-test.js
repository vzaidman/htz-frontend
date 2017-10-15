import getLengthProps from '../getLengthProps';

describe('## getLengthProps()', () => {
  it('Should return length as a number and unit as string when passed a number-string with unit', () => {
    expect(getLengthProps('320rem')).toEqual({
      unitlessValue: 320,
      unit: 'rem',
    });
  });
  it('Should return length as a number and unit as unitless when passed a unitless number-string', () => {
    expect(getLengthProps('320')).toEqual({
      unitlessValue: 320,
      unit: 'unitless',
    });
  });
  it('Should throw when passed a string that cannot be parsed to number', () => {
    expect(() => getLengthProps('rem320')).toThrow();
  });
});
