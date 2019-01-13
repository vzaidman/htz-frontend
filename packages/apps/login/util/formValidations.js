const generateError = (name, order) => message => [ { name, order, errorText: message, }, ];
const generateFirstNameError = (message, order) => generateError('firstname', order)(message);
const generateLastNameError = (message, order) => generateError('lastname', order)(message);
const generateEmailError = (message, order) => generateError('email', order)(message);
const generatePasswordError = (message, order) => generateError('password', order)(message);
const generateTermsError = (message, order) => generateError('terms', order)(message);

const isPassword = password => password.length > 5; // TODO: write proper password validation
const isName = name => name.length > 1; // TODO: write proper name validation
const isChecked = terms => !!terms;

export const validateFirstNameInput = ({ firstname, order, }) =>
  (!firstname
    ? generateFirstNameError('אנא הזינו שם פרטי', order)
    : !isName(firstname)
      ? generateFirstNameError('אנא הזינו שם תקין', order)
      : []); // name is valid

export const validateLastNameInput = ({ lastname, order, }) =>
(!lastname
  ? generateLastNameError('אנא הזינו שם משפחה', order)
  : !isName(lastname)
    ? generateLastNameError('אנא הזינו שם תקין', order)
    : []); // name is valid

export const validateEmailInput = ({ email, order, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל', order)
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה', order)
      : []); // email is valid

export const validatePasswordInput = ({ password, order, }) =>
  (!password
    ? generatePasswordError('אנא הזינו סיסמה', order)
    : !isPassword(password)
      ? generatePasswordError('אנא הזינו סיסמה תקינה', order)
      : []); // password is valid

export const validateTermsInput = ({ terms, order, }) =>
  (!terms
    ? generateTermsError('יש לאשר את תנאי השימוש באתר', order)
    : !isChecked(terms)
      ? generateTermsError('יש לאשר את תנאי השימוש באתר', order)
      : []); // password is valid

const valdiateForm = ({ firstname, lastname, email, password, terms }) => {
  let errors = [];
  if (firstname != null) {
    errors = [ ...validateFirstNameInput({ firstname, }), ];
  }
  if (lastname != null) {
    errors = [ ...errors, ...validateLastNameInput({ lastname, }), ];
  }
  if (email != null) {
    errors = [ ...errors, ...validateEmailInput({ email, }), ];
  }
  if (password != null) {
    errors = [ ...errors, ...validatePasswordInput({ password, }), ];
  }
  if (!terms) {
    errors = [ ...errors, ...validateTermsInput({ terms, }), ];
  }
  return errors;
};
