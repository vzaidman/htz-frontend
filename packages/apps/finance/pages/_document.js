import { createDocument, } from '@haaretz/htz-components';
import { tmTheme, cssReset, fontStacks, } from '@haaretz/tm-theme';
import { StyleProvider, } from '@haaretz/fela-utils';
import styleRenderer from '../components/styleRenderer/styleRenderer';

// console.log('[_document] fontStacks: ', JSON.stringify(fontStacks));

const HaaretzDocument = createDocument({
  styleRenderer,
  FelaProvider: StyleProvider,
  theme: tmTheme,
  fontStacks,
  staticRules: [ cssReset, ],
  isRtl: true,
});
export default HaaretzDocument;
