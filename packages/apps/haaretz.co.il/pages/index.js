import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * An object containing route information from Next, such as the `pathname`
   * and `query` object.
   */
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function HomePage({ url, }) {
  return <div>hello home</div>;
}

HomePage.propTypes = propTypes;

export default HomePage;
