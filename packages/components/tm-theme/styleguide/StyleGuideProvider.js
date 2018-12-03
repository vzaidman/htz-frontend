import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createRenderer, StyleProvider } from '@haaretz/fela-utils';

import cssReset from '../src/consts/cssReset';

const styleRenderer = createRenderer({ isRtl: true });

const globalRules = `
${cssReset}
/* Hide component names and pathline */
h2[id],
[class*="rsg--pathline-"],
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

export default function StyleGuideProvider({ children }) {
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewRegular.woff',
      '../src/fonts/OpenSansHebrewRegular.woff2',
    ],
    { fontWeight: 400 }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewBold.woff',
      '../src/fonts/OpenSansHebrewBold.woff2',
    ],
    { fontWeight: 700 }
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
