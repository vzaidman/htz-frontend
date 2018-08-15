import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';

const propTypes = {
  render: PropTypes.func.isRequired,
};
const defaultProps = {};

function checkMobileValidByEmail(email) {
  const userService = new UserService();
  return userService.checkPhoneValid(email);
}

function CheckMobileValidByEmail({ render, }) {
  return render({
    checkMobileValidByEmail,
  });
}

CheckMobileValidByEmail.propTypes = propTypes;
CheckMobileValidByEmail.defaultProps = defaultProps;

export default CheckMobileValidByEmail;
