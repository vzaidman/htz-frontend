import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const propTypes = {
  message: PropTypes.string.isRequired,
  'aria-live': PropTypes.string.isRequired,
};

function MessageBlock({ message, 'aria-live': ariaLive, }) {
  return (
    <FelaComponent
      style={{
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        width: '1px',
        position: 'absolute',
      }}
      render={({ className, }) => (
        <div
          className={className}
          role="log"
          aria-live={ariaLive}
          aria-relevant="additions"
          aria-atomic="true"
        >
          {message || ''}
        </div>
      )}
    />
  );
}

MessageBlock.propTypes = propTypes;

export default MessageBlock;
