import { createDocument, } from '@haaretz/htz-components';
import htzTheme from '@haaretz/htz-theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

const globalStyles = `
html{color:${htzTheme.color('bodyText')};font-family:${htzTheme.fontStacks
  .default};}
${htzTheme.typographicBaseline}
`.trim();

// TODO: replace this with a more preformant font loading method,
// probably critical FOFT with DATA URI
// (https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft-data-uri)
// maybe also using the eBay method
// (http://www.ebaytechblog.com/2017/09/21/ebays-font-loading-strategy/)
// to only load a polyfill when the `CSS Font Loading API` is not supported.
styleRenderer.renderFont(
  '"Open Sans Hebrew"',
  [
    '../fonts/OpenSansHebrewRegular.woff',
    '../fonts/OpenSansHebrewRegular.woff2',
  ],
  { fontWeight: 400, }
);
styleRenderer.renderFont(
  '"Open Sans Hebrew"',
  [ '../fonts/OpenSansHebrewBold.woff', '../fonts/OpenSansHebrewBold.woff2', ],
  { fontWeight: 700, }
);

styleRenderer.renderStatic(globalStyles);

const HaaretzDocument = createDocument(styleRenderer);
export default HaaretzDocument;
