import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/htz-components';
import htzTheme from '@haaretz/htz-theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

StyleGuideProvider.propTypes = {
  children: PropTypes.node,
};
StyleGuideProvider.defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  return (
    <StyleProvider renderer={styleRenderer} theme={htzTheme}>
      <div>{children}</div>
    </StyleProvider>
  );
}
