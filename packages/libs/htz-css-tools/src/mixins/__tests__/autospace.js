import autospace from '../autospace';

describe('autospace mixin', () => {
  it('create correct style object', () => {
    const result = autospace(2);
    const expected = {
      '> * + *': {
        marginTop: '2rem',
      },
    };

    expect(result).toEqual(expected);
  });
  it('create correct style object for multi-column layouts', () => {
    const result = autospace(2, 3);
    const expected = {
      '> * + *:nth-child(n+4)': {
        marginTop: '2rem',
      },
    };

    expect(result).toEqual(expected);
  });
});
