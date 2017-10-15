import getClosestBp from '../getClosestBp';

describe('# getClosestBp()', () => {
  const bps = [ 'defualt', 's', 'm', 'l', 'xl', ];
  const subset = [ 'default', 'l', ];
  it('Return the searched name when it exists in the subset', () => {
    expect(getClosestBp('l', subset, bps)).toEqual('l');
  });
  it("Return the closet smaller breakpoint from the subset when the searched name doesn't exist in it", () => {
    expect(getClosestBp('xl', subset, bps)).toEqual('l');
  });
  it('Throw an error when "bp" isn\'t a named breakpoint in the "allBps" array', () => {
    expect(() => getClosestBp('noSuchThing', subset, bps)).toThrow(
      /not a named breakpoint$/
    );
  });
  it('Return "default" when no other option is available', () => {
    expect(getClosestBp('m', subset, bps)).toEqual('default');
  });
  it('Return "default" when no other option is available and "default" is not defined in "bps"', () => {
    expect(getClosestBp('m', subset, [ 's', 'm', 'l', 'xl', ])).toEqual('default');
  });
  it('Return the previous breakpoint name even if "bp" is present in "subset" when "allwaysGetPrior" is "true"', () => {
    expect(getClosestBp('l', subset, bps, true)).toEqual('default');
  });
});
