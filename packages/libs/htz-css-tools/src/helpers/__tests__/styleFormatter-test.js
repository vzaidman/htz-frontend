import { styleFormatter, } from '../styleFormatter';

describe('# pxToRem factory function', () => {
  it('Return correct values when "value" is a string', () => {
    expect(styleFormatter('color', 'red')).toEqual({ color: 'red', });
  });
  it('Return correct values when "value" is a number', () => {
    expect(styleFormatter('opacity', 0)).toEqual({ opacity: 0, });
  });
});
