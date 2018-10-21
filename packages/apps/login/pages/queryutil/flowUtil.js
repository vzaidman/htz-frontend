

/**
 * Saves meta data
 * @param metadata - meta data value
 * @returns {string}
 */
const writeMetaDataToApollo = (apolloClient, metadata) => {
  console.warn(`metadata to be written to apollo: ${metadata}`);
  apolloClient.writeData({
    data: { stateMetaData: metadata ? metadata.toString() : null, },
  });
  return metadata;
};

export {
  writeMetaDataToApollo,
};