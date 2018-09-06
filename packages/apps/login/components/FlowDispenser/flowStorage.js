import GET_FLOW from '../../pages/queries/UserFlow';

const storeFlowToApollo = apolloClient => flow => {
  const transitionMap = flow.transitionRouteMap;
  const stringifiedTransitionMap = JSON.stringify(Array.from(transitionMap));
  const flowWithStringifiedTransitionMap =
    Object.assign({}, flow, { transitionRouteMap: stringifiedTransitionMap, });
  console.log(`stringified flow ${JSON.stringify(flowWithStringifiedTransitionMap)}`);
  return apolloClient.writeData({ data:
      { userFlowJson: JSON.stringify(flowWithStringifiedTransitionMap), },
  });
};

const getAndParseFlowFromApollo = apolloClient => {
  const flowWithStringifiedTransitionMap = JSON.parse(
    apolloClient.readQuery({ query: GET_FLOW, }).userFlowJson
  );

  const parsedTransitionMap =
    new Map(JSON.parse(flowWithStringifiedTransitionMap.transitionRouteMap));

  return Object.assign(
    {},
    flowWithStringifiedTransitionMap,
    { transitionRouteMap: parsedTransitionMap, }
  );
};

export { storeFlowToApollo, getAndParseFlowFromApollo, };
