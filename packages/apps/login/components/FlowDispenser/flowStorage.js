import GET_FLOW_NUMBER from '../../pages/queries/UserFlowNumber';

const storeFlowNumber = apolloClient => flowNumber => {
  apolloClient.writeData({ data: { userFlowNumber: flowNumber, }, });
  return flowNumber;
};

const getFlowNumber = apolloClient =>
  apolloClient.readQuery({ query: GET_FLOW_NUMBER, }).userFlowNumber;

export { storeFlowNumber, getFlowNumber, };
