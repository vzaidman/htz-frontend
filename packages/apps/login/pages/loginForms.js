/* global fetch, window */
import React, { Fragment, Component, } from 'react';
import config from 'config';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { HtzLink, Login, Form, TextInput, Button, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';
import { getUserData, getPhoneNum, getOtpHash, } from './queryutil/userDetailsOperations';

import isEmail from 'validator/lib/isEmail';
import theme from '../theme';
import { FelaTheme, } from 'react-fela';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import Preloader from '../components/Misc/Preloader';

import TabsFrame from '../components/Misc/TabsFrame';
import LoginDialog from '../components/Misc/LoginDialog';
import { getMetadataFromApollo, } from './queryutil/flowUtil';
import GET_HOST from './queries/GetHost';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { domainToSiteNumber, } from '../util/siteUtil';
import { PhoneInputForm, } from '../components/Misc/Forms/PhoneInputForm';
import OtpForm from '../components/Misc/Forms/OtpForm';
import { getHost } from '../util/requestUtil';
import { PhoneForms } from '../components/Misc/Forms/PhoneForms';
import ResetPasswordForm from '../components/Misc/Forms/ResetPasswordForm';
import { isName, isMobile, isPassword, } from '../components/Misc/Forms/fieldsValidators';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateError = (name, order) => message => [ { name, order, errorText: message, }, ];
const generateEmailError = message => generateError('email', 1)(message);
const generatePasswordError = message => generateError('password', 2)(message);

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

const onResetPassword = ({ host, nextStage, showError, hideError, setPreloader, }) => ({ email, }) => {
  const params = `userName=${email}&newsso=true&layer=sendpassword&site=${domainToSiteNumber(host)}`;
  fetch(`${config.get('service.sso')}/sso/r/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  }).then(
    success => success.json(),
    () => Promise.resolve({ status: 'error', message: 'server error', })
  ).then(json => {
    if (json.status === 'success') {
      nextStage();
    } else {
      //showError(json.message);
    }
  });
};

const onSubmit = ({ login, host, }, showErrorHandler, hideErrorHandler, setPreloader) =>
  ({ email, password, }) => {
    setPreloader(true);
    hideErrorHandler();
    login(email, password)
      .then(
        () => {
          window.location = `https://www.${host}`;
        },
        reason => {
          setPreloader(false);
          showErrorHandler(reason.message);
        }
      );
  };

const onSubmitSms = ({ client, host, loginWithMobile, }) => ({ smsCode, termsChk, }) =>
  loginWithMobile(getPhoneNum(client), smsCode, termsChk, getOtpHash(client))
    .then(
      // eslint-disable-next-line no-undef
      () => { window.location = `https://www.${host}`; },
      reason => console.log(reason.message) // TODO: add error UI
    );

const isLink = client => ('2345'.includes(getFlowNumber(client).toString()) ? 'notMyPhone' : null);

const validateForm = ({ email, password, }) => {
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

const getUserHiddenMobile = () => {

}

const hiddenPhone = client => {
  const phoneNumber = getPhoneNum(client);
  if (phoneNumber) {
    return `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7)}`;
  }
  else {
    return '-';
  }
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

class LoginForms extends Component {
  state = {
    showDialog: false,
    showError: false,
    errorMessage: '',
    rightForm: null,
    isLoading: false,
  };

  showDialog = () => {
    this.setState({ showDialog: true, })
  }

  hideDialog = () => {
    this.setState({ showDialog: false, })
  }

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  getDialogState = () => {
    return this.state.showDialog;
  }

  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  }

  render() {
    return (
      <Login
        render={({ login, loginWithMobile, }) => (
          <FSMLayout>
            {({ currentState, findRout, doTransition, }) => (
              <ApolloConsumer>
                {client => {
                  const host = getHost(client);
                  const flow = getFlowNumber(client);
                  const activeTab = '2345'.includes(flow) ? 0 : 1;
                  console.log('flow: ', flow, 'active tab: ', activeTab);
                  return (
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
                                      <ResetPasswordForm
                                        nextStage={nextStage}
                                        closeModal={closeModal}
                                        CloseButton={CloseButton}
                                        host={host}
                                        theme={theme}
                                        validateEmailInput={validateEmailInput}
                                      />
                                      <div>
                                        <CloseButton />
                                        <h4>החלפת סיסמה</h4>
                                        <br />
                                        <h5>הוראות לאיפוס הסיסמה נשלחו לתיבת הדוא”ל שלך.</h5>
                                        <ItemCenterer>
                                          <Preloader isLoading={this.state.isLoading} />
                                          <Button onClick={closeModal}>התחברות</Button>
                                        </ItemCenterer>
                                      </div>
                                    </div>
                                  )
                                }
                              </LoginDialog>

                              {/* ----------------- Tabs Frame ----------------- */}
                              <TabsFrame
                                activeTab={(flow === 5 || flow === 4) ? 1 : 0}
                                formIndex={activeTab === 0 ? 0 : 1}
                                findRout={findRout}
                                doTransition={doTransition}
                              >
                                {/* TAB 1 */}
                                <PhoneForms
                                  tabname='כניסה באמצעות SMS'
                                  flow={flow}
                                  doTransition={doTransition}
                                  findRout={findRout}
                                  client={client}
                                />

                                {/* TAB 2 */}
                                <div tabname="כניסה באמצעות סיסמה">
                                  <Form
                                    clearFormAfterSubmit={false}
                                    // initialValues={{ email: 'insert email' }}
                                    validate={validateForm}
                                    onSubmit={onSubmit({ login, host, }, this.showError, this.hideError, this.setPreloader )}
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
                                              }}
                                            >
                                              שכחתי סיסמה
                                            </button>
                                          </InputLinkButton>
                                        </div>

                                        {/* TODO: Add Checkbox */}

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
                  );
                }}
              </ApolloConsumer>
            )}
          </FSMLayout>
        )}
      />
    );
  }
}

export default LoginForms;
