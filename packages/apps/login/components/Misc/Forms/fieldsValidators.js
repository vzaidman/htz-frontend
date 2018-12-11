/* ------------------- Validators Regex ------------------- */
const Regex = {
  name: /^[a-zA-Z\u0590-\u05FF\'\- ]{2,30}$/,
  mobile: /(^05\d{8}$)|(^\+\d{8,13}$)/, // local & worldwide
  whitespace: /^\s+$/, // whitespaces only
};

/* ----------------- Validators Functions ----------------- */
const isName = (name = '', regex = Regex.name) => {
  name = name.trim();
  return regex.test(name);
};

const isMobile = (phone = '', regex = Regex.mobile) => {
  phone = phone.replace(/[\s\-]/g, '');
  return regex.test(phone);
};

const isPassword = (password = '', regex) => (regex ? regex.test(password) : password.length > 5) && !Regex.whitespace.test(password);

/* ------------------------ Export ------------------------ */
export { isName, isMobile, isPassword, };
