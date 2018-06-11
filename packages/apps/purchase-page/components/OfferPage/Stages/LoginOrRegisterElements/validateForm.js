import isEmail from 'validator/lib/isEmail';
import PasswordNote from './PasswordNote';

const validateForm = ({
  email = '',
  password,
  firstName,
  lastName,
  terms,
  form,
  site,
  openModal,
  registerOrLoginStage,
}) => {
  const errors = [];

  if (!email) {
    errors.push({
      name: 'email',
      order: 1,
      errorText: form.email.errorText,
    });
  }
  else if (!isEmail(email)) {
    errors.push({
      name: 'email',
      order: 1,
      errorText: form.email.errorTextInvalidEmail,
    });
  }

  if (registerOrLoginStage !== 'checkEmail') {
    if (!password) {
      errors.push({
        name: 'password',
        order: 2,
        errorText: PasswordNote(
          form.password.errorTextNoPassword,
          form.password.forgotPasswordText,
          openModal,
          registerOrLoginStage === 'login'
        ),
      });
    }
    if (password && password.length < 5) {
      errors.push({
        name: 'password',
        order: 2,
        errorText: PasswordNote(
          form.password.errorTextUnderFiveChars,
          form.password.forgotPasswordText,
          openModal,
          registerOrLoginStage === 'login'
        ),
      });
    }
    if (registerOrLoginStage === 'register') {
      if (!firstName) {
        errors.push({
          name: 'firstName',
          order: 3,
          errorText: form.firstName.errorText,
        });
      }
      const digitRegex = new RegExp('\\d');
      if (firstName && (firstName.length < 2 || digitRegex.test(firstName))) {
        errors.push({
          name: 'firstName',
          order: 3,
          errorText: form.firstName.errorTextUnderTwoChars,
        });
      }
      if (!lastName) {
        errors.push({
          name: 'lastName',
          order: 4,
          errorText: form.lastName.errorText,
        });
      }
      if (lastName && (lastName.length < 2 || digitRegex.test(lastName))) {
        errors.push({
          name: 'lastName',
          order: 4,
          errorText: form.lastName.errorTextUnderTwoChars,
        });
      }
    }
    if (!terms) {
      errors.push({
        name: 'terms',
        order: 4,
        errorText: form.terms.errorText[site],
      });
    }
  }
  return errors;
};

export default validateForm;
