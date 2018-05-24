import { buildFontCss, } from '../buildFontCss';

describe('multi font-family', () => {
  const fonts = {
    fontNameA: {
      applyTo: [ 'body', 'h1', ],
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
          [ './static/fonts/aaaRegular.woff2', './static/fonts/aaaRegular.woff', ],
          { fontWeight: 400, },
        ],
        [
          [ './static/fonts/aaaBold.woff2', './static/fonts/aaaBold.woff', ],
          { fontWeight: 700, },
        ],
      ],
    },
    noSubsetFont: {
      applyTo: [ 'h1', 'h2', ],
      variations: [
        [
          [ './static/fonts/bbbRegular.woff2', './static/fonts/bbbRegular.woff', ],
          { fontWeight: 400, },
        ],
        [
          [ './static/fonts/bbbBold.woff2', './static/fonts/bbbBold.woff', ],
          { fontWeight: 700, },
        ],
      ],
    },
  };

  const defaultStack = 'arial,sans-serif';
  const result = buildFontCss(fonts, defaultStack);

  it('return single string for all fonts variation', () => {
    expect(typeof result).toBe('string');
  });
  it('create a css selector for each font variant (incl. subset)', () => {
    const resultArray = result.split('}');
    resultArray.pop();

    const expectedNumberOfSelectors = Object.keys(fonts).reduce(
      (numOfSelectors, fontName) => {
        const { subset, } = fonts[fontName];
        return numOfSelectors + (subset ? 2 : 1);
      },
      0
    );

    expect(resultArray.length).toBe(expectedNumberOfSelectors);
  });
  it('add "applyTo" to selectors correctly', () => {
    const resultArray = result.split('}');
    resultArray.pop();

    let j = 0;
    Object.keys(fonts).forEach((fontName, i) => {
      const { applyTo, } = fonts[fontName];
      const subset = fonts[fontName].subset;
      const expectedNumOfSelectors = subset ? 2 : 1;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < expectedNumOfSelectors; i++) {
        // eslint-disable-next-line no-loop-func
        applyTo.forEach(selector => {
          expect(resultArray[j].includes(selector)).toBe(true);
        });
        // eslint-disable-next-line no-plusplus
        j++;
      }
    });
  });
  it('add defaultStack to "font-family" css value', () => {
    const resultArray = result.split('font-family:');
    resultArray.shift();
    const fontFamilies = resultArray.map(result => result.split(';')[0]);

    fontFamilies.forEach(family =>
      expect(family.includes(defaultStack)).toBe(true)
    );
  });
});
