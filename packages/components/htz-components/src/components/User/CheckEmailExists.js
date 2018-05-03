import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';

const propTypes = {
  render: PropTypes.func.isRequired,
};
const defaultProps = {};

function checkEmailExists(email) {
  const userService = new UserService();
  return userService.checkEmailExists(email);
}

function CheckEmailExists({ render, }) {
  return render({
    checkEmailExists,
  });
}

CheckEmailExists.propTypes = propTypes;
CheckEmailExists.defaultProps = defaultProps;

export default CheckEmailExists;
