/* global fetch, window */
import React, { Fragment, Component, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';
import isEmail from 'validator/lib/isEmail';
import { FelaTheme, } from 'react-fela';

import { EventTracker, HtzLink, Login, Button, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';
import { getUser, isEnterWithSms, } from './queryutil/userDetailsOperations';

import BottomLinks from '../components/Misc/BottomLinks';
import { LoginContentStyles, } from '../components/StyleComponents/LoginStyleComponents';
import Preloader from '../components/Misc/Preloader';

import TabsFrame from '../components/Misc/TabsFrame';
import LoginDialog from '../components/Misc/LoginDialog';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { getHost, } from '../util/requestUtil';
import { PhoneForms, } from '../components/Misc/Forms/PhoneForms';
import PasswordForm from '../components/Misc/Forms/PasswordForm';
import ResetPasswordForm from '../components/Misc/Forms/ResetPasswordForm';
import { sendTrackingEvents, } from '../util/trackingEventsUtil';

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

const getUserFromApollo = (client) => {
  try {
    return getUser(client);
  }
  catch(e) {
    return false;
  }
}

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

  setPreloader = isLoadingStatus => {
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
        render={({ login, }) => (
          <FSMLayout>
            {({ currentState, findRout, doTransition, }) => (
              <ApolloConsumer>
                {client => {
                  const host = getHost(client);
                  const flow = getFlowNumber(client);
                  const user = getUserFromApollo(client);
                  const activeTab = '2345'.includes(flow) ? 0 : 1;
                  return (
                    <FelaTheme
                      render={theme => (
                        <Fragment>
                          <EventTracker>
                            {({ biAction, gaAction, gaMapper, }) => (
                              <ContentWrapper>
                                <FormWrapper>
                                  <ItemCenterer>
                                    <h5>באפשרותכם להתחבר לאתר בשתי דרכים</h5>
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
                                            flow={flow}
                                            eventsTrackers={{ biAction, gaAction, }}
                                          />
                                          <div>
                                            <CloseButton />
                                            <h4>החלפת סיסמה</h4>
                                            <br />
                                            <h5>הוראות לאיפוס הסיסמה נשלחו לתיבת הדוא”ל שלך</h5>
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
                                    activeTab={isEnterWithSms(client) ? 0 : 1}
                                    formIndex={activeTab === 0 ? 0 : 1}
                                    findRout={findRout}
                                    doTransition={doTransition}
                                    host={host}
                                    flow={flow}
                                    eventsTrackers={{ biAction, gaAction, }}
                                  >
                                    {/* TAB 1 */}
                                    <PhoneForms
                                      tabname="כניסה עם קוד SMS"
                                      flow={flow}
                                      message="להתחברות הזינו את הקוד שנשלח למספר"
                                      doTransition={doTransition}
                                      findRout={findRout}
                                      client={client}
                                      user={user}
                                      eventsTrackers={{ biAction, gaAction, }}
                                      label="withSms"
                                      showNumber
                                    />

                                    {/* TAB 2 */}
                                    <PasswordForm
                                      tabname="כניסה עם סיסמה"
                                      login={login}
                                      theme={theme}
                                      client={client}
                                      showDialog={this.showDialog}
                                      user={user}
                                      flow={flow}
                                      eventsTrackers={{ biAction, gaAction, }}
                                      label="withPassword"
                                    />
                                  </TabsFrame>

                                  <BottomLinks spacing={2.5}>
                                    <span>עדיין לא רשומים? </span>
                                    <HtzLink
                                      href={`${findRout('registration')}`}
                                      onClick={e => {
                                        e.preventDefault();
                                        const route = doTransition('registration');
                                        sendTrackingEvents({ biAction, gaAction, }, { page: 'How to login?', flowNumber: flow, label: 'registrationPage', })(() => {
                                          Router.push(route);
                                        }
                                        );
                                      }}
                                    >
                                      הירשמו
                                    </HtzLink>
                                  </BottomLinks>
                                </FormWrapper>
                              </ContentWrapper>
                            )}
                          </EventTracker>
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
