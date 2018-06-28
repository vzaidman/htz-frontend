import React from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import MastheadElement from './MastheadElement';
import MastheadQuery from './mastheadData';

const propTypes = {
  /**
   * The contentId of the navigation element.
   */
  contentId: PropTypes.string.isRequired,
};

const WrappedMasthead = ({ contentId, }) => (
  <Query
    query={MastheadQuery}
    // navMenuID is generate automatically
    // eslint-disable-next-line react/prop-types
    variables={{ path: contentId, }}
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

WrappedMasthead.propTypes = propTypes;

export default WrappedMasthead;
