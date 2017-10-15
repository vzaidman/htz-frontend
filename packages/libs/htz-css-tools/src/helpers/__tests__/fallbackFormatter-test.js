import { fallbackFormatter, } from '../fallbackFormatter';

describe('# pxToRem factory function', () => {
  it('Return correct values when "values" is an array of strings', () => {
    expect(fallbackFormatter('color', [ '#ccc', 'var(--primary)', ])).toEqual({
      color: [ '#ccc', 'var(--primary)', ],
    });
  });
  it('Return correct values when "values" is an array of numbers', () => {
    expect(fallbackFormatter('padding', [ 0, 0.5, ])).toEqual({
      padding: [ 0, 0.5, ],
    });
  });
  it('Return correct values when "values" is an array of mixed numbers and strings', () => {
    expect(fallbackFormatter('padding', [ 0, '0.5vw', ])).toEqual({
      padding: [ 0, '0.5vw', ],
    });
  });
});
