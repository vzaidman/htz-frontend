import { createDocument, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import purchasePageTheme, { cssReset, } from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

// TODO: replace this with a more preformant font loading method,
// probably critical FOFT with DATA URI
// (https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft-data-uri)
// maybe also using the eBay method
// (http://www.ebaytechblog.com/2017/09/21/ebays-font-loading-strategy/)
// to only load a polyfill when the `CSS Font Loading API` is not supported.
const fonts = [
  [
    '"Open Sans Hebrew"',
    [ './static/fonts/OpenSansHebrewLight.ttf', ],
    { fontWeight: 300, },
  ],
  [
    '"Open Sans Hebrew"',
    [
      './static/fonts/OpenSansHebrewRegular.woff2',
      './static/fonts/OpenSansHebrewRegular.woff',
    ],
    { fontWeight: 400, },
  ],
  [
    '"Open Sans Hebrew"',
    [
      './static/fonts/OpenSansHebrewBold.woff2',
      './static/fonts/OpenSansHebrewBold.woff',
    ],
    { fontWeight: 700, },
  ],
];

const PromotionDocument = createDocument({
  styleRenderer,
  FelaProvider: StyleProvider,
  theme: purchasePageTheme,
  fontRules: fonts,
  staticRules: cssReset,
  isRtl: true,
  hasToggleableTheme: true,
});
export default PromotionDocument;
