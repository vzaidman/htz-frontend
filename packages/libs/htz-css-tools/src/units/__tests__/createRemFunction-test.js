import mqFuncFactory from '../../mq/mq';
import createRemFunction from '../createRemFunction';

describe('pxToRem factory function', () => {
  const bps = {
    widths: {
      s: 480,
      m: 600,
      l: 1024,
      xl: 1280,
    },
    misc: {
      landscape: '(orientation: landscape)',
    },
  };
  const typeConf = {
    default: {
      base: 16,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 6,
      steps: 5,
    },
    m: {
      base: 18,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 7,
      steps: 5,
    },
    xl: {
      base: 21,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 8,
      steps: 5,
    },
  };
  const singleRhythmTypeConf = {
    default: {
      base: 16,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 6,
      steps: 5,
    },
  };
  const badTypeConf = {
    doesNotExist: {
      base: 24,
      minPadding: 2,
      ratio: 2,
      rhythmUnit: 7,
      steps: 5,
    },
  };
  const mqFunc = mqFuncFactory(bps);
  const rem = createRemFunction(mqFunc, typeConf, bps.widths);
  const remSingleRhythm = createRemFunction(
    mqFunc,
    singleRhythmTypeConf,
    bps.widths
  );
  const remWithDefaultFallback = createRemFunction(
    mqFunc,
    typeConf,
    bps.widths,
    true
  );

  it('throws when a "rhythmBp" isn\'t a named breakpoint', () => {
    expect(() => createRemFunction(mqFunc, badTypeConf, bps.widths)).toThrow(
      '"doesNotExist" is not a named breakpoint'
    );
  });
  it('return a function', () => {
    expect(typeof rem).toBe('function');
  });
  it('return a function with an arity of 5', () => {
    expect(rem.length).toEqual(5);
  });
  it('behaves according to "defaultFallback" argument', () => {
    // Without pixel fallback by defualt
    expect(rem('padding', 6)).toEqual({
      '@media (max-width: 37.4375em)': { padding: '1rem', },
      '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
        padding: `${6 / 7}rem`,
      },
      '@media (min-width: 80em)': { padding: `${6 / 8}rem`, },
    });

    // With pixel fallback by default
    expect(remWithDefaultFallback('padding', 6)).toEqual({
      '@media (max-width: 37.4375em)': { padding: [ '6px', '1rem', ], },
      '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
        padding: [ '6px', `${6 / 7}rem`, ],
      },
      '@media (min-width: 80em)': { padding: [ '6px', `${6 / 8}rem`, ], },
    });
  });

  /*
   * Integration tests instead of unit tests here in order to check
   * actual behavior rather than implementation details.
   */
  describe('Returned function', () => {
    it('throws when "untilBp" is the "default" breakpoint', () => {
      expect(() => rem('padding', 6, undefined, 'default')).toThrow();
    });
    it('throws when "fromBp" and "untilBp" are the same breakpoint', () => {
      expect(() => rem('padding', 6, 'm', 'm')).toThrow();
    });
    it('throws when "fromBp" is a breakpoint wider than "untilBp"', () => {
      expect(() => rem('padding', 6, 'l', 'm')).toThrow();
    });

    /*
     * A little abstraction to make testing a lot of cases easier
     *
     * @param {Function} fn - The function to test
     * @param {Array[]} testCases - An array testCase arrays
     * @param {Array} testCases[0][0] - An array of arguments to passed to the tested function
     * @param {Object} testCases[0][1] - The expected result
     */
    function testUsecases(fn, testCases) {
      testCases.forEach(testCase => {
        const [ args, expected, ] = testCase;
        it(`returns ${JSON.stringify(expected)} when passed (padding,${
          args
        })`, () => {
          expect(fn('padding', ...args)).toEqual(expected);
        });
      });
    }
    /* An array of arguments and expected results */
    const testCases = [
      // Array of values
      [
        [ [ 6, 12, ], ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem 2rem', },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem ${12 / 7}rem`,
          },
          '@media (min-width: 80em)': { padding: `${6 / 8}rem ${12 / 8}rem`, },
        },
      ],
      // All bps
      [
        [ 6, ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
          '@media (min-width: 80em)': { padding: `${6 / 8}rem`, },
        },
      ],

      // Fallback value
      [
        [ 6, undefined, undefined, true, ],
        {
          '@media (max-width: 37.4375em)': { padding: [ '6px', '1rem', ], },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: [ '6px', `${6 / 7}rem`, ],
          },
          '@media (min-width: 80em)': { padding: [ '6px', `${6 / 8}rem`, ], },
        },
      ],
      [
        [ [ 6, 12, ], undefined, undefined, true, ],
        {
          '@media (max-width: 37.4375em)': {
            padding: [ '6px 12px', '1rem 2rem', ],
          },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: [ '6px 12px', `${6 / 7}rem ${12 / 7}rem`, ],
          },
          '@media (min-width: 80em)': {
            padding: [ '6px 12px', `${6 / 8}rem ${12 / 8}rem`, ],
          },
        },
      ],

      // Min-width
      [
        [ 6, 'default', ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
          '@media (min-width: 80em)': { padding: `${6 / 8}rem`, },
        },
      ],
      [
        [ 6, 'm', ],
        {
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
          '@media (min-width: 80em)': { padding: `${6 / 8}rem`, },
        },
      ],
      [
        [ 6, 'l', ],
        {
          '@media (min-width: 64em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
          '@media (min-width: 80em)': { padding: `${6 / 8}rem`, },
        },
      ],
      [
        [ 6, 'xl', ],
        {
          '@media (min-width: 80em)': { padding: `${6 / 8}rem`, },
        },
      ],

      // max-width
      [
        [ 6, undefined, 'm', ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
        },
      ],
      [
        [ 6, undefined, 'l', ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
          '@media (min-width: 37.5em) and (max-width: 63.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],
      [
        [ 6, undefined, 'xl', ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],

      // min and max-width
      [
        [ 6, 'default', 'm', ],
        { '@media (max-width: 37.4375em)': { padding: '1rem', }, },
      ],
      [
        [ 6, 'default', 'l', ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
          '@media (min-width: 37.5em) and (max-width: 63.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],
      [
        [ 6, 'default', 'xl', ],
        {
          '@media (max-width: 37.4375em)': { padding: '1rem', },
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],
      [
        [ 6, 'm', 'l', ],
        {
          '@media (min-width: 37.5em) and (max-width: 63.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],
      [
        [ 6, 'm', 'xl', ],
        {
          '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],
      [
        [ 6, 'l', 'xl', ],
        {
          '@media (min-width: 64em) and (max-width: 79.9375em)': {
            padding: `${6 / 7}rem`,
          },
        },
      ],
    ];

    testUsecases(rem, testCases);
    testUsecases(remSingleRhythm, [ [ [ 6, ], { padding: '1rem', }, ], ]);
  });
});
