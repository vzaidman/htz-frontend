const fallbackFont = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const fontStacks = Object.freeze({
  // FOFT font loading strategy - https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft
  // when loaded the critical font will be applied to the 'applyToSelector' with the base font as fallback
  criticalFont: {
    // WOFF2 files must always precede other formats in the subset and variations arrays
    name: '"Open Sans Hebrew"',
    applyToSelector: 'body',
    subset: {
      files: [
        '/static/fonts/subset/OpenSansHebrewRegularSubset.woff2',
        '/static/fonts/subset/OpenSansHebrewRegularSubset.woff',
      ],
      properties: {
        unicodeRange: 'U+05D0-U+05EA',
      },
    },
    variations: [
      {
        files: [
          '/static/fonts/OpenSansHebrewRegular.woff2',
          '/static/fonts/OpenSansHebrewRegular.woff',
        ],
        properties: {
          fontWeight: 400,
          fontDisplay: 'swap',
        },
      },
      {
        files: [
          '/static/fonts/OpenSansHebrewBold.woff2',
          '/static/fonts/OpenSansHebrewBold.woff',
        ],
        properties: {
          fontWeight: 700,
          fontDisplay: 'swap',
        },
      },
    ],
  },
  base: fallbackFont,
  alt: fallbackFont,
});

// TODO: test data structure
export default fontStacks;
