import React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, StyleProvider } from '../src';

const styleRenderer = createRenderer({ isRtl: true, });

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  return (
    <StyleProvider renderer={styleRenderer}>
      <div>
        {children}
      </div>
    </StyleProvider>
  );
}

StyleGuideProvider.propTypes = propTypes;
StyleGuideProvider.defaultProps = defaultProps;
