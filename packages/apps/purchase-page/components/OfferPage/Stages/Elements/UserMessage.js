import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';

const propTypes = {
  userMessage: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  userMessage: null,
};

function UserMessage({ userMessage, }) {
  if (userMessage) {
    return (
      <FelaComponent
        style={theme => ({
          fontWeight: 'bold',
          marginTop: '1rem',
          extend: [ theme.type(1), ],
        })}
      >
        {userMessage.map(line => <p>{line}</p>)}
      </FelaComponent>
    );
  }
  return null;
}

UserMessage.propTypes = propTypes;
UserMessage.defaultProps = defaultProps;

export default UserMessage;
