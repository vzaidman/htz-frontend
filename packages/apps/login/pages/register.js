import React, { Fragment, Component, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { HtzLink, Register, Form, TextInput, Button, CheckBox, } from '@haaretz/htz-components';

// import { mobileNumberParser, } from '@haaretz/htz-user-utils';

import FSMLayout from '../layouts/FSMLayout';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import isEmail from 'validator/lib/isEmail';
import { getEmail, } from './queryutil/userDetailsOperations';
import theme from '../theme';
import { FelaTheme, createComponent, } from 'react-fela';
import BottomLinks from '../components/Misc/BottomLinks';
import Preloader from '../components/Misc/Preloader';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const {
  ContentWrapper,
  FormWrapper,
  ItemCenterer,
} = LoginContentStyles;
const { InputLinkButton, ErrorBox, } = LoginMiscLayoutStyles;

const halfSizeStyleWrapperStyle = () => ({
  display: 'flex',
  justifyContent: 'space-between',
});
const halfSizeStyle = () => ({
  float: 'right',
  width: '49%',
});
const termsStyle = () => ({
  lineHeight: '17px',
});
const HalfSizeWrapper = createComponent(halfSizeStyleWrapperStyle);
const HalfSize = createComponent(halfSizeStyle);
const TermsWrapper = createComponent(termsStyle);
// --------------------------

// Methods -------------------
const generateError = (name, order) => message => [ { name, order, errorText: message, }, ];
const generateFirstNameError = message => generateError('firstname', 1)(message);
const generateLastNameError = message => generateError('lastname', 2)(message);
const generateEmailError = message => generateError('email', 3)(message);
const generatePasswordError = message => generateError('password', 4)(message);
const generateMobileError = message => generateError('phone', 4)(message);
const generateTermsError = message => generateError('terms', 5)(message);

const isPassword = password => password.length > 5; // TODO: write proper password validation
const isName = name => {
  const regex = /^[a-zA-Z\u0590-\u05FF\'\- ]{2,30}$/;
  return regex.test(name.trim());
};

const isMobile = phone => {
  phone = phone.replace(/\s/g, '');
  const phoneRegex = /^(\s*|[+0-9]\d{6,})$/;
  return phoneRegex.test(phone);
};

const isChecked = terms => !!terms;

const validateFirstNameInput = ({ firstname, }) =>
  (!firstname
    ? generateFirstNameError('אנא הזינו שם פרטי')
    : !isName(firstname)
      ? generateFirstNameError('יש להזין שם המורכב מ-2 אותיות לפחות וללא מספרים')
      : []); // name is valid

const validateLastNameInput = ({ lastname, }) =>
  (!lastname
    ? generateLastNameError('אנא הזינו שם משפחה')
    : !isName(lastname)
      ? generateLastNameError('יש להזין שם המורכב מ-2 אותיות לפחות וללא מספרים')
      : []); // name is valid

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const validateMobileInput = ({ phone, }) =>
  (!phone
    ? generateMobileError('אנא הזינו מספר טלפון נייד')
    : !isMobile(phone)
      ? generateMobileError('אנא הזינו מספר טלפון נייד תקין')
      : []); // mobile is valid

const validatePasswordInput = ({ password, }) =>
  (!password
    ? generatePasswordError('אנא הזינו סיסמה')
    : !isPassword(password)
      ? generatePasswordError('ש להזין סיסמה בת 6 תווים ומעלה')
      : []); // password is valid

const getTermsText = () => (
  <div>
      אני מאשר/ת קבלת המלצות קריאה, הצעות לרכישת מינוי ודיוור מאתרי הארץ-TheMarker
  </div>
);

const mobileNumberParser = mobileNum => {
  let mobilePrefix;
  let mobileSuffix;

  if (mobileNum.startsWith('+')) {
    mobilePrefix = '00';
    mobileSuffix = mobileNum.substring(1);
  }
  else {
    mobilePrefix = mobileNum.substring(0, 3);
    mobileSuffix = mobileNum.substring(3);
  }
  return { mobilePrefix, mobileSuffix, };
};

const onSubmit = ({ register, doTransition, showError, hideError, setPreloader, }) => ({ firstname, lastname, email, password, phone, terms, }) => {
  setPreloader(true);
  hideError();
  const { mobilePrefix, mobileSuffix, } = phone ? mobileNumberParser(phone) : { mobilePrefix: '', mobileSuffix: '', };
  register(
    email.trim(),
    password.trim(),
    password.trim(), // for confirmation (the form has only 1 password field)
    firstname.trim(),
    lastname.trim(),
    mobilePrefix,
    mobileSuffix,
    terms
  ).then(
    () => {
      Router.push(doTransition('success'));
    },
    reason => {
      setPreloader(false);
      showError((reason.message || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.'));
    }
  );
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

class RegisterPage extends Component {
  state = {
    isChecked: false,
    isFirstTime: false,
    showError: false,
    errorMessage: '',
    isLoading: false,
  };


  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  }

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  isCheckboxError = () => !(this.state.isFirstTime || this.state.isChecked);

  valdiateForm = ({ firstname, lastname, email, password, phone, terms, }) => {
    console.log(terms);
    let errors = [];
    if (firstname !== null) {
      errors = [ ...validateFirstNameInput({ firstname, }), ];
    }
    if (lastname !== null) {
      errors = [ ...errors, ...validateLastNameInput({ lastname, }), ];
    }
    if (email !== null) {
      errors = [ ...errors, ...validateEmailInput({ email, }), ];
    }
    if (password !== null) {
      errors = [ ...errors, ...validatePasswordInput({ password, }), ];
    }
    if (phone !== null && phone && phone.length > 0) {
      errors = [ ...errors, ...validateMobileInput({ phone, }), ];
    }
    if (this.isCheckboxError()) {
      errors = [ ...errors, ...this.validateTermsInput(), ];
    }
    // console.log(errors.map(arr => JSON.stringify(arr)));
    return errors;
  };

  validateTermsInput = () => (this.isCheckboxError()
    ? generateTermsError('יש לאשר את תנאי השימוש באתר')
    : []);

  toggleChecked = () =>
    this.setState({ isChecked: !this.state.isChecked, isFirstTime: false, });

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <FSMLayout>
              {({ currentState, findRout, doTransition, }) => (
                <FelaTheme
                  render={theme => (
                    <Fragment>
                      <ContentWrapper>
                        <FormWrapper>
                          <ItemCenterer>
                            <h5>הרשמה</h5>
                          </ItemCenterer>
                          <Register render={({ register, }) => (
                            <Form
                              clearFormAfterSubmit={false}
                              // initialValues={{ email: 'insert email' }}
                              validate={this.valdiateForm}
                              initialValues={ {email: getEmail(client)} }
                              onSubmit={onSubmit({ register, doTransition, showError: this.showError, hideError: this.hideError, setPreloader: this.setPreloader, })}
                              render={({ getInputProps, handleSubmit, clearForm, }) => (
                                <Fragment>

                                  <HalfSizeWrapper>
                                    <HalfSize>
                                      <TextInput
                                        type="text"
                                        label={theme.nameInputLabel[0]}
                                        noteText="אנא הזינו שם פרטי"
                                        requiredText={{
                                          long: theme.nameInputRequiredLong,
                                          short: theme.nameInputRequiredShort,
                                        }}
                                        {...getInputProps({
                                          name: 'firstname',
                                          label: theme.nameInputLabel[0],
                                          type: 'text',
                                        })}
                                      />
                                    </HalfSize>

                                    <HalfSize>
                                      <TextInput
                                        type="text"
                                        label={theme.nameInputLabel[1]}
                                        noteText="אנא הזינו שם משפחה"
                                        requiredText={{
                                          long: theme.nameInputRequiredLong,
                                          short: theme.nameInputRequiredShort,
                                        }}
                                        {...getInputProps({
                                          name: 'lastname',
                                          label: theme.nameInputLabel[1],
                                          type: 'text',
                                        })}
                                      />
                                    </HalfSize>
                                  </HalfSizeWrapper>

                                  <div>
                                    <TextInput
                                      type="email"
                                      noteText="אנא הזינו כתובת דוא”ל"
                                      maxLength={64}
                                      value={getEmail(client)}
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
                                      label={theme.emailInputLabel}
                                      noteText="אנא הזינו סיסמה"
                                      requiredText={{
                                        long: theme.emailInputRequiredLong,
                                        short: theme.emailInputRequiredShort,
                                      }}
                                      {...getInputProps({
                                        name: 'password',
                                        label: theme.passwordInputLabel,
                                        type: 'password',
                                      })}
                                    />
                                  </div>

                                  <div>
                                    <TextInput
                                      type="tel"
                                      label={theme.phoneInputLabel}
                                      noteText="אנא הזינו קידומת ומספר סלולרי"
                                      {...getInputProps({
                                        name: 'phone',
                                        label: theme.phoneInputLabel,
                                        type: 'tel',
                                      })}
                                    />
                                  </div>

                                  <TermsWrapper>
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
                                  </TermsWrapper>

                                  <ErrorBox className={this.state.showError ? '' : 'hidden'}>
                                    <span>
                                      {this.state.errorMessage}
                                    </span>
                                  </ErrorBox>

                                  <ItemCenterer>
                                    <Preloader isLoading={this.state.isLoading} />
                                    <Button onClick={handleSubmit}>הרשמה</Button>
                                  </ItemCenterer>
                                </Fragment>
                              )}
                            />
                          )}
                          />

                          <BottomLinks spacing={2.5}>
                            <span>כבר רשומים? </span>
                            <HtzLink
                              href={`${findRout('backToLogin')}`}
                              onClick={e => {
                                e.preventDefault();
                                const route = doTransition('backToLogin');
                                Router.push(route);
                              }}
                            >
                              התחברו
                            </HtzLink>
                          </BottomLinks>

                        </FormWrapper>
                      </ContentWrapper>
                    </Fragment>
                  )}
                />
              )}
            </FSMLayout>
          )
        }}
      </ApolloConsumer>
    );
  }
}

export default RegisterPage;
