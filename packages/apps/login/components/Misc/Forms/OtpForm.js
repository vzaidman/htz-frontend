import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Form, TextInput, Button, Login, } from '@haaretz/htz-components';
import theme from '../../../theme/index';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import {
  saveUserData,
  getUserData,
  getErrors,
  getPhoneNum,
  getOtpHash,
  generateOtp,
  saveOtpHash,
  getEmail,
  getReferrer,
  getUser, retrieveHash,
} from '../../../pages/queryutil/userDetailsOperations';
import { getHost, } from '../../../util/requestUtil';
import { getFacebookLoginUrl, getFacebookParams, } from '../../../util/facebookLoginUtil';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';
import { getReferrerUrl, } from '../../../util/referrerUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smsCode', order: 1, errorText: message, }, ];
const isNumeric = number => Number(number).toString() !== 'NaN';
const validateSmsCodeInput = ({ smsCode, }) => (!isNumeric(smsCode) || !smsCode || smsCode.length !== 5
  ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
  : []);

const getFacebookLogin = user => {
  const facebookParams = getFacebookParams(user);
  return (facebookParams
    ? getFacebookLoginUrl(facebookParams)
    : false);
};

const login = ({ client, host, showError, hideError, setPreloader, eventsTrackers, eventCategory = 'How to login? SMS', loginWithMobile, }) => ({ smsCode, termsChk, otpHash, user, flow, }) => {
  setPreloader(true);
  hideError();
  loginWithMobile(getPhoneNum(client), getEmail(client), smsCode, termsChk, otpHash)
    .then(
      // eslint-disable-next-line no-undef
      () => {
        sendTrackingEvents(eventsTrackers, { page: eventCategory, flowNumber: flow, label: 'connectSMS', })(() => {
          const referrerUrl = getReferrerUrl(client);
          window.location.href = getFacebookLogin(user) || (referrerUrl || `https://www.${host}`);
        }
        );
      },
      reason => {
        setPreloader(false);
        showError((reason.message || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.'));
      }
    );
};

const onSubmit = ({ client, host, user, flow, loginWithMobile, showError, hideError, setPreloader, eventsTrackers, eventCategory, }) => ({ smsCode, termsChk, }) => {
  let otpHash = getOtpHash(client);
  if (typeof otpHash === 'undefined' || otpHash === null) {
    const { ssoId, } = getUser(client);
    const email = getEmail(client);
    retrieveHash(client)({ email, ssoId, })
      .then(
        success => {
          otpHash = success.data.retrieveOtpHash.hash;
          saveOtpHash(client)({ otpHash, });
          login({ client, host, loginWithMobile, showError, hideError, setPreloader, eventsTrackers, eventCategory, })({ smsCode, termsChk, otpHash, user, flow, });
        },
        () => showError('אירעה שגיאה, אנא נסה שנית מאוחר יותר.')
      );
  }
  else {
    login({ client, host, loginWithMobile, showError, hideError, setPreloader, eventsTrackers, })({ smsCode, termsChk, otpHash, user, flow, });
  }
};

const getOtpErrorMessage = msg => (msg.includes('sms')
  ? 'עקב מספר נסיונות כושלים לא ניתן להיכנס כעת.  אנא נסו שנית בעוד 20 דקות.'
  : (msg || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.'));

const handleGenerateOtp = (client, doTransition, showError, hideError, setPreloader) => {
  hideError();
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
        showError(getOtpErrorMessage(json.msg));
      }
    });
};

const hidePhone = (phoneNumber, shouldShow) => (shouldShow
  ? `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7)}`
  : '');

const getMainMessage = (client, isSmsBlocked, showNumber, message) => {
  return !isSmsBlocked ? (
    <h5>
      {message}
      <br />
      <span dir="ltr">{ hidePhone(getUserData(client).phoneNum, showNumber) }</span>
    </h5>
  ) : null;
}

// --------------------------

class OtpForm extends Component {
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
    smsBlocked: false,
  };

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {
    client: PropTypes.object.isRequired,
    doTransition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    client: null,
    getFlowByData: null,
    theme: null,
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  componentDidMount() {
    this.onLoadError();
  }

  onLoadError = (client = this.props.client) => {
    try {
      let incError = getErrors(client);
      if(incError) {
        this.showError(incError);
        this.setState({ smsBlocked: true, });
      }
    } catch(e) {
      
    }
  }

  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  };

  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, doTransition, user, eventsTrackers, flow, eventCategory, showNumber, message, } = this.props;
    const host = getHost(client);
    const MainMessage = () => getMainMessage(client, this.state.smsBlocked, showNumber, message);

    return (
      <FormWrapper>
        <ItemCenterer>
          <MainMessage/>
        </ItemCenterer>
        <Login
          render={({ loginWithMobile, }) => (
            <Form
              clearFormAfterSubmit={false}
              validate={validateSmsCodeInput}
              onSubmit={onSubmit({ host, client, user, flow, loginWithMobile, showError: this.showError, hideError: this.hideError, setPreloader: this.setPreloader, eventsTrackers, eventCategory, })}
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
                        onClick={e => {
                          e.preventDefault();
                          sendTrackingEvents(eventsTrackers, { page: 'How to login? SMS', flowNumber: flow, label: 'sendAgainOtp', })(() => {
                            handleGenerateOtp(client, doTransition, this.showError, this.hideError, this.setPreloader);
                          }
                          );
                        }}
                      >
                        שלח שוב
                      </button>
                    </InputLinkButton>
                  </div>

                  <ErrorBox className={this.state.showError ? '' : 'hidden'}>
                    <span>
                      {this.state.errorMessage}
                    </span>
                  </ErrorBox>

                  <ItemCenterer>
                    <Button isBusy={this.state.isLoading} onClick={handleSubmit}>התחברות</Button>
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
}

export default OtpForm;
