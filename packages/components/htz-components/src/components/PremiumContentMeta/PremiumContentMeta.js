import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import PremiumContentMetaHelper from './helper/PremiumContentMeta.helper';

const PremiumContentMeta = props => (
  <Head>
    <PremiumContentMetaHelper {...props} />
  </Head>
);

PremiumContentMeta.propTypes = {
  isPremiumContent: PropTypes.bool.isRequired,
};

export default PremiumContentMeta;
