import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Form, TextInput, Button, Login, HtzLink, CheckBox, } from '@haaretz/htz-components';
import theme from '../../../theme/index';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { LoginMiscLayoutStylesThemed, } from '../../StyleComponents/LoginStyleComponentsByTheme';
import { getUserData, getPhoneNum, getOtpHash, generateOtp, saveOtpHash, getEmail, getUser, } from '../../../pages/queryutil/userDetailsOperations';
import { getHost, } from '../../../util/requestUtil';
import Preloader from '../../Misc/Preloader';
import isEmail from 'validator/lib/isEmail';
import { getFacebookLoginUrl, getFacebookParams, } from '../../../util/facebookLoginUtil';
import { isName, isMobile, isPassword, } from './fieldsValidators';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods -------------------
const getTermsText = () => (
  <div>
      אני מאשר/ת קבלת המלצות קריאה, הצעות לרכישת מינוי ודיוור מאתרי הארץ-TheMarker
  </div>
);

const generateError = (name, order) => message => [ { name, order, errorText: message, }, ];
const generateEmailError = message => generateError('email', 1)(message);
const generatePasswordError = message => generateError('password', 2)(message);
const generateTermsError = message => generateError('terms', 3)(message);

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const validatePasswordInput = ({ password, }) =>
  (!password
    ? generatePasswordError('אנא הזינו סיסמה')
    : !isPassword(password)
      ? generatePasswordError('אנא הזינו סיסמה תקינה')
      : []); // email is valid

const getFacebookLogin = (user) => {
  const facebookParams = getFacebookParams(user);
  return facebookParams ?
    getFacebookLoginUrl(facebookParams) :
    false;
}

const modifyErrorMessage = (message) => {
  return message === "הדואר האלקטרוני או הסיסמה שהוזנו אינם קיימים במערכת" ?
    'הדוא"ל או הסיסמה שהוזנו אינם קיימים במערכת' : message;
}

const onSubmit = ({ login, host, user, flow, showError, hideError, setPreloader, eventsTrackers, }) =>
  ({ email, password, }) => {
    setPreloader(true);
    hideError();
    login(email, password)
      .then(
        () => {
          sendTrackingEvents(eventsTrackers, { page: 'How to login?', flowNumber: flow, label: 'connectPassword', })(() => {
              window.location = getFacebookLogin(user) || `https://www.${host}`;
            }
          );
        },
        reason => {
          setPreloader(false);
          showError(modifyErrorMessage(reason.message));
        }
      );
  };

// --------------------------

class PasswordForm extends Component {

  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
    isChecked: false,
    isFirstTime: false,
  }

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {
    client: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
  };

  static defaultProps = {
    client: null,
    getFlowByData: null,
    theme: null,
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  }

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  isCheckboxError = () => !(this.state.isFirstTime || this.state.isChecked);

  validateTermsInput = () => (this.isCheckboxError()
    ? generateTermsError('יש לאשר את תנאי השימוש באתר')
    : []);

  toggleChecked = () =>
    this.setState({ isChecked: !this.state.isChecked, isFirstTime: false, });

  validateForm = ({ email, password, terms, }) => {
    let errors = [];
    if (email !== null) {
      errors = [ ...validateEmailInput({ email, }), ];
    }
    if (password !== null) {
      errors = [ ...errors, ...validatePasswordInput({ password, }), ];
    }
    if (this.isCheckboxError()) {
      errors = [ ...errors, ...this.validateTermsInput(), ];
    }
    console.log(errors.map(arr => JSON.stringify(arr)));
    return errors;
  };

  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  
  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, login, theme, showDialog, user, flow, eventsTrackers, } = this.props;
    const host = getHost(client);
    const { InputLinkButton, TermsWrapper, } = LoginMiscLayoutStylesThemed(host);
    return (
      <FormWrapper>
        <Form
          clearFormAfterSubmit={false}
          initialValues={ {email: getEmail(client)} }
          validate={this.validateForm}
          onSubmit={onSubmit({ login, host, user, flow, showError: this.showError, hideError: this.hideError, setPreloader: this.setPreloader, eventsTrackers, })}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <Fragment>
              <div>
                <TextInput
                  type="email"
                  noteText="אנא הזינו כתובת דוא”ל"
                  maxLength={64}
                  requiredText={{
                    long: theme.emailInputRequiredLong,
                    short: theme.emailInputRequiredShort,
                  }}
                  {...getInputProps({
                    name: 'email',
                    label: theme.emailInputLabel,
                    type: 'email',
                  })}
                />
              </div>

              <div>
                <TextInput
                  type="password"
                  label={theme.passwordInputLabel}
                  value="test"
                  noteText="אנא הזינו סיסמה"
                  requiredText={{
                    long: theme.passwordInputRequiredLong,
                    short: theme.passwordInputRequiredShort,
                  }}
                  {...getInputProps({
                    name: 'password',
                    label: theme.passwordInputLabel,
                    type: 'password',
                  })}
                />
                <InputLinkButton>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      sendTrackingEvents(eventsTrackers, { page: 'How to login?', flowNumber: flow, label: 'forgotPassword', })(() => {
                          showDialog();
                        }
                      );
                    }}
                  >
                    שכחתי סיסמה
                  </button>
                </InputLinkButton>
              </div>

              <TermsWrapper>
                <div className="testtest">
                <CheckBox
                  type="checkbox"
                  label="terms"
                  noteText="יש לאשר את תנאי השימוש באתר"
                  errorText="יש לאשר את תנאי השימוש באתר"
                  onClick={this.toggleChecked}
                  checked={this.state.isChecked}
                  {...getInputProps({
                    name: 'terms',
                    label: getTermsText(),
                    type: 'checkbox',
                  })}
                />
                </div>
              </TermsWrapper>

              <ErrorBox className={this.state.showError ? "" : "hidden"}>
                <span>
                  {this.state.errorMessage}
                </span>
              </ErrorBox>

              <ItemCenterer>
                <Preloader isLoading={this.state.isLoading} />
                <Button onClick={handleSubmit}>התחברות</Button>
              </ItemCenterer>
            </Fragment>
          )}
        />
      </FormWrapper>
    );
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }
};

export default PasswordForm;