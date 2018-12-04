import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Form, TextInput, Button, Login, } from '@haaretz/htz-components';
import theme from '../../../theme/index';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { getUserData, getPhoneNum, getOtpHash, generateOtp, saveOtpHash, getEmail, getReferrer, } from '../../../pages/queryutil/userDetailsOperations';
import { getHost, } from '../../../util/requestUtil';
import Preloader from '../../Misc/Preloader';
import { getFacebookLoginUrl, getFacebookParams, } from '../../../util/facebookLoginUtil';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smsCode', order: 1, errorText: message, }, ];
const isNumeric = number => Number(number).toString() !== 'NaN';
const validateSmsCodeInput = ({ smsCode, }) =>
  (!isNumeric(smsCode) || !smsCode || smsCode.length !== 5
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

const getFacebookLogin = user => {
  const facebookParams = getFacebookParams(user);
  return facebookParams ?
    getFacebookLoginUrl(facebookParams) :
    false;
};

const getReferrerUrl = (client) => {
  try {
    const referrerUrl = getReferrer(client);
    const urlRegex = /(login-dev)|(login)|(:3000)/;
    return !urlRegex.test(referrerUrl) ? referrerUrl : false;
  } catch(e) {
    return false;
  }
}

const onSubmit = ({ client, host, user, flow, loginWithMobile, showError, hideError, setPreloader, eventsTrackers, }) => ({ smsCode, termsChk, }) => {
  setPreloader(true);
  hideError();
  loginWithMobile(getPhoneNum(client), getEmail(client), smsCode, termsChk, getOtpHash(client))
    .then(
      // eslint-disable-next-line no-undef
      () => {
        sendTrackingEvents(eventsTrackers, { page: 'How to login? SMS', flowNumber: flow, label: 'connectSMS', })(() => {
            const referrerUrl = getReferrerUrl(client);
            window.location = getFacebookLogin(user) || (referrerUrl || `https://www.${host}`);
          }
        );
      },
      reason => {
        setPreloader(false);
        showError((reason.message || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.'));
      }
    );
};

const handleGenerateOtp = (client, doTransition, setPreloader) => {
  setPreloader(true);
  generateOtp(client)({ typeId: getUserData(client).phoneNum, })
    .then(data => {
      const json = data.data.generateOtp;
      saveOtpHash(client)({ otpHash: json.hash, });

      if (json.success) {
        const route = doTransition('sendAgain');
        Router.push(route);
      }
      else {
        setPreloader(false);
        showError((json.msg || "אירעה שגיאה, אנא נסה שנית מאוחר יותר."));
      }
    });
}
    
const hidePhone = phoneNumber => {
  return phoneNumber.substring(0, 3) + "****" + phoneNumber.substring(7);
}

// --------------------------

class OtpForm extends Component {
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  };

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {
    client: PropTypes.object.isRequired,
    findRout: PropTypes.func.isRequired,
    doTransition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    client: null,
    getFlowByData: null,
    theme: null,
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  };

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  };

  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, findRout, doTransition, user, eventsTrackers, flow, } = this.props;
    const host = getHost(client);

    return (
      <FormWrapper>
        <ItemCenterer>
          <h5>
            להתחברות הזינו את הקוד שנשלח למספר
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
              onSubmit={onSubmit({ host, client, user, flow, loginWithMobile, showError: this.showError, hideError: this.hideError, setPreloader: this.setPreloader, eventsTrackers, })}
              render={({ getInputProps, handleSubmit, clearForm, }) => (
                <Fragment>
                  <div>
                    <TextInput
                      type="tel"
                      label={theme.emailInputLabel}
                      noteText="אנא הזינו את הקוד שנשלח אליכם"
                      requiredText={{
                        long: 'אנא הזינו את הקוד שנשלח אליכם',
                        short: '*',
                      }}
                      {...getInputProps({
                        name: 'smsCode',
                        label: 'קוד אימות',
                        type: 'tel',
                      })}
                    />
                    <InputLinkButton>
                      <button
                        data-role="resend"
                        onClick={(e) => {
                          e.preventDefault();
                          sendTrackingEvents(eventsTrackers, { page: 'SMS code', flowNumber: flow, label: 'sendAgainOtp', })(() => {
                            handleGenerateOtp(client, doTransition, this.setPreloader);
                            }
                          );
                        }}
                      >
                        שלח שוב
                      </button>
                    </InputLinkButton>
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
      </FormWrapper>
    );
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }
};

export default OtpForm;
