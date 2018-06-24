import React from 'react';
import { ApolloConsumer, } from 'react-apollo';
import Media from '../Media/Media';
import NoSSR from '../NoSSR/NoSSR';

const DeviceTypeInjector = () => (
  <NoSSR>
    <ApolloConsumer>
      {client => (
        <Media query={{ until: 's', }} matchOnServer>
          {matches => {
            client.writeData({
              data: { platform: matches ? 'mobile' : 'web', },
            });

            return null;
          }}
        </Media>
      )}
    </ApolloConsumer>
  </NoSSR>
);

export default DeviceTypeInjector;
