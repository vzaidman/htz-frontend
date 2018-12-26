import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const PaywallBottomContainer = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      zIndex: theme.getZIndex('modal', -1),
      width: '100vw',
      position: 'fixed',
      bottom: 0,
      backgroundImage: 'linear-gradient(93deg, #169fd1, #105676)',
      boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)',
      display: 'flex',
      ...theme.mq({ until: 'm', }, {
        height: '25rem',
        flexDirection: 'row-reverse',
      }),
      ...theme.mq({ from: 'm', }, {
        height: '21rem',
        flexDirection: 'row',
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
};

PaywallBottomContainer.defaultProps = {
  children: null,
};

export default PaywallBottomContainer;
