import React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, StyleProvider, } from '@haaretz/htz-components';

import mq from '../src/mq';
import typesetter, { typeConf, } from '../src/typesetter.js';

const styleRenderer = createRenderer({ isRtl: true, });

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

// Set baseline
const htmlRules = [
  mq(
    { until: 'xl', },
    {
      fontSize: `${typeConf.default.rhythmUnit}px`,
    }
  ),
  mq(
    { form: 'xl', },
    {
      fontSize: `${typeConf.xl.rhythmUnit}px`,
    }
  ),
];

// Set base typography
const bodyRules = [ typesetter('0'), ];

const no = 'ds';

const globalRules = `
html { font-family: "Open Sans Hebrew", arial; }
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
}`;

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

  htmlRules.forEach(ruleSet => {
    styleRenderer.renderStatic(ruleSet, 'html');
  });
  bodyRules.forEach(ruleSet => {
    styleRenderer.renderStatic(ruleSet, 'body');
  });

  styleRenderer.renderStatic(globalRules);

  return (
    <StyleProvider renderer={styleRenderer}>
      <div>{children}</div>
    </StyleProvider>
  );
}

StyleGuideProvider.propTypes = propTypes;
StyleGuideProvider.defaultProps = defaultProps;
