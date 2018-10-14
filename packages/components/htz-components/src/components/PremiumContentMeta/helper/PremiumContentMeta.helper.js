import React from 'react';
import PropTypes from 'prop-types';

const PremiumContentMetaHelper = ({ isPremiumContent, }) => (
  <React.Fragment>
    <meta property="isPremiumContent" content={isPremiumContent.toString()} />
    <meta property="article:content_tier" content={isPremiumContent ? 'locked' : 'free'} />
  </React.Fragment>
);

PremiumContentMetaHelper.propTypes = {
  isPremiumContent: PropTypes.bool.isRequired,
};

export default PremiumContentMetaHelper;
