import { buildFontFamilyArray, } from '../buildFontFamilyArray';

describe('buildFontFamilyArray()', () => {
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

    const result = buildFontFamilyArray(fonts);

    it('return single array for each font variation', () => {
      expect(result.length).toBe(3);
    });
    it('add "subset" to font-family of subset variant', () => {
      const subsetItem = result[0];
      const subsetFamilyName = subsetItem[0];
      const originalFamilyName = Object.keys(fonts)[0];
      expect(subsetFamilyName).toBe(`${originalFamilyName}Subset`);
    });
    it('do not add "subset" to font-family of non-subset variants', () => {
      // eslint-disable-next-line no-unused-vars
      const [ subsetItem, ...nonSubsetItems ] = result;
      const originalFamilyName = Object.keys(fonts)[0];

      nonSubsetItems.forEach((item, i) => {
        const itemFamilyName = item[0];
        expect(itemFamilyName).toBe(originalFamilyName);
      });
    });
    it('don\'t add "fontDisplay: swap" to fontOptions object of subset variant', () => {
      const subsetItem = result[0];
      const subsetFontOptions = Object.keys(subsetItem[2]);
      expect(subsetFontOptions.includes('fontDisplay')).toBe(false);
    });
    it('add "fontDisplay: swap" to fontOptions object of non-subset variants', () => {
      // eslint-disable-next-line no-unused-vars
      const [ subsetItem, ...nonSubsetItems ] = result;

      nonSubsetItems.forEach((item, i) => {
        const itemFontOptions = Object.keys(item[2]);
        expect(itemFontOptions.includes('fontDisplay')).toBe(true);
      });
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
      noSubsetFont: {
        applyTo: [ 'body', ],
        variations: [
          [
            [
              './static/fonts/bbbRegular.woff2',
              './static/fonts/bbbRegular.woff',
            ],
            { fontWeight: 400, },
          ],
          [
            [ './static/fonts/bbbBold.woff2', './static/fonts/bbbBold.woff', ],
            { fontWeight: 700, },
          ],
        ],
      },
    };

    const result = buildFontFamilyArray(fonts);

    it('return single array for each font variation', () => {
      expect(result.length).toBe(8);
    });
    it('do not add "Subset" to family name of first variation when there is no subset font', () => {
      // The last font-family has no subset defined and two variations,
      // so its first element, twice removed from the end of the `results`
      // array is the one that can be confused with subset
      const hasNoSubsetFamilyName = result[result.length - 2][0];
      expect(hasNoSubsetFamilyName.endsWith('Subset')).toBe(false);
    });
    it('add "fontDisplay" to "fontOptions" object of first variation when there is no subset font', () => {
      // The last font-family has no subset defined and two variations,
      // so its first element, twice removed from the end of the `results`
      // array is the one that can be confused with subset
      const hasNoSubsetFontOptionsKeys = Object.keys(
        result[result.length - 2][2]
      );
      expect(hasNoSubsetFontOptionsKeys.includes('fontDisplay')).toBe(true);
    });
  });
});
