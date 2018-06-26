import { buildFontPreloadLink, } from '../buildFontPreloadLink';

describe('buildFontPreloadLink()', () => {
  describe('single font-family', () => {
    const fonts = {
      fontNameA: {
        applyTo: [ 'body', ],
        subset: [
          [
            './static/fonts/OpenSansHebrewSubset.woff2',
            './static/fonts/OpenSansHebrewSubset.woff',
          ],
          { unicodeRange: 'U+05D0-U+05EA', },
        ],
        variations: [
          [
            [
              './static/fonts/OpenSansHebrewRegular.woff2',
              './static/fonts/OpenSansHebrewRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [
              './static/fonts/OpenSansHebrewBold.woff2',
              './static/fonts/OpenSansHebrewBold.woff',
            ],
            { fontWeight: 700, },
          ],
        ],
      },
    };

    const result = buildFontPreloadLink(fonts);
    it('return single "<Link>" element for each font-family', () => {
      expect(result.length).toBe(1);
    });
    it('use the subset variation', () => {
      const woff2href = fonts.fontNameA.subset[0][0];
      expect(result[0].props.href).toBe(woff2href);
    });
  });

  describe('multiple font-family', () => {
    const fonts = {
      fontNameA: {
        applyTo: [ 'body', ],
        subset: [
          [
            './static/fonts/OpenSansHebrewSubset.woff2',
            './static/fonts/OpenSansHebrewSubset.woff',
          ],
          { unicodeRange: 'U+05D0-U+05EA', },
        ],
        variations: [
          [
            [
              './static/fonts/OpenSansHebrewRegular.woff2',
              './static/fonts/OpenSansHebrewRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [
              './static/fonts/OpenSansHebrewBold.woff2',
              './static/fonts/OpenSansHebrewBold.woff',
            ],
            { fontWeight: 700, },
          ],
        ],
      },
      fontNameB: {
        applyTo: [ 'body', ],
        subset: [
          [ './static/fonts/aaaSubset.woff2', './static/fonts/aaaSubset.woff', ],
          { unicodeRange: 'U+05D0-U+05EA', },
        ],
        variations: [
          [
            [
              './static/fonts/aaaRegular.woff2',
              './static/fonts/aaaRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [ './static/fonts/aaaBold.woff2', './static/fonts/aaaBold.woff', ],
            { fontWeight: 700, },
          ],
        ],
      },
      fontNameC: {
        applyTo: [ 'body', ],
        variations: [
          [
            [
              './static/fonts/aaaRegular.woff2',
              './static/fonts/aaaRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [ './static/fonts/aaaBold.woff2', './static/fonts/aaaBold.woff', ],
            { fontWeight: 700, },
          ],
        ],
      },
    };

    const result = buildFontPreloadLink(fonts);
    it('return a "<link>" element for each font-family with a subset font', () => {
      expect(result.length).toBe(2);
    });
    it('use the correct subset variation for each item', () => {
      [ fonts.fontNameA.subset[0][0], fonts.fontNameB.subset[0][0], ].forEach(
        (woff2href, i) => expect(result[i].props.href).toBe(woff2href)
      );
    });
  });
});
