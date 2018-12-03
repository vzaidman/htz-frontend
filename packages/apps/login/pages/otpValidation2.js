import React, { Fragment, Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { EventTracker, Form, TextInput, Button, Login, HtzLink, } from '@haaretz/htz-components';

import FSMLayout from '../layouts/FSMLayout';
import { getUserData, getPhoneNum, getOtpHash, getEmail, } from './queryutil/userDetailsOperations';
import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import Preloader from '../components/Misc/Preloader';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import GET_HOST from './queries/GetHost';
import OtpForm from '../components/Misc/Forms/OtpForm';
import { sendTrackingEvents, } from '../util/trackingEventsUtil';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smsCode', order: 1, errorText: message, }, ];
const isNumeric = number => Number(number).toString() !== 'NaN';
const validateSmsCodeInput = ({ smsCode, }) =>
  (!isNumeric(smsCode) || !smsCode || smsCode.length < 1
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

const onSubmit = ({ client, host, flow, loginWithMobile, showError, hideError, setPreloader, eventsTrackers, }) => ({ smsCode, termsChk, }) => {
  setPreloader(true);
  hideError();
  loginWithMobile(getPhoneNum(client), getEmail(client), smsCode, termsChk, getOtpHash(client))
    .then(
      // eslint-disable-next-line no-undef
      () => {
        sendTrackingEvents(eventsTrackers, { page: 'SMS code 2', flowNumber: flow, label: 'login', })(() => {
            window.location = `https://www.${host}`;
          }
        );
      },
      reason => {
        setPreloader(false);
        showError((reason.message || "אירעה שגיאה, אנא נסה שנית מאוחר יותר."))
      }
    );
}

const hidePhone = phoneNumber => `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7)}`;

// --------------------------

class OtpValidation2 extends Component {

  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  }

  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  }

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  render() {
    return(
      <FSMLayout>
        {({ currentState, findRout, doTransition, }) => (
          <ApolloConsumer>
            {client => {
              const flow = getFlowNumber(client);
              const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
              return (
                <ContentWrapper>
                  <EventTracker>
                    {({ biAction, gaAction, gaMapper, }) => (
                      <FormWrapper>
                        <ItemCenterer>
                          <h5>
                            שלחנו שוב את הקוד
                            אנא הזינו את הקוד שנשלח למספר
                            <br />
                            <span dir="ltr">{ hidePhone(getUserData(client).phoneNum) }</span>
                          </h5>
                        </ItemCenterer>
                        <Login
                          render={({ loginWithMobile, }) => (
                            <Form
                              clearFormAfterSubmit={false}
                              // initialValues={{ email: 'insert email' }}
                              validate={validateSmsCodeInput}
                              onSubmit={onSubmit({ client, host, flow, loginWithMobile, showError: this.showError, hideError: this.hideError, setPreloader: this.setPreloader, eventsTrackers: {biAction, gaAction,}, })}
                              render={({ getInputProps, handleSubmit, clearForm, }) => (
                                <Fragment>
                                  <div>
                                    <TextInput
                                      type="number"
                                      label={theme.emailInputLabel}
                                      noteText="אנא הזינו את הקוד שנשלח אליכם"
                                      requiredText={{
                                        long: 'אנא הזינו את הקוד שנשלח אליכם',
                                        short: '*',
                                      }}
                                      {...getInputProps({
                                        name: 'smsCode',
                                        label: 'קוד אימות',
                                        type: 'text',
                                      })}
                                    />
                                  </div>
        
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
                          )}
                        />
                        <BottomLinks spacing={0}>
                          <span>לא הגיע?</span>
            
                          <br />
            
                          <HtzLink
                            href={`${findRout('withPassword')}`}
                            onClick={e => {
                              e.preventDefault();
                              const route = doTransition('withPassword');
                              sendTrackingEvents({biAction, gaAction,}, { page: 'SMS code 2', flowNumber: flow, label: 'withPassword', })(() => {
                                  Router.push(route);
                                }
                              );
                            }}
                          >
                            כניסה עם סיסמה
                          </HtzLink>
            
                          <br />
            
                          <span>או </span>
                          <HtzLink
                            href="https://www.haaretz.co.il/misc/contact-us"
                            target="_blank"
                            onClick={e => {
                              e.preventDefault();
                              const route = doTransition('withPassword');
                              sendTrackingEvents({biAction, gaAction,}, { page: 'SMS code 2', flowNumber: flow, label: 'getCustomerService', })(() => {
                                  window.open("https://www.haaretz.co.il/misc/contact-us");
                                }
                              );
                            }}
                          >
                            פנו לשירות לקוחות שלנו
                          </HtzLink>
                        </BottomLinks>
                      </FormWrapper>
                    )}
                  </EventTracker>
    
                  {/*<OtpForm dataRefs={{ host, client, findRout, doTransition, }} />*/}
                </ContentWrapper>
              );
            }}
          </ApolloConsumer>
        )}
      </FSMLayout>
    );
  }

}

export default OtpValidation2;
