import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const PaywallBottomContainer = ({ colorScheme, children, }) => (
  <FelaComponent
    style={theme => ({
      zIndex: theme.getZIndex('modal', -1),
      width: '100vw',
      position: 'fixed',
      bottom: 0,
      boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)',
      display: 'flex',
      ...theme.mq({ until: 'm', }, {
        height: '25rem',
        flexDirection: 'row-reverse',
        backgroundImage: colorScheme !== 'secondary' // primary is default
          ? 'linear-gradient(to right, #97ebe9, #f2fadf)'
          : 'linear-gradient(97deg, #fde9a5, #fff4e9)',
      }),
      ...theme.mq({ from: 'm', }, {
        height: '21rem',
        flexDirection: 'row',
        backgroundImage: colorScheme !== 'secondary' // primary is default
          ? 'linear-gradient(93deg, #169fd1, #105676)'
          : 'linear-gradient(to right, #f4d835, #fff169)',
      }),
    })}
    render={
      ({ className, }) => (
        <div className={className}>
          {children}
        </div>
      )
    }
  />
);

PaywallBottomContainer.propTypes = {
  children: PropTypes.node,
  colorScheme: PropTypes.string.isRequired,
};

PaywallBottomContainer.defaultProps = {
  children: null,
};

export default PaywallBottomContainer;
