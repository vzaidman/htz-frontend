import React from 'react';
import { ApolloConsumer, } from 'react-apollo';
import Media from '../Media/Media';
import NoSSR from '../NoSSR/NoSSR';

const IsMobileInjector = () => (
  <NoSSR>
    <ApolloConsumer>
      {client => (
        <Media query={{ until: 's', }} matchOnServer>
          {matches => {
            client &&
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

export default IsMobileInjector;
