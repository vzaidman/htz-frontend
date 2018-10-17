import React, { Fragment, Component, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { Form, TextInput, Button, } from '@haaretz/htz-components';
import isEmail from 'validator/lib/isEmail';
import theme from '../theme';
import { FelaTheme, } from 'react-fela';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

import TabsFrame from '../components/Misc/TabsFrame';
import LoginDialog from '../components/Misc/LoginDialog';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateError = (name, order) => message => [ { name, order, errorText: message, }, ];
const generateEmailError = message => generateError('email', 1)(message);
const generatePasswordError = message => generateError('password', 2)(message);

const isPassword = password => password.length > 0; // TODO: write proper password validation

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

const onSubmit = () => {
  console.log('submit');
};

const valdiateForm = ({ email, password, }) => {
  let errors = [];
  if (email != null) {
    errors = [ ...validateEmailInput({ email, }), ];
  }
  if (password != null) {
    errors = [ ...errors, ...validatePasswordInput({ password, }), ];
  }
  console.log(errors.map(arr => JSON.stringify(arr)));
  return errors;
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

class Password extends Component {
  state = {
    showDialog: false,
  }

  showDialog = () => {
    this.setState({ showDialog: true })
  }

  hideDialog = () => {
    this.setState({ showDialog: false })
  }

  getDialogState = () => {
    return this.state.showDialog;
  }

  render() {
    return(
      <FSMLayout>
        {({ currentState, findRout, doTransition, }) => (
          <FelaTheme
            render={theme => (
              <Fragment>
                <ContentWrapper>
                  <FormWrapper>
                    <ItemCenterer>
                      <h5>שלום, כיצד תרצה/י להתחבר לחשבונך?</h5>
                    </ItemCenterer>

                    {/* ----------- Forgot Password Modal ------------ */}
                    <LoginDialog show={this.getDialogState()} handleClose={this.hideDialog}>
                      {
                        (nextStage, closeModal, CloseButton) => (
                          <div>
                            <div>
                              <CloseButton/>
                              <h4>החלפת סיסמה</h4>
                                <Form
                                clearFormAfterSubmit={false}
                                // initialValues={{ email: 'insert email' }}
                                validate={validateEmailInput}
                                onSubmit={onSubmit}
                                render={({ getInputProps, handleSubmit, clearForm, }) => (
                                  <Fragment>
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
                                    <ItemCenterer>
                                      <Button onClick={nextStage}>המשך</Button>
                                    </ItemCenterer>
                                  </Fragment>
                                )}
                              />
                            </div>

                            <div>
                              <CloseButton/>
                              <h4>החלפת סיסמה</h4>
                              <br/>
                              <h5>הוראות לאיפוס הסיסמה נשלחו לתיבת הדוא”ל שלך.</h5>
                              <ItemCenterer>
                                <Button onClick={closeModal}>התחברות</Button>
                              </ItemCenterer>
                            </div>
                          </div>
                        )
                      }
                    </LoginDialog>
    
                    {/* ----------------- Tabs Frame ----------------- */}
                    <TabsFrame activeTab={1}>
                      {/* TAB 1 */}
                      <div tabname="כניסה באמצעות SMS">
                        טופס כניסה באמצעות טלפון
                      </div>

                      {/* TAB 2 */}
                      <div tabname="כניסה באמצעות סיסמה">
                        <Form
                          clearFormAfterSubmit={false}
                          // initialValues={{ email: 'insert email' }}
                          validate={valdiateForm}
                          onSubmit={onSubmit}
                          render={({ getInputProps, handleSubmit, clearForm, }) => (
                            <Fragment>
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
                                  label={theme.passwordInputLabel}
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
                                      this.showDialog();
                                      // const route = doTransition('otpValidation2');
                                      // Router.push(route);
                                    }}
                                  >
                                    שכחתי סיסמה
                                  </button>
                                </InputLinkButton>
                              </div>
                              <ItemCenterer>
                                <Button onClick={handleSubmit}>התחברות</Button>
                              </ItemCenterer>
                            </Fragment>
                          )}
                        />
                      </div>
                    </TabsFrame>
    
                    <BottomLinks spacing={2.5}>
                      <span>עדיין לא רשומים? </span>
                      <HtzLink
                        href={`${findRout('registration')}`}
                        onClick={e => {
                          e.preventDefault();
                          const route = doTransition('registration');
                          Router.push(route);
                        }}
                      >
                        הירשמו
                      </HtzLink>
                    </BottomLinks>
                  </FormWrapper>
                </ContentWrapper>
              </Fragment>
            )}
          />
        )}
      </FSMLayout>
    );
  }
}

export default Password;
