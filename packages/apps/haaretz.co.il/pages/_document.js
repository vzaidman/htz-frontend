import { createDocument, } from '@haaretz/htz-components';
import { htzTheme, cssReset, globalAds, fontStacks, } from '@haaretz/htz-theme';
import { StyleProvider, } from '@haaretz/fela-utils';
import styleRenderer from '../components/styleRenderer/styleRenderer';


const HaaretzDocument = createDocument({
  styleRenderer,
  fontStacks,
  FelaProvider: StyleProvider,
  theme: htzTheme,
  lang: 'heb',
  staticRules: [ cssReset, globalAds, ],
  isRtl: true,
});
export default HaaretzDocument;
