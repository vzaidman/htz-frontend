import PropTypes from 'prop-types';
import generalFlows from './generalFlows';
import flows from './flows';

const flowDispenserPropTypes = { render: PropTypes.func.isRequired, };

const FlowDispenser = ({ render, }) => {
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

  const generateDataString = ({
    isUserExist,
    isEmailValid,
    isPhoneValid,
    isPhoneConnectedWithEmail,
    isPremiumUser,
  }) => [
    isUserExist ? 1 : 0,
    isEmailValid ? 1 : 0,
    isPhoneValid ? 1 : 0,
    isPhoneConnectedWithEmail ? 1 : 0,
    isPremiumUser ? 1 : 0,
  ].join('');

  const resolveFlowNumber = data => {
    const dataString = generateDataString(data);
    console.log(dataString);
    return dataToFlowMapper.get(dataString);
  };

  const getFlow = data => {
    const selectedFlow = flows[resolveFlowNumber(data)];
    console.log(`flow number: ${resolveFlowNumber(data)}`);
    const generalTransitionRouteMap = generalFlows.transitionRouteMap;
    const specificTransitionRouteMap = selectedFlow.transitionRouteMap;
    const fullFlow = { ...generalFlows, ...selectedFlow, };
    console.log(`combined map: ${JSON.stringify(Array.from(new Map([ ...generalTransitionRouteMap, ...specificTransitionRouteMap, ])))}`);
    return Object.assign(
      {},
      fullFlow,
      {
        transitionRouteMap:
          new Map([ ...generalTransitionRouteMap, ...specificTransitionRouteMap, ]),
      });
  };

  return render({ getFlow, });
};

FlowDispenser.propTypes = flowDispenserPropTypes;
FlowDispenser.defaultProps = {};

export default FlowDispenser;
