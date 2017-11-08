import { createDocument, } from '@haaretz/htz-components';
import { cssReset, } from '@haaretz/htz-theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

// TODO: replace this with a more preformant font loading method,
// probably critical FOFT with DATA URI
// (https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft-data-uri)
// maybe also using the eBay method
// (http://www.ebaytechblog.com/2017/09/21/ebays-font-loading-strategy/)
// to only load a polyfill when the `CSS Font Loading API` is not supported.
styleRenderer.renderFont(
  '"Open Sans Hebrew"',
  [
    './static/fonts/OpenSansHebrewRegular.woff',
    './static/fonts/OpenSansHebrewRegular.woff2',
  ],
  { fontWeight: 400, }
);
styleRenderer.renderFont(
  '"Open Sans Hebrew"',
  [ './static/fonts/OpenSansHebrewBold.woff', './static/fonts/OpenSansHebrewBold.woff2', ],
  { fontWeight: 700, }
);

styleRenderer.renderStatic(cssReset);

const HaaretzDocument = createDocument(styleRenderer);
export default HaaretzDocument;
