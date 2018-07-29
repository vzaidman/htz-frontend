import PropTypes from 'prop-types';
import contentBasePropTypes from './contentBasePropTypes';

export default {
  ...contentBasePropTypes,
  authorType: PropTypes.string,
  image: PropTypes.shape(),
  hasEmailAlerts: PropTypes.bool,
  url: PropTypes.string,
  email: PropTypes.string,
  facebook: PropTypes.string,
  gplus: PropTypes.string,
  twitter: PropTypes.string,
};
