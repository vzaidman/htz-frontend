import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const closeButtonStyle = theme => ({
  height: '100%',
  display: 'block',
  position: 'relative',
  ':after': {
    content: '""',
    position: 'absolute',
    height: '2px',
    width: '100%',
    top: '50%',
    end: 0,
    backgroundColor: theme.color('loginOrRegister', 'inFormText'),
    transform: 'rotate(45deg)',
  },
  ':before': {
    content: '""',
    position: 'absolute',
    height: '2px',
    width: '100%',
    top: '50%',
    end: 0,
    backgroundColor: theme.color('loginOrRegister', 'inFormText'),
    transform: 'rotate(-45deg)',
  },
});

const propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const defaultProps = {};

function CloseModalButton({ handleClose, }) {
  return (
    <FelaComponent
      style={{ height: '2rem', width: '2rem', }}
      render={({ className, }) => (
        <button className={className} onClick={() => handleClose()}>
          <FelaComponent style={closeButtonStyle} render="span" />
        </button>
      )}
    />
  );
}

CloseModalButton.propTypes = propTypes;
CloseModalButton.defaultProps = defaultProps;

export default CloseModalButton;
