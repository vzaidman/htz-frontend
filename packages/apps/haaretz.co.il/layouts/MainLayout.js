import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/htz-components';
import StyleRenderer from '../components/styleRenderer/styleRenderer';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

export default function MainLayout({ children, }) {
  return (
    <StyleProvider renderer={StyleRenderer}>
      <div>
        {children}
      </div>
    </StyleProvider>
  );
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;
