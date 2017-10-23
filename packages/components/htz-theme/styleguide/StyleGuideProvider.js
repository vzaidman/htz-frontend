import React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, StyleProvider, } from '@haaretz/htz-components';

// import bps from '../src/consts/bps';
// import typeConf from '../src/consts/typeConf';
import typographicBaseline from '../src/consts/typographicBaseline';
// import mq from '../src/methods/mq';
// import typesetter from '../src/methods/typesetter';

const styleRenderer = createRenderer({ isRtl: true, });

const globalRules = `
html { font-family: "Open Sans Hebrew", arial; }
${typographicBaseline}
/* Make component views resizeable */
[class^="rsg--content-"] { max-width: none; }
[class^="rsg--controls-"] {
  max-width: 1000px;
  margin: 0 auto;
}
[class^="rsg--preview-"] {
  /* Make component views resizeable */
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  resize: horizontal;
  width: 1000px;

  /* Make styling less obtrusive */
  border: none;
  border-bottom: 1px solid #e8e8e8;
  padding: 0;
}
/* Hide component names */
h2[id],
[class*="rsg--isChild"] {
  display: none;
}
`.trim();

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewRegular.woff',
      '../src/fonts/OpenSansHebrewRegular.woff2',
    ],
    { fontWeight: 400, }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewBold.woff',
      '../src/fonts/OpenSansHebrewBold.woff2',
    ],
    { fontWeight: 700, }
  );

  styleRenderer.renderStatic(globalRules);

  return (
    <StyleProvider renderer={styleRenderer}>
      <div>{children}</div>
    </StyleProvider>
  );
}

StyleGuideProvider.propTypes = propTypes;
StyleGuideProvider.defaultProps = defaultProps;
