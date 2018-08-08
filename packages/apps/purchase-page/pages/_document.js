import { createDocument, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import purchasePageTheme, { cssReset, fontStacks, } from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

// WOFF2 files must always precede other formats in the
// subset and variations arrays
const fonts = {
  'Open Sans Hebrew': {
    applyTo: [ 'body', ],
    subset: [
      [
        './static/fonts/subset/OpenSansHebrewRegularSubset.woff2',
        './static/fonts/subset/OpenSansHebrewRegularSubset.woff',
      ],
      {
        unicodeRange: 'U+05D0-U+05EA',
      },
    ],
    variations: [
      [
        [
          './static/fonts/OpenSansHebrewRegular.woff2',
          './static/fonts/OpenSansHebrewRegular.woff',
        ],
        {
          fontWeight: 400,
        },
      ],
      [
        [
          './static/fonts/OpenSansHebrewLight.woff2',
          './static/fonts/OpenSansHebrewLight.woff',
        ],
        {
          fontWeight: 300,
        },
      ],
      [
        [
          './static/fonts/OpenSansHebrewBold.woff2',
          './static/fonts/OpenSansHebrewBold.woff',
        ],
        {
          fontWeight: 700,
        },
      ],
    ],
  },
};

const PromotionDocument = createDocument({
  styleRenderer,
  FelaProvider: StyleProvider,
  theme: purchasePageTheme,
  fontRules: fonts,
  defaultFontStack: fontStacks.default,
  staticRules: cssReset,
  isRtl: true,
  lang: 'heb',
  hasToggleableTheme: true,
});
export default PromotionDocument;
