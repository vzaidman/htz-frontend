import getBpsInRange from '../getBpsInRange';

describe('# getBpsInRange()', () => {
  const bps = [ 'defualt', 's', 'm', 'l', 'xl', ];
  it('Return an array containing all breakpoints between "min" and "max", including', () => {
    expect(getBpsInRange(bps, 'm', 'xl')).toEqual([ 'm', 'l', 'xl', ]);
  });
  it('Return an array containing all breakpoints followin and including "min", when "max" is undefined', () => {
    expect(getBpsInRange(bps, 'm')).toEqual([ 'm', 'l', 'xl', ]);
  });
  it('Return an array containing one breakpoint name when "min" and "max" are the same', () => {
    expect(getBpsInRange(bps, 'l', 'l')).toEqual([ 'l', ]);
  });
  it('Throw if bps is an empty array', () => {
    expect(() => getBpsInRange([], 'l')).toThrow(
      'The "bps" array in "getBpsInRange" can not be empty'
    );
  });
  // it('Throw if neither "min" nor "max" ar passed', () => {
  //   expect(() => getBpsInRange(bps))
  //     .toThrow(/At least one of the "min" and "max" parameters mast be defined in "getBpsInRange"/i);
  // });
  it('Throw if "min" isn\'t a breakpoint in "bps"', () => {
    expect(() => getBpsInRange(bps, 'sayWhat', 'xl')).toThrow(
      /does not exist in the array of breakpoint names/i
    );
  });
  it('Throw if "max" isn\'t a breakpoint in "bps"', () => {
    expect(() => getBpsInRange(bps, 'xl', 'sayWhat')).toThrow(
      /does not exist in the array of breakpoint names/i
    );
  });
  it('Throw if "min" comes after "max" in the "bps" array', () => {
    expect(() => getBpsInRange(bps, 'xl', 'l')).toThrow(
      /must be a smaller than or the same breakpoint as "max"/i
    );
  });
});
