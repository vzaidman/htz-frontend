import { createDocument, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import purchasePageTheme, { cssReset, fontStacks, } from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';


const PromotionDocument = createDocument({
  styleRenderer,
  lang: 'heb',
  FelaProvider: StyleProvider,
  theme: purchasePageTheme,
  fontStacks,
  staticRules: cssReset,
  isRtl: true,
  hasToggleableTheme: true,
});
export default PromotionDocument;
