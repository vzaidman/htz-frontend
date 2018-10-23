import React, { Fragment, Component, } from 'react';
import Router from 'next/router';

import { HtzLink, Register, Form, TextInput, Button, CheckBox, } from '@haaretz/htz-components';

// import { mobileNumberParser, } from '@haaretz/htz-user-utils';

import FSMLayout from '../layouts/FSMLayout';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import isEmail from 'validator/lib/isEmail';
import theme from '../theme';
import { FelaTheme, createComponent, } from 'react-fela';
import BottomLinks from '../components/Misc/BottomLinks';
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
const { InputLinkButton, } = LoginMiscLayoutStyles;

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
const generateTermsError = message => generateError('terms', 5)(message);

const isPassword = password => password.length > 5; // TODO: write proper password validation
const isName = name => name.length > 1; // TODO: write proper name validation
const isChecked = terms => !!terms;

const validateFirstNameInput = ({ firstname, }) =>
  (!firstname
    ? generateFirstNameError('אנא הזינו שם פרטי')
    : !isName(firstname)
      ? generateFirstNameError('אנא הזינו שם תקין')
      : []); // name is valid

const validateLastNameInput = ({ lastname, }) =>
  (!lastname
    ? generateLastNameError('אנא הזינו שם משפחה')
    : !isName(lastname)
      ? generateLastNameError('אנא הזינו שם תקין')
      : []); // name is valid

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
      : []); // password is valid

const getTermsText = () => {
  return (
    <div>
      אני מאשר/ת קבלת המלצות קריאה, הצעות לרכישת מינוי ודיוור מאתרי הארץ-TheMarker
    </div>
  );
};

const onSubmit = ({ register, doTransition, }) => ({ firstname, lastname, email, password, phone, terms, }) => {
  // const { mobilePrefix, mobileNumber, } = mobileNumberParser(phone); // TODO import function from htz-user-utils
  const { mobilePrefix, mobileNumber, } = { mobilePrefix: '', mobileNumber: '', };
  register(
    email,
    password,
    password,
    firstname,
    lastname,
    mobilePrefix,
    mobileNumber,
    terms
  ).then(
    () => Router.push(doTransition('success')),
    reason => {} // TODO error
  );
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

class RegisterPage extends Component {
  state = {
    isChecked: false,
    isFirstTime: true,
  };

  isCheckboxError = () => !(this.state.isFirstTime || this.state.isChecked);

  valdiateForm = ({ firstname, lastname, email, password, }) => {
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
    if (this.isCheckboxError()) {
      errors = [ ...errors, ...this.validateTermsInput(), ];
    }
    console.log(errors.map(arr => JSON.stringify(arr)));
    return errors;
  };

  validateTermsInput = () => (this.isCheckboxError()
    ? generateTermsError('יש לאשר את תנאי השימוש באתר')
    : []);

  toggleChecked = () =>
    this.setState({ isChecked: !this.state.isChecked, isFirstTime: false, });

  render() {
    return (<FSMLayout>
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
                      onSubmit={onSubmit({ register, doTransition, })}
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
                              label={theme.emailInputLabel}
                              noteText="אנא הזינו כתובת דוא”ל"
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
                              isError={this.isCheckboxError}
                              {...getInputProps({
                                name: 'terms',
                                label: getTermsText(),
                                type: 'checkbox',
                              })}
                            />
                          </TermsWrapper>

                          <ItemCenterer>
                            <Button onClick={handleSubmit}>הרשמה</Button>
                          </ItemCenterer>
                        </Fragment>
                      )}
                    />
                  )}/>

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
    </FSMLayout>);
  }
}

export default RegisterPage;
