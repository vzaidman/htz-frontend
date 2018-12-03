import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Query from '../../ApolloBoundary/Query';
import NoSSR from '../../NoSSR/NoSSR';

const getDfpConfigQuery = gql`
  query getDfpConfig($path: String!) {
    page(path: $path) {
      dfpConfig {
        adSlotConfig
        adManagerConfig {
          network
          adUnitBase
        }
        conflictManagementConfig
        impressionManagerConfig
        googleGlobalSettings {
          enableSingleRequest
          enableAsyncRendering
          breakpointType
        }
      }
      lineage {
        pathSegment
      }
    }
  }
`;

const getPath = gql`
  query getPath {
    articleId @client
  }
`;

const DfpConfProvider = props => (
  <NoSSR>
    <Query query={getPath} >
      {({ data, loading, error, }) => {
          if (error) {
            console.log('[DfpConfProvider] error %o', error);
          }
          if (loading || error) {
            return null;
          }
          return (
            <Query query={getDfpConfigQuery} variables={{ path: `/${data.articleId}`, }}>
              {
                ({ data, loading, error, }) => {
                  if (error) {
                    console.warn('[DfpConfProvider] error %o', error);
                  }
                  return loading || error
                    ? null
                    : props.children(data.page);
                }
              }
            </Query>
          );
        }
      }
    </Query>
  </NoSSR>
);

DfpConfProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DfpConfProvider;
