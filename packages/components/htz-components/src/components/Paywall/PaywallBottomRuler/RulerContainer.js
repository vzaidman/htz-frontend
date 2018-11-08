import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const RulerContainer = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      zIndex: theme.getZIndex('modal', -1),
      height: '25rem',
      width: '100vw',
      position: 'fixed',
      bottom: 0,
      backgroundImage: 'linear-gradient(93deg, #169fd1, #105676)',
      boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)',
      display: 'flex',
      ...theme.mq({ until: 'm', }, {
        flexDirection: 'row-reverse',
      }),
      ...theme.mq({ from: 'm', }, {
        flexDirection: 'row',
      }),
    })}
    render={
      ({ className, }) => (
        <div className={className} >
          {children}
        </div>
      )
    }
  />
);

RulerContainer.propTypes = {
  children: PropTypes.node,
};

RulerContainer.defaultProps = {
  children: null,
};

export default RulerContainer;
