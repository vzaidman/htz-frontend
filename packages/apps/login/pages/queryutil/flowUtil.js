import { STATE_METADATA, } from '../queries/FiniteStateMachineQueries';

/**
 * Saves meta data
 * @param apolloClient - apollo client
 * @param metadata - metadata information string
 * @returns {string}
 */
const writeMetaDataToApollo = (apolloClient, metadata) => {
  apolloClient.writeData({
    data: { stateMetaData: metadata !== null ? metadata.toString() : null, },
  });
  return metadata;
};

const getMetadataFromApollo = apolloClient =>
  apolloClient.readQuery({ query: STATE_METADATA, }).stateMetaData;

const parseRouteInfo = routeInfo =>
  (typeof routeInfo === 'object'
    ? { route: routeInfo.url, metadata: routeInfo.param, }
    : { route: routeInfo, metadata: null, });

export {
  writeMetaDataToApollo,
  getMetadataFromApollo,
  parseRouteInfo,
};
