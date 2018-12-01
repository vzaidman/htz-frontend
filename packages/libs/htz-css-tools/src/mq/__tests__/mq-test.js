import getMqString, { getLengthString, } from '../getMqString.js';
import createMqFunc from '../createMqFunc';

describe('# Media Queries', () => {
  describe('## getLengthString()', () => {
    const test = length => getLengthString(length, { s: 600, m: 1024, l: 1280, });
    it('Return a number-string in ems when passed a number', () => {
      expect(test(320)).toEqual('20em');
    });
    it('Return a number-string in ems when passed a number-string in pixels', () => {
      expect(test('320px')).toEqual('20em');
    });
    it('Return a number-string in ems when passed named breakpoint', () => {
      expect(test('s')).toEqual('37.5em');
    });
    it('Return an unmodified number-string when passed a number-string in non-pixel untis', () => {
      expect(test('20rem')).toEqual('20rem');
    });
    it('Throw when `length` is a string that cannot be parsed to number', () => {
      expect(() => test('rem20')).toThrow();
    });
  });

  describe('## getMqString()', () => {
    it('return a media query string with the "@media" prefix', () => {
      const result = getMqString(
        {
          widths: { s: 600, m: 1024, l: 1280, },
          misc: { landscape: '(orientation: landscape)', },
        },
        { from: 's', until: 'm', misc: 'landscape', }
      );

      expect(result).toBe(
        `@media (min-width: ${600 / 16}em) and (max-width: ${(1024 - 1)
          / 16}em) and (orientation: landscape)`
      );
    });
    it('return a media query string without the "@media" prefix', () => {
      const result = getMqString(
        {
          widths: { s: 600, m: 1024, l: 1280, },
          misc: { landscape: '(orientation: landscape)', },
        },
        { from: 's', until: 'm', misc: 'landscape', },
        true
      );

      expect(result).toBe(
        `(min-width: ${600 / 16}em) and (max-width: ${(1024 - 1)
          / 16}em) and (orientation: landscape)`
      );
    });
  });
  describe('## mqFuncFactory()', () => {
    it('Return a function when not passing a configuration oject', () => {
      expect(typeof createMqFunc()).toBe('function');
    });
    it('Return a function when passing a configuration oject', () => {
      expect(
        typeof createMqFunc({ widths: { s: 600, m: 800, }, misc: {}, })
      ).toBe('function');
    });
    it('Throw when a the configuration object doesn\'t have a "widths" key', () => {
      expect(() => createMqFunc({ misc: {}, })).toThrow(
        'The configuration object must contain a `widths` key'
      );
    });
    it('Throw when a the configuration object doesn\'t have a "misc" key', () => {
      expect(() => createMqFunc({ widths: {}, })).toThrow(
        'The configuration object must contain a `misc` key'
      );
    });
    it('Throw when a the configuration object has a "widths.default" key', () => {
      expect(() => createMqFunc({ widths: { default: 0, }, misc: {}, })).toThrow(
        'The "default" width breakpoint is reserved for internal use by Panache'
      );
    });

    describe('### Returned function', () => {
      const mq = createMqFunc();

      it('return unwrapped style object when options object is undefined', () => {
        expect(mq(undefined, { color: 'red', })).toEqual({ color: 'red', });
      });

      it('Return a min-width media-query', () => {
        expect(mq({ from: 's', }, { color: 'red', })).toEqual({
          '@media (min-width: 37.5em)': { color: 'red', },
        });
      });
      it('Return a min-width media-query with pseudo-element', () => {
        expect(
          mq({ from: 's', }, { color: 'red', ':after': { padding: '5px', }, })
        ).toEqual({
          '@media (min-width: 37.5em)': {
            color: 'red',
            ':after': { padding: '5px', },
          },
        });
      });
      it('Return a typed min-width media-query', () => {
        expect(mq({ from: '320px', type: 'screen', }, { color: 'red', })).toEqual(
          { '@media screen and (min-width: 20em)': { color: 'red', }, }
        );
      });
      it('Return a max-width media-query', () => {
        expect(mq({ until: 's', }, { color: 'red', })).toEqual({
          '@media (max-width: 37.4375em)': { color: 'red', },
        });
      });
      it('Return a typed max-width media-query', () => {
        expect(
          mq({ until: '320px', type: 'screen', }, { color: 'red', })
        ).toEqual({
          '@media screen and (max-width: 19.9375em)': { color: 'red', },
        });
      });
      it('Return a misc media-query from a named misc breakpoint', () => {
        expect(mq({ misc: 'hidpi', }, { color: 'red', })).toEqual({
          '@media (min-resolution: 1.5dppx)': { color: 'red', },
        });
      });
      it('Return a non-named misc media-query', () => {
        expect(
          mq({ misc: '(orientation: landscape)', }, { color: 'red', })
        ).toEqual({ '@media (orientation: landscape)': { color: 'red', }, });
      });
      it('Return a typed misc media-query', () => {
        expect(
          mq(
            { misc: '(orientation: landscape)', type: 'screen', },
            { color: 'red', }
          )
        ).toEqual({
          '@media screen and (orientation: landscape)': { color: 'red', },
        });
      });
      it('Return a min-width and max-width media-query', () => {
        expect(mq({ from: 's', until: 'm', }, { color: 'red', })).toEqual({
          '@media (min-width: 37.5em) and (max-width: 47.9375em)': {
            color: 'red',
          },
        });
      });
      it('Return a typed min-width and max-width media-query', () => {
        expect(
          mq(
            { from: '320px', until: '640px', type: 'screen', },
            { color: 'red', }
          )
        ).toEqual({
          '@media screen and (min-width: 20em) and (max-width: 39.9375em)': {
            color: 'red',
          },
        });
      });
      it('Return a min-width and misc media-query', () => {
        expect(
          mq({ from: 's', misc: '(orientation: landscape)', }, { color: 'red', })
        ).toEqual({
          '@media (min-width: 37.5em) and (orientation: landscape)': {
            color: 'red',
          },
        });
      });
      it('Return a typed min-width and misc media-query', () => {
        expect(
          mq(
            {
              from: '320px',
              misc: '(orientation: landscape)',
              type: 'screen',
            },
            { color: 'red', }
          )
        ).toEqual({
          '@media screen and (min-width: 20em) and (orientation: landscape)': {
            color: 'red',
          },
        });
      });
      it('Return a max-width and misc media-queryt', () => {
        expect(
          mq(
            { until: 's', misc: '(orientation: landscape)', },
            { color: 'green', }
          )
        ).toEqual({
          '@media (max-width: 37.4375em) and (orientation: landscape)': {
            color: 'green',
          },
        });
      });
      it('Return a typed max-width and misc media-query', () => {
        expect(
          mq(
            {
              until: '320px',
              misc: '(orientation: landscape)',
              type: 'screen',
            },
            { color: '#222', }
          )
        ).toEqual({
          '@media screen and (max-width: 19.9375em) and (orientation: landscape)': {
            color: '#222',
          },
        });
      });
      it('Return a min-width, max-width and misc media-query', () => {
        expect(
          mq(
            { from: 's', until: 'm', misc: '(orientation: landscape)', },
            { left: 0, }
          )
        ).toEqual({
          '@media (min-width: 37.5em) and (max-width: 47.9375em) and (orientation: landscape)': {
            left: 0,
          },
        });
      });
      it('Return a typed max-width and misc media-query', () => {
        expect(
          mq(
            {
              from: '320px',
              until: '640px',
              misc: '(orientation: landscape)',
              type: 'screen',
            },
            { right: 0, }
          )
        ).toEqual({
          '@media screen and (min-width: 20em) and (max-width: 39.9375em) and (orientation: landscape)': {
            right: 0,
          },
        });
      });
      it('Ignores the redundent "all" media type', () => {
        expect(mq({ from: '30rem', type: 'all', }, { left: 0, })).toEqual({
          '@media (min-width: 30rem)': { left: 0, },
        });
      });
    });
  });
});
