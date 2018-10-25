import PropTypes from 'prop-types';
import generalFlows from './generalFlows';
import flows from './flows';

const flowDispenserPropTypes = { render: PropTypes.func.isRequired, };

// TODO: assign all options to correct flow
export const dataToFlowMapper = new Map([
  [ '11110', 1, ], // all connected, not paying
  [ '11111', 1, ], // all connected, paying
  [ '11000', 2, ], // mail valid, phone not valid, not paying.
  [ '11001', 2, ], // mail valid, phone not valid, paying.
  [ '10000', 3, ], // mail not valid, phone not valid, not paying.
  [ '00000', 4, ], // user doesn't exist
  [ '10001', 5, ], // mail not valid, phone not valid, paying.
  [ '10101', 6, ], // mail not valid, phone valid, paying.
]);

const boolToNum = bool => Number(bool);
const argsObjToArr = ({
  isUserExist,
  isEmailValid,
  isPhoneValid,
  isPhoneConnectedWithEmail,
  isPremiumUser,
}) => [
  isUserExist,
  isEmailValid,
  isPhoneValid,
  isPhoneConnectedWithEmail,
  isPremiumUser,
];

const generateDataString = characteristics => characteristics
  .map(boolToNum)
  .join('');

const resolveFlowNumber = data => {
  const characteristicsArray = argsObjToArr(data);
  const dataString = generateDataString(characteristicsArray);
  console.log(dataString);
  return dataToFlowMapper.get(dataString);
};

const generateFullFlow = specificFlow => {
  const generalTransitionRouteMap = generalFlows.transitionRouteMap;
  const specificTransitionRouteMap = specificFlow.transitionRouteMap;
  //console.log(`combined map: ${JSON.stringify(Array.from(new Map([ ...generalTransitionRouteMap, ...specificTransitionRouteMap, ])))}`);
  const fullFlow = { ...generalFlows, ...specificFlow, };
  return Object.assign(
    {},
    fullFlow,
    {
      transitionRouteMap:
        new Map([ ...generalTransitionRouteMap, ...specificTransitionRouteMap, ]),
    });
};

export const getFlowByData = data => {
  const selectedFlow = flows[resolveFlowNumber(data) - 1];
  console.log(`flow number: ${resolveFlowNumber(data)}`);
  return generateFullFlow(selectedFlow);
};

export const getFlowByFlowNumber = flowNumber => {
  const selectedFlow = flows[flowNumber - 1];
  return generateFullFlow(selectedFlow);
};

const FlowDispenser = ({ render, }) => render({ getFlowByData, getFlowByFlowNumber, });

FlowDispenser.propTypes = flowDispenserPropTypes;
FlowDispenser.defaultProps = {};

export default FlowDispenser;
