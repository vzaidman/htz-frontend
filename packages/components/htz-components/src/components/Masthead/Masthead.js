import React from 'react';
import { Query, } from 'react-apollo';
import MastheadElement from './MastheadElement';
import MastheadQuery from './mastheadData';

const WrappedMasthead = props => (
  <Query
    query={MastheadQuery}
    // navMenuID is generate automatically
    // eslint-disable-next-line react/prop-types
    variables={{ path: props.navMenuID, }}
  >
    {({ data, loading, error, }) => {
      if (loading) return null;
      if (error) return null;
      const { navMenu, hostname, } = data;
      return (
        <MastheadElement menuSections={navMenu.menu} hostname={hostname} />
      );
    }}
  </Query>
);

export default WrappedMasthead;
