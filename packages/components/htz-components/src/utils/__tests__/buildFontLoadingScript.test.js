import { buildFontLoadingScript, } from '../buildFontLoadingScript';

describe('buildFontLoadingScript()', () => {
  describe('single font-family', () => {
    const fonts = {
      fontNameA: {
        applyTo: [ 'body', ],
        subset: [
          [
            '/static/fonts/OpenSansHebrewSubset.woff2',
            '/static/fonts/OpenSansHebrewSubset.woff',
          ],
          { unicodeRange: 'U+05D0-U+05EA', },
        ],
        variations: [
          [
            [
              '/static/fonts/OpenSansHebrewRegular.woff2',
              '/static/fonts/OpenSansHebrewRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [
              '/static/fonts/OpenSansHebrewBold.woff2',
              '/static/fonts/OpenSansHebrewBold.woff',
            ],
            { fontWeight: 700, fontStyle: 'italic', },
          ],
        ],
      },
    };

    const result = buildFontLoadingScript(fonts);
    it('return single "function string" element', () => {
      expect(typeof result).toBe('string');
    });
  });

  describe('multi font-family', () => {
    const fonts = {
      fontNameA: {
        applyTo: [ 'body', ],
        subset: [
          [
            '/static/fonts/OpenSansHebrewSubset.woff2',
            '/static/fonts/OpenSansHebrewSubset.woff',
          ],
          { unicodeRange: 'U+05D0-U+05EA', },
        ],
        variations: [
          [
            [
              '/static/fonts/OpenSansHebrewRegular.woff2',
              '/static/fonts/OpenSansHebrewRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [
              '/static/fonts/OpenSansHebrewBold.woff2',
              '/static/fonts/OpenSansHebrewBold.woff',
            ],
            { fontWeight: 700, },
          ],
        ],
      },
      fontNameB: {
        applyTo: [ 'body', ],
        subset: [
          [ '/static/fonts/aaaSubset.woff2', '/static/fonts/aaaSubset.woff', ],
          { unicodeRange: 'U+05D0-U+05EA', },
        ],
        variations: [
          [
            [ '/static/fonts/aaaRegular.woff2', '/static/fonts/aaaRegular.woff', ],
            { fontWeight: 400, },
          ],
          [
            [ '/static/fonts/aaaBold.woff2', '/static/fonts/aaaBold.woff', ],
            { fontWeight: 700, },
          ],
        ],
      },
      fontNameC: {
        applyTo: [ 'body', ],
        variations: [
          [
            [ '/static/fonts/aaaRegular.woff2', '/static/fonts/aaaRegular.woff', ],
            { fontWeight: 400, },
          ],
          [
            [ '/static/fonts/aaaBold.woff2', '/static/fonts/aaaBold.woff', ],
            { fontWeight: 700, },
          ],
        ],
      },
    };

    const result = buildFontLoadingScript(fonts);
    it('return single "function string" element', () => {
      expect(typeof result).toBe('string');
    });
  });
});
