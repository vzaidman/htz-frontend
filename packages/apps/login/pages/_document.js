import { createDocument, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import loginTheme, { cssReset, fontStacks, } from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';


const loginDocument = createDocument({
  styleRenderer,
  FelaProvider: StyleProvider,
  theme: loginTheme,
  // fontRules: fonts,
  fontStacks,
  staticRules: cssReset,
  isRtl: true,
  lang: 'heb',
  hasToggleableTheme: true,
});
export default loginDocument;
