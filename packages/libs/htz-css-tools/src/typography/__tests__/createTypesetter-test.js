import mqFuncFactory from '../../mq/createMqFunc';
import createTypesetter from '../createTypesetter';

describe('typography factory function', () => {
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
  const type = createTypesetter(mqFunc, typeConf, bps.widths);
  const typeSingleRhythm = createTypesetter(
    mqFunc,
    singleRhythmTypeConf,
    bps.widths
  );
  const typeDefaultFallback = createTypesetter(
    mqFunc,
    typeConf,
    bps.widths,
    true
  );

  it("throws when a rhythmBp isn't a named breakpoint", () => {
    expect(() => createTypesetter(mqFunc, badTypeConf, bps.widths)).toThrow(
      '"doesNotExist" is not a named breakpoint'
    );
  });
  it('return a function', () => {
    expect(typeof type).toBe('function');
  });
  it('behaves according to "defaultFallback" argument', () => {
    // Without pixel fallback by default
    expect(type(0)).toEqual({
      '@media (max-width: 37.4375em)': {
        fontSize: '2.6666666666666665rem',
        lineHeight: '1.5em',
      },
      '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
        fontSize: '2.5714285714285716rem',
        lineHeight: '1.5555555555555556em',
      },
      '@media (min-width: 80em)': {
        fontSize: '2.625rem',
        lineHeight: '1.5238095238095237em',
      },
    });

    // With pixel fallback by default
    expect(typeDefaultFallback(0)).toEqual({
      '@media (max-width: 37.4375em)': {
        fontSize: [ '16px', '2.6666666666666665rem', ],
        lineHeight: '1.5em',
      },
      '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
        fontSize: [ '18px', '2.5714285714285716rem', ],
        lineHeight: '1.5555555555555556em',
      },
      '@media (min-width: 80em)': {
        fontSize: [ '21px', '2.625rem', ],
        lineHeight: '1.5238095238095237em',
      },
    });
  });

  /*
   * Integration tests instead of unit tests here in order to check
   * actual behavior rather than implementation details.
   */
  describe('Returned function', () => {
    it('throws when "untilBp" is the "default" breakpoint', () => {
      expect(() => type(0, { untilBp: 'default', })).toThrow();
    });
    it('throws when "fromBp" and "untilBp" are the same breakpoint', () => {
      expect(() => type(0, { fromBp: 'm', untilBp: 'm', })).toThrow();
    });
    it('throws when "fromBp" is a breakpoint wider than "untilBp"', () => {
      expect(() => type(0, { fromBp: 'l', untilBp: 'm', })).toThrow();
    });
    it('throws when "untilBp" is not a named breakpoint', () => {
      expect(() => type(0, { fromBp: 'mobile', untilBp: 'l', })).toThrow();
    });
    it('throws when "untilBp" is not a named breakpoint', () => {
      expect(() => type(0, { fromBp: 'm', untilBp: 'desktop', })).toThrow();
    });

    /*
     * A little abstraction to make testing a lot of cases easier
     *
     * @param {string} name - The test name
     * @param {Function} fn - The function to test
     * @param {Array} args - An array of arguments to passed to the tested function
     * @param {Object} expected - The expected results
     * @param {Object} [opts] - Additional options
     * @param {boolean} [opts.skip] - Should the test be skipped?
     * @param {boolean} [opts.only] - Should only this test be executed?
     * @param {string} [opts.matcher='toEqual'] - The matcher to use.
     */
    function testCase(
      name,
      fn,
      args,
      expected,
      { skip, only, matcher = 'toEqual', } = {}
    ) {
      const testFunc = skip ? it.skip : only ? it.only : it;
      testFunc(name, () => {
        expect(fn(...args))[matcher](expected);
      });
    }

    testCase(
      'Creates pixel fallback',
      type,
      [ 0, { untilBp: 'm', pxFallback: true, }, ],
      {
        '@media (max-width: 37.4375em)': {
          fontSize: [ '16px', `${16 / 6}rem`, ],
          lineHeight: '1.5em',
        },
      }
    );

    testCase(
      'overrides the default pixel fallback settings',
      typeDefaultFallback,
      [ 0, { untilBp: 'm', pxFallback: false, }, ],
      {
        '@media (max-width: 37.4375em)': {
          fontSize: `${16 / 6}rem`,
          lineHeight: '1.5em',
        },
      }
    );

    testCase(
      'handles the "default" min-width breakpoint correctly',
      type,
      [ 0, { fromBp: 'default', untilBp: 'm', }, ],
      {
        '@media (max-width: 37.4375em)': {
          fontSize: `${16 / 6}rem`,
          lineHeight: '1.5em',
        },
      }
    );

    testCase(
      'changes "line-height" based on the "lines" option',
      type,
      [ 0, { fromBp: 'default', untilBp: 'm', lines: 5, }, ],
      {
        '@media (max-width: 37.4375em)': {
          fontSize: `${16 / 6}rem`,
          lineHeight: '5rem',
        },
      }
    );

    testCase(
      'changes "line-height" based on the "lines" option and creates correct pixel fallback',
      type,
      [ 0, { fromBp: 'default', untilBp: 'm', lines: 5, pxFallback: true, }, ],
      {
        '@media (max-width: 37.4375em)': {
          fontSize: [ '16px', `${16 / 6}rem`, ],
          lineHeight: [ `${5 * 6}px`, '5rem', ],
        },
      }
    );

    testCase(
      'Creates styles in all breakpoints correctly when neither "fromBp" nor "untilBp" are set',
      type,
      [ 0, ],
      {
        '@media (max-width: 37.4375em)': {
          fontSize: `${16 / 6}rem`,
          lineHeight: '1.5em',
        },
        '@media (min-width: 37.5em) and (max-width: 79.9375em)': {
          fontSize: `${18 / 7}rem`,
          lineHeight: '1.5555555555555556em',
        },
        '@media (min-width: 80em)': {
          fontSize: `${21 / 8}rem`,
          lineHeight: '1.5238095238095237em',
        },
      }
    );

    testCase(
      'return a style object without media queries when only a single typographic breakpoint is defined in the global config',
      typeSingleRhythm,
      [ 0, ],
      {
        fontSize: `${16 / 6}rem`,
        lineHeight: '1.5em',
      }
    );

    testCase(
      'Correctly increases "font-size" past the steps in the first interval',
      type,
      [ 5, { untilBp: 'm', }, ],
      {
        '@media (max-width: 37.4375em)': {
          // prettier-ignore
          fontSize: `${(16 / 6) * 2}rem`,
          lineHeight: '1.125em',
        },
      }
    );
  });
});
