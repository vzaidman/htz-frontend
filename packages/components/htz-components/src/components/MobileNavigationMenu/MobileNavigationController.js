import React from 'react';
import PropTypes from 'prop-types';
import WrappedScroll from '../Scroll/Scroll';
import MobileNavigationWrapper from './MobileNavigationWrapper';

MobileNavigationController.propTypes = {
  contentId: PropTypes.string.isRequired,
};

export default function MobileNavigationController(contentId) {
  return (
    <WrappedScroll
      render={({ velocity, y, }) => (
        <MobileNavigationWrapper {...{ velocity, y, contentId, }} />
      )}
    />
  );
}
