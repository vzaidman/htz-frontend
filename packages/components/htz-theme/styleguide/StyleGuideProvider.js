import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { createRenderer, StyleProvider, } from '@haaretz/htz-components';

import getColor from '../src/colors.js';
import mq, { bps, } from '../src/mq';
import typesetter, { typeConf, } from '../src/typesetter.js';

/* *********************************** *
 *  This is the default styleRenderer. *
 *  Please consider tweaking it and    *
 *  remove the Error blow.             *
 * *********************************** */
const styleRenderer = createRenderer({ isRtl: true, });
// throw new Error(
//   `You are currently using the default styleRenderer.
// Please consider tweaking it to your needs in "StyleGuideProvider.js"
// and make sure to remove this error in the same file.`
// );

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

const openSansHeb = () => ({
  fontFace: {
    fontFamily: '"Open Sans Hebrew"',
    fontWeight: 400,
    src: [
      '../src/fonts/OpenSansHebrewRegular.woff',
      '../src/fonts/OpenSansHebrewRegular.woff2',
      // '../src/fonts/OpenSansHebrewBold.woff',
      // '../src/fonts/OpenSansHebrewBold.woff2',
    ],
  },
});
const openSansHebBold = () => ({
  fontFace: {
    fontFamily: '"Open Sans Hebrew"',
    fontWeight: 700,
    src: [
      '../src/fonts/OpenSansHebrewBold.woff',
      '../src/fonts/OpenSansHebrewBold.woff2',
    ],
  },
});

const bodyFz = typeConf.default.base / typeConf.default.rhythmUnit;
const bodyPxFz = typeConf.default.rhythmUnit * 4;
const bodyLh = bodyPxFz / typeConf.default.base;
const bodyFzXL = typeConf.xl.base / typeConf.xl.rhythmUnit;
const bodyPxFzXL = typeConf.xl.rhythmUnit * 4;
const bodyLhXL = bodyPxFzXL / typeConf.xl.base;

const globalStyles = `html {
  font-family: "Open Sans Hebrew", arial;
  font-size: ${typeConf.default.rhythmUnit}px;
}

body {
  font-size: ${bodyFz}rem;
  line-height: ${bodyLh}em;
}

[class^="rsg--preview"] { border: none; border-bottom: 1px solid #e8e8e8; padding: 0; }

@media (min-width: ${bps.widths.xl / 16}em) {
  html {
    font-size: ${typeConf.xl.rhythmUnit}px;
  }

  body {
    font-size: ${bodyFzXL}rem;
    line-height: ${bodyLhXL}em;
}`;

const BoldProvider = createComponent(openSansHebBold);
const FontProvider = createComponent(openSansHeb, BoldProvider);

export default function StyleGuideProvider({ children, }) {
  // styleRenderer.renderStatic(htmlXLStyle, 'html');
  // styleRenderer.renderStatic(bodyStyle, 'body');
  styleRenderer.renderStatic(globalStyles);
  return (
    <StyleProvider renderer={styleRenderer}>
      <FontProvider>
        <div>{children}</div>
      </FontProvider>
    </StyleProvider>
  );
}

StyleGuideProvider.propTypes = propTypes;
StyleGuideProvider.defaultProps = defaultProps;
