import isNamedBp from '../isNamedBp';

describe('# isNamedBp()', () => {
  it('returns true when "breakpoint" is a string included in "namedBps"', () => {
    expect(isNamedBp('s', [ 's', 'm', ])).toBe(true);
  });
  it('returns true when "breakpoint" is a string included in "namedBps" and "shouldThrow" is "true"', () => {
    expect(isNamedBp('s', [ 's', 'm', ], true)).toBe(true);
  });
  it('returns true when "breakpoint" is an array of strings, all included in "namedBps"', () => {
    expect(isNamedBp([ 's', 'xl', ], [ 's', 'm', 'l', 'xl', ])).toBe(true);
  });
  it('returns true when "breakpoint" is an array of strings, all included in "namedBps" and "shoudThrow" is true', () => {
    expect(isNamedBp([ 's', 'xl', ], [ 's', 'm', 'l', 'xl', ], true)).toBe(true);
  });
  it('returns false when "breakpoint" is a string not included in "namedBps"', () => {
    expect(isNamedBp('mobile', [ 's', 'm', ])).toBe(false);
  });
  it('throws when "breakpoint" is a string not included in "namedBps" and "shouldThrow" is "true"', () => {
    // prettier-ignore
    expect(() => isNamedBp('tablet', [ 's', 'm', ], true))
      .toThrow('"tablet" is not a named breakpoint');
  });
  it('returns false when "breakpoint" is an array of strings, one of which is not included in "namedBps" and "shoudThrow" is true', () => {
    expect(isNamedBp([ 's', 'desktop', ], [ 's', 'm', 'l', 'xl', ])).toBe(false);
  });
  // eslint-disable-next-line max-len
  it('throws when "breakpoint" is an array of strings, one of which is not included in "namedBps" and "shoudThrow" is true', () => {
    // prettier-ignore
    expect(() => isNamedBp([ 's', 'tv', ], [ 's', 'm', 'l', 'xl', ], true))
      .toThrow('"tv" is not a named breakpoint');
  });
});
