/* global OBR */
import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import Query from '../ApolloBoundary/Query';
import { appendScript, } from '../../utils/scriptTools';

const GET_CANONICAL_URL = gql`
  query GetCanonicalUrl {
    canonicalUrl @client
  }
`;

class Outbrain extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      writeData: PropTypes.func,
    }).isRequired,
  };

  componentDidMount() {
    appendScript({
      src: 'https://widgets.outbrain.com/outbrain.js',
      id: 'outbrain',
      isAsync: false,
      updateFunction: () => {
        if (OBR) {
          OBR.extern.reloadWidget();
        }
      },
    });
    this.props.client.writeData({ data: { osakaCanRender: true, }, });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.props.client.writeData({ data: { osakaCanRender: false, }, });
  }

  render() {
    return (
      <Query query={GET_CANONICAL_URL}>
        {({ data: { canonicalUrl, }, }) => (
          <div
            className="OUTBRAIN"
            data-src={canonicalUrl}
            data-widget-id="AR_14"
            data-ob-template="haaretz-heb"
          />
        )}
      </Query>
    );
  }
}

const OutbrainWithClient = props => (
  <ApolloConsumer>
    {client => <Outbrain client={client} {...props} />}
  </ApolloConsumer>
);

export default OutbrainWithClient;
