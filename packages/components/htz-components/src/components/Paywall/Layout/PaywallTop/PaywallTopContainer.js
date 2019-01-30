import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const PaywallTopContainer = ({ colorScheme, children, }) => (
  <FelaComponent
    style={{
      backgroundImage: colorScheme !== 'secondary' // primary is default
        ? 'linear-gradient(to right, #97ebe9, #f2fadf)'
        : 'linear-gradient(97deg, #fde9a5, #fff4e9)',
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
  colorScheme: PropTypes.string.isRequired,
};

PaywallTopContainer.defaultProps = {
  children: null,
};

export default PaywallTopContainer;
