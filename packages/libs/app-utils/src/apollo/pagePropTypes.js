import PropTypes from 'prop-types';

const pagePropTypes = {
  /* eslint-disable react/forbid-prop-types */
  serverError: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  /* eslint-enable react/forbid-prop-types */
};

export default pagePropTypes;
