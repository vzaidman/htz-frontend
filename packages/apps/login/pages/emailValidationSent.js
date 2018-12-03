import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { EventTracker, ApolloConsumer, } from '@haaretz/htz-components';
import { getEmail, sendMailConfirmation, } from './queryutil/userDetailsOperations';
import { getHost, } from '../util/requestUtil';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { sendTrackingEvents, } from '../util/trackingEventsUtil';
import BottomLinks from '../components/Misc/BottomLinks';
import Preloader from '../components/Misc/Preloader';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { TextBox, ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

const sendEmailAgain = (client, route, showError, hideError, setPreloader) => {
  setPreloader(true);
  hideError();
  const email = getEmail(client);
  const prefix = /(https?:\/\/\D*).(haaretz.co.il|themarker.com|haaretz.com).*/.exec(window.location.origin)[1];
  sendMailConfirmation(client)({ 
    email,
    url: `${prefix}.${getHost(client)}`,
    paramString: JSON.stringify({ email, }),
   }).then(
    () => {
      Router.push(route);
    },
    error => {
      setPreloader(false);
      showError((error.message || 'אירעה שגיאה'));
    }
  );
}

class EmailValidationSent extends React.Component {
  state = {
    firstTime: true,
    isLoading: false,
    showError: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.setState({ firstTime: true, });
  }

  shouldComponentUpdate() {
    return false;
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  render() {
    return this.state.firstTime ? (
      <ApolloConsumer>
        {client => {
          const flow = getFlowNumber(client);
          return (
            <FSMLayout>
              {({ currentState, findRout, doTransition, }) => (
                <Fragment>
                  <EventTracker>
                    {({ biAction, gaAction, gaMapper, }) => (
                      <ContentWrapper>
                        <FormWrapper>
                          <TextBox>
                            <h5>נשלח אליכם דוא"ל</h5>
                            <span>
                              יש ללחוץ על כפתור האישור בדוא"ל שקיבלתם להמשך הגלישה באתר
                            </span>
                          </TextBox>

                          <br/>
                          <ItemCenterer>
                            <Preloader isLoading={this.state.isLoading} />
                          </ItemCenterer>

                          <ErrorBox className={this.state.showError ? '' : 'hidden'}>
                            <span>
                              {this.state.errorMessage}
                            </span>
                          </ErrorBox>

                          <BottomLinks spacing={1}>
                            <span>הדוא"ל לא הגיע? </span>
                            <HtzLink
                              href={`${findRout('sendAgain')}`}
                              onClick={e => {
                                e.preventDefault();
                                sendTrackingEvents({ biAction, gaAction, }, { page: 'Email validation 1', flowNumber: flow, label: 'sendAgainAddressEmail', })(() => {
                                    sendEmailAgain(client, doTransition('sendAgain'), this.showError, this.hideError, this.setPreloader);
                                  }
                                );
                              }}
                            >
                              אנא נסו בשנית
                            </HtzLink>
                            <br />
                            <HtzLink
                              href={`${findRout('notRegistered')}`}
                              onClick={e => {
                                e.preventDefault();
                                const route = doTransition('notRegistered');
                                sendTrackingEvents({ biAction, gaAction, }, { page: 'Email validation 1', flowNumber: flow, label: 'registrationPage', })(() => {
                                    Router.push(route);
                                  }
                                );
                              }}
                            >
                              או הירשם לאתר
                            </HtzLink>
                          </BottomLinks>
                        </FormWrapper>
                      </ContentWrapper>
                    )}
                  </EventTracker>
                </Fragment>
              )}
            </FSMLayout>
          );
        }}
      </ApolloConsumer>
    ) : null;
  }
}

export default EmailValidationSent;
