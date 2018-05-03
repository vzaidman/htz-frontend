/* global fetch */
import React from 'react';
import { ApolloConsumer, } from 'react-apollo';

class GeoIpInjector extends React.Component {
  state = { shouldRender: false, };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ shouldRender: true, });
  }

  render() {
    if (this.state.shouldRender) {
      this.setState({ shouldRender: false, });

      return (
        <ApolloConsumer>
          {cache => {
            fetch('https://ipapi.co/json/')
              .then(r => r.json())
              .then(data => data.country !== 'IL')
              .then(isForeign => {
                cache.writeData({
                  data: { isForeign, },
                });
              });
            return null;
          }}
        </ApolloConsumer>
      );
    }

    return null;
  }
}

export default GeoIpInjector;
