import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/htz-components';
import htzTheme, { cssReset, } from '@haaretz/htz-theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

StyleGuideProvider.propTypes = {
  children: PropTypes.node,
};
StyleGuideProvider.defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
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

  return (
    <StyleProvider renderer={styleRenderer} theme={htzTheme}>
      <div>{children}</div>
    </StyleProvider>
  );
}
