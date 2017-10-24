import React from 'react';
import PropTypes from 'prop-types';
import htzTheme from '@haaretz/htz-theme'; // eslint-disable-line import/no-extraneous-dependencies
import { createRenderer, StyleProvider, } from '../src';

const styleRenderer = createRenderer({ isRtl: true, });

StyleGuideProvider.propTypes = {
  children: PropTypes.node,
};

StyleGuideProvider.defaultProps = {
  children: null,
};

const globalRules = `
html{color:${htzTheme.color('bodyText')};font-family:${htzTheme.fontStacks
  .default};}
${htzTheme.typographicBaseline}
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
  color: ${htzTheme.color('bodyText')};
}
/* Hide component names */
h2[id],
[class*="rsg--isChild"] {
  display: none;
}
`.trim();

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
    <StyleProvider renderer={styleRenderer} theme={htzTheme}>
      <div>{children}</div>
    </StyleProvider>
  );
}
