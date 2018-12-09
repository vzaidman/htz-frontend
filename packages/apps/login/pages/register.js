import React, { Fragment, Component, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';
import { FelaTheme, createComponent, } from 'react-fela';

import { EventTracker, HtzLink, Register, Form, TextInput, Button, CheckBox, } from '@haaretz/htz-components';
import { UserTransformations, } from '@haaretz/htz-user-utils';

import FSMLayout from '../layouts/FSMLayout';
import isEmail from 'validator/lib/isEmail';
import { getEmail, getUserData, } from './queryutil/userDetailsOperations';
import { sendTrackingEvents, } from '../util/trackingEventsUtil';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import { getFacebookLoginUrl, getFacebookParams, } from '../util/facebookLoginUtil';

// Styling Components -------
const {
  ContentWrapper,
  FormWrapper,
  ItemCenterer,
} = LoginContentStyles;
const { ErrorBox, TermsWrapper, } = LoginMiscLayoutStyles;

const halfSizeStyleWrapperStyle = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  '@media (max-width: 768px)': {
    display: 'block',
    justifyContent: 'none',
    overflow: 'hidden',
  }
});
const halfSizeStyle = () => ({
  float: 'right',
  width: '49%',
  '@media (max-width: 768px)': {
    width: '100%',
  }
});
const termsStyle = () => ({
  lineHeight: '17px',
  '& a': {
    color: '#0895c3 !important',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  '& div': {
    fontSize: '1.8rem',
    '@media (max-width: 768px)': {
      fontSize: '2.3rem',
    }
  },
});
const HalfSizeWrapper = createComponent(halfSizeStyleWrapperStyle);
const HalfSize = createComponent(halfSizeStyle);
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
  phone = phone.replace(/[\s\-]/g, '');
  const phoneRegex = /(^05\d{8}$)|(^\+\d{8,13}$)/;
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
      אני מאשר/ת את <HtzLink target="_blank" href="https://www.haaretz.co.il/misc/terms-of-use">תנאי השימוש</HtzLink> באתר הארץ, וכן קבלת המלצות קריאה, הצעות לרכישת מינוי ודיוור מאתרי הארץ-TheMarker
  </div>
);
const getGeneralErrorMessage = () => (
  <span>
    סליחה תקלה. אנא נסו שוב בעוד כמה דקות או פנו ל
    <HtzLink target="_blank" href="https://www.haaretz.co.il/misc/contact-us">
      <span style={ {textDecoration: "underline",} } >שירות הלקוחות </span>
    </HtzLink>
    שלנו
  </span>
);
const getFacebookLogin = (user) => {
  const facebookParams = getFacebookParams(user);
  return facebookParams ?
    getFacebookLoginUrl(facebookParams) :
    false;
}


const onSubmit = ({ register, doTransition, user, flow, showError, hideError, setPreloader, eventsTrackers, }) => ({ firstname, lastname, email, password, phone, terms, }) => {
  setPreloader(true);
  hideError();
  const { mobilePrefix, mobileSuffix, } = phone ? UserTransformations.mobileNumberParser(phone) : { mobilePrefix: '', mobileSuffix: '', };
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
      sendTrackingEvents(eventsTrackers, { page: 'Register', flowNumber: flow, label: 'register', })(() => {
          Router.push(doTransition('success'));
        }
      );
    },
    reason => {
      setPreloader(false);
      showError((reason.message || getGeneralErrorMessage()));
    }
  );
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
          const flow = getFlowNumber(client);
          return (
            <FSMLayout>
              {({ currentState, findRout, doTransition, }) => (
                <FelaTheme
                  render={theme => (
                    <Fragment>
                      <EventTracker>
                        {({ biAction, gaAction, gaMapper, }) => (
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
                                  onSubmit={onSubmit({
                                    register,
                                    doTransition,
                                    flow: flow,
                                    showError: this.showError,
                                    hideError: this.hideError,
                                    setPreloader: this.setPreloader,
                                    eventsTrackers: { biAction, gaAction, },
                                  })}
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

                                      {/*<div>
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
                                      </div>*/}

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
                                        <Button isBusy={this.state.isLoading} onClick={handleSubmit}>הרשמה</Button>
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
                                    sendTrackingEvents({ biAction, gaAction, }, { page: 'Register', flowNumber: flow, label: 'loginPage', })(() => {
                                        Router.push(route);
                                      }
                                    );
                                  }}
                                >
                                  התחברו
                                </HtzLink>
                              </BottomLinks>

                            </FormWrapper>
                          </ContentWrapper>
                        )}
                      </EventTracker>
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
