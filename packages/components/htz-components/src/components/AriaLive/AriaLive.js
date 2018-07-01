import React from 'react';
import gql from 'graphql-tag';
import Announcer from './Announcer';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

const propTypes = {};

const defaultProps = {};

const GET_ARIA_LIVE_MESSAGE = gql`
  query {
    ariaLive @client {
      politeMessage
      assertiveMessage
    }
  }
`;

const AriaLive = () => (
  <Query query={GET_ARIA_LIVE_MESSAGE}>
    {({ data: { ariaLive: { politeMessage, assertiveMessage, }, }, }) => (
      <Announcer
        assertiveMessage={assertiveMessage}
        politeMessage={politeMessage}
      />
    )}
  </Query>
);

AriaLive.propTypes = propTypes;
AriaLive.defaultProps = defaultProps;

export default AriaLive;
