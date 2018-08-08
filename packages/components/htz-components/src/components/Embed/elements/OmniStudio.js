/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.OmnyStudioEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '../../ApolloBoundary/ApolloBoundary';

const GET_HOST = gql`
  query GetHost {
    hostname @client
  }
`;

OmnyStudio.propTypes = {
  /**
   * The audio's source code.
   */
  source: PropTypes.string.isRequired,
  /**
   * These settings are extracted from the Omny-Studio source code and calculated with
   * consideration of the user input in Polopoly.
   */
  settings: PropTypes.shape({
    style: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    share: PropTypes.string.isRequired,
    download: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subscribe: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

OmnyStudio.defaultProps = {
  onLoadCallback: null,
};

// eslint-disable-next-line react/prop-types
const OmnyStudioWrapper = ({ children, }) => (
  <FelaComponent
    style={{
      overflow: 'auto',
      position: 'relative',
      margin: '0 auto -4px',
      maxWidth: '700px',
    }}
  >
    {children}
  </FelaComponent>
);

function OmnyStudio({ source, settings, onLoadCallback, }) {
  const {
    style,
    image,
    share,
    download,
    description,
    subscribe,
    height,
  } = settings;

  return (
    <Query query={GET_HOST}>
      {({ loading, error, data: { hostname, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        const highlight = host === 'themarker.com' ? '00c800' : '09a5d9';
        return (
          <OmnyStudioWrapper>
            <iframe
              title="OmnyStudio"
              width="100%"
              height={height}
              src={`${source}?style=${style}&image=${image}&share=${share}&download=${download}&description=${description}&subscribe=${subscribe}&foreground=222222&background=f3f3f3&highlight=${highlight}`}
              frameBorder="0"
              allowFullScreen=""
              onLoad={onLoadCallback}
            />
          </OmnyStudioWrapper>
        );
      }}
    </Query>
  );
}

export default OmnyStudio;
