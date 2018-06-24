import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, } from 'react-apollo';

export const ZEN_QUERY = gql`
  query {
    zenMode @client
  }
`;

const propTypes = {
  /**
   * Nodes that ought to be hidden in 'Zen mode'.
   */
  children: PropTypes.node.isRequired,
};

function Zen(props) {
  return (
    <Query query={ZEN_QUERY}>
      {({ loading, error, data, }) => {
        if (loading) return null;
        if (error) return null;
        if (data && !data.zenMode) {
          return <Fragment>{props.children}</Fragment>;
        }
        return null;
      }}
    </Query>
  );
}

Zen.propTypes = propTypes;

export default Zen;
