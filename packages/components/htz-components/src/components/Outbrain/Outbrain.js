import React from 'react';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { appendScript, } from '../../utils/scriptTools';

const GET_CANONICAL_URL = gql`
  query {
    canonicalUrl @client
  }
`;

class Outbrain extends React.Component {
  componentDidMount() {
    appendScript({
      src: 'https://widgets.outbrain.com/outbrain.js',
      id: 'outbrain',
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Query query={GET_CANONICAL_URL}>
        {({ data: { canonicalUrl, }, }) => (
          <div
            className="OUTBRAIN"
            data-src={canonicalUrl}
            data-widget-id="AR_10"
            data-ob-template="haaretz-heb"
          />
        )}
      </Query>
    );
  }
}

export default Outbrain;
