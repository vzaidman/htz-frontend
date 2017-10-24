import React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, StyleProvider, } from '@haaretz/htz-components';

import fontStacks from '../src/consts/fontStacks';
import typographicBaseline from '../src/consts/typographicBaseline';
import getColor from '../src/methods/getColor';

const styleRenderer = createRenderer({ isRtl: true, });

const globalRules = `
html {color:${getColor('bodyText')};font-family:${fontStacks.default};}
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

  /* Make styleguide syles less obtrusive */
  border: none;
  border-bottom: 1px solid #e8e8e8;
  padding: 0;
  color: ${getColor('bodyText')};
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
