import PropTypes from 'prop-types';

const pagePropTypes = {
  /* eslint-disable react/forbid-prop-types */
  serverState: PropTypes.object.isRequired,
  serverError: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object,
  }).isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default pagePropTypes;
