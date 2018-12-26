import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const PaywallTopContainer = ({ children, }) => (
  <FelaComponent
    style={{
      backgroundImage: 'linear-gradient(97deg, #fde9a5, #fff4e9)',
      width: '100%',
      height: '133px',
      display: 'flex',
    }}
  >
    {children}
  </FelaComponent>
);

PaywallTopContainer.propTypes = {
  children: PropTypes.node,
};

PaywallTopContainer.defaultProps = {
  children: null,
};

export default PaywallTopContainer;
