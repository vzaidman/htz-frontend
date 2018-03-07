import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';

import IconClose from '../../Icon/icons/IconClose';

const propTypes = {
  /**
   * Nested children inside this component.
   */
  children: PropTypes.node.isRequired,
  /**
   * A method that should be executed for exiting full-screen mode.
   */
  closeCallBack: PropTypes.func.isRequired,
};

const containerStyle = ({ theme, }) => {
  const mq = createMqFunc();
  return ({
    alignItems: 'center',
    backgroundColor: theme.color('neutral'),
    display: 'flex',
    height: '100%',
    position: 'fixed',
    start: '0',
    top: '0',
    width: '100%',
    zIndex: '6',
    ...mq(
      { until: 'm', }, {
        flexDirection: 'column',
        justifyContent: 'center',
      }
    ),
    ...mq(
      { from: 'm', }, {
        justifyContent: 'flex-end',
      }
    ),
  });
};
const Container = createComponent(containerStyle, 'figure');

const closeWrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
  borderRadius: '50%',
  cursor: 'zoom-out',
  end: '1rem',
  height: '5rem',
  padding: '1rem',
  position: 'absolute',
  top: '1rem',
  width: '5rem',
  zIndex: '1',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
});

// eslint-disable-next-line react/prop-types
const CloseWrapperUnstyled = ({ theme, ...props }) => (
  <button {...props} aria-label={theme.zoomoutText}>
    <IconClose
      color={[ 'neutral', '-10', ]}
      size={2.5}
      miscStyles={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  </button>
);

const CloseWrapper = createComponent(
  closeWrapperStyle,
  withTheme(CloseWrapperUnstyled),
  props => Object.keys(props)
);


const FullScreenContainer = ({ closeCallBack, children, }) => (
  <Container>
    <CloseWrapper onClick={closeCallBack} />
    {children}
  </Container>
);

FullScreenContainer.propTypes = propTypes;

export default FullScreenContainer;
