/* global fetch, window */
import React, { Fragment, Component, } from 'react';
import config from 'config';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { HtzLink, Login, Form, TextInput, Button, CheckBox, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';
import { getUser, getEmail, getPhoneNum, getOtpHash, } from './queryutil/userDetailsOperations';

import isEmail from 'validator/lib/isEmail';
import { FelaTheme, } from 'react-fela';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import Preloader from '../components/Misc/Preloader';

import TabsFrame from '../components/Misc/TabsFrame';
import LoginDialog from '../components/Misc/LoginDialog';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { getHost } from '../util/requestUtil';
import { PhoneForms } from '../components/Misc/Forms/PhoneForms';
import PasswordForm from '../components/Misc/Forms/PasswordForm';
import ResetPasswordForm from '../components/Misc/Forms/ResetPasswordForm';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
// --------------------------

// Methods -------------------
const generateError = (name, order) => message => [ { name, order, errorText: message, }, ];
const generateEmailError = message => generateError('email', 1)(message);

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid


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
                  const user = getUser(client);
                  console.log('flow: ', flow, 'active tab: ', activeTab);
                  return (
                    <FelaTheme
                      render={theme => (
                        <Fragment>
                          <ContentWrapper>
                            <FormWrapper>
                              <ItemCenterer>
                                <h5>שלום, באפשרותך להתחבר לאתר בשתי דרכים?</h5>
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
                                        client={client}
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
                                host={host}
                              >
                                {/* TAB 1 */}
                                <PhoneForms
                                  tabname='כניסה עם קוד SMS'
                                  flow={flow}
                                  doTransition={doTransition}
                                  findRout={findRout}
                                  client={client}
                                  user={user}
                                />

                                {/* TAB 2 */}
                                <PasswordForm
                                  tabname='כניסה עם סיסמה'
                                  login={login}
                                  theme={theme}
                                  client={client}
                                  showDialog={this.showDialog}
                                  user={user}
                                />
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
