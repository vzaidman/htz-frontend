import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import htzTheme, { cssReset, } from '@haaretz/htz-theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [ '../static/fonts/OpenSansHebrewLight.ttf', ],
    {
      fontWeight: 300,
    }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../static/fonts/OpenSansHebrewRegular.woff',
      '../static/fonts/OpenSansHebrewRegular.woff2',
    ],
    { fontWeight: 400, }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../static/fonts/OpenSansHebrewBold.woff',
      '../static/fonts/OpenSansHebrewBold.woff2',
    ],
    { fontWeight: 700, }
  );

  styleRenderer.renderStatic(cssReset);

  return (
    <StyleProvider renderer={styleRenderer} theme={htzTheme}>
      <div>{children}</div>
    </StyleProvider>
  );
}

StyleGuideProvider.propTypes = propTypes;
StyleGuideProvider.defaultProps = defaultProps;
