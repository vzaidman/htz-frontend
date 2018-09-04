import React from 'react';
import PropTypes from 'prop-types';

const flowDispenserPropTypes = {
  render: PropTypes.func.isRequired,
  isUser: PropTypes.bool.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
  isPhoneValid: PropTypes.bool.isRequired,
  isPhoneConnectedWithEmail: PropTypes.bool.isRequired,
  isPremiumUser: PropTypes.bool.isRequired,
};

const FlowDispenser = ({
  render,
  isUser,
  isEmailValid,
  isPhoneValid,
  isPhoneConnectedWithEmail,
  isPremiumUser,
}) => {
  const dataToFlowMapper = new Map([
    [ '11110', 1, ], // all connected, not paying
    [ '11111', 1, ], // all connected, paying
    [ '11000', 2, ], // mail valid, phone not valid, not paying.
    [ '11001', 2, ], // mail valid, phone not valid, paying.
    [ '10000', 3, ], // mail not valid, phone not valid, not paying.
    [ '00000', 4, ], // user doesn't exist
    [ '10001', 5, ], // mail not valid, phone not valid, paying.
    [ '10101', 6, ], // mail not valid, phone valid, paying.
  ]);

  const generateDataString = () => [
    isUser ? 1 : 0,
    isEmailValid ? 1 : 0,
    isPhoneValid ? 1 : 0,
    isPhoneConnectedWithEmail ? 1 : 0,
    isPremiumUser ? 1 : 0,
  ].join('');

  const resolveFlowNumber = () => dataToFlowMapper(generateDataString());

  const getFlow = () => {
    const flowNumber = resolveFlowNumber();

  };

  return render({ getFlow, });
};

FlowDispenser.propTypes = flowDispenserPropTypes;
FlowDispenser.defaultProps = {};

export default FlowDispenser;
