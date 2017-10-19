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

export default function StyleGuideProvider({ children, }) {
  return (
    <StyleProvider renderer={styleRenderer} theme={htzTheme}>
      <div>{children}</div>
    </StyleProvider>
  );
}
