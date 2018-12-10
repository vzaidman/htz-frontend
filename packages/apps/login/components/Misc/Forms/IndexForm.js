import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import { UserTransformations, CookieUtils, } from '@haaretz/htz-user-utils';
import isEmail from 'validator/lib/isEmail';
import Router from 'next/router';
import objTransform from '../../../util/objectTransformationUtil';
import { storeFlowNumber, } from '../../FlowDispenser/flowStorage';
import {
  saveUserData,
  getDataFromUserInfo,
  saveOtpHash,
  generateOtp,
  saveUserEmail,
  validateMailWithPhone,
  validateMailConfirmation,
  sendMailConfirmation,
} from '../../../pages/queryutil/userDetailsOperations';
import { writeMetaDataToApollo, parseRouteInfo, } from '../../../pages/queryutil/flowUtil';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';
import { getReferrerUrl, } from '../../../util/referrerUtil';
import { getHost, } from '../../../util/requestUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods ----------------------------
const checkIfLoggedin = client => {
  const host = getHost(client);
  return CookieUtils.getCookie('tmsso') ?
    window.location = (getReferrerUrl(client) || `https://www.${host}`) : false;
};

const b64DecodeUnicode = str => (str
  // eslint-disable-next-line no-undef
  ? decodeURIComponent(atob(str).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''))
  : null);

const getParamsData = params => { // TODO add fields to retreive from params
  if (params) {
    const decodedParams = JSON.parse(b64DecodeUnicode(params));
    return {
      email: decodedParams.email,
      phone: decodedParams.phone,
    };
  }
  return { email: '', phone: '', };
};

const getUrlParams = () => {
  // eslint-disable-next-line no-undef
  const pageUrl = new URL(window.location.href);
  return {
    confirmation: (pageUrl.searchParams.get('confirmation') ? pageUrl.searchParams.get('confirmation').split(' ').join('+') : null),
    type: pageUrl.searchParams.get('type'),
    ...getParamsData(pageUrl.searchParams.get('params')),
    facebook: {
      token: pageUrl.searchParams.get('account_linking_token'),
      redirect: pageUrl.searchParams.get('redirect_uri'),
      __typename: 'facebookLogin',
    },
  };
};

const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const getUserData = (dataSaved = '') => dataSaved.userData;

const hasValidatedPhone = dataSaved => dataSaved
        && dataSaved.userData
        && dataSaved.userData.userStatus
        && dataSaved.userData.userStatus.isMobileValidated
        && dataSaved.userData.phoneNum;

const hasValidatedEmail = dataSaved => dataSaved
        && dataSaved.userData
        && dataSaved.userData.userStatus
        && dataSaved.userData.userStatus.isEmailValidated;

const hasCrmStatus = dataSaved => (dataSaved
  && dataSaved.userData
  && dataSaved.userData.userCrmStatus
  ? dataSaved.userData.userCrmStatus
  : false);

const hasActiveSub = dataSaved => {
  const crmStatus = hasCrmStatus(dataSaved);
  return crmStatus &&
        (crmStatus.isActiveTm || crmStatus.isActiveHeb);
};

const isEmailValidationRequired = dataSaved =>
  !hasActiveSub(dataSaved) && !hasValidatedEmail(dataSaved);

const setFacebookParamsOnApollo = client => {
  const { facebook, } = getUrlParams();
  if (facebook && facebook.token && facebook.redirect) {
    saveUserData(client)({ userData: { facebook, __typename: 'SsoUser', }, });
  }
  else {
    const facebookEmpty = { token: null, redirect: null, __typename: 'facebookLogin', };
    saveUserData(client)({ userData: { facebook: facebookEmpty, __typename: 'SsoUser', }, });
  }
};

const handleGenerateOtp = ({
  phoneNum,
  email,
  ssoId,
  client,
  flow,
  route,
  showError,
  setPreloader,
  eventsHandler,
}) =>
  generateOtp(client)({ typeId: phoneNum, })
    .then(data => {
      const json = data.data.generateOtp;
      saveOtpHash(client)({ otpHash: json.hash, });
      if (json.success) {
        saveUserData(client)({ userData: { phoneNum, ssoId, __typename: 'SsoUser', }, });
        eventsHandler(() => {
          Router.push(route);
        });
      }
      else {
        setPreloader(false);
        showError((json.msg || 'אירעה שגיאה, אנא נסה שנית מאוחר יותר.'));
      }
    });

const handleResponseFromGraphql = ({
  client,
  getFlowByData,
  email,
  phone,
  res,
  showError,
  setPreloader,
  eventsTrackers,
}) => {
  const dataSaved = saveUserData(client)({ userData: res.userByMail, });
  const transformedObj = objTransform(res);
  const flow = getFlowByData(transformedObj.user);
  storeFlowNumber(client)(flow.flowNumber);
  const eventsHandler = sendTrackingEvents(eventsTrackers, { page: 'Main Login', flowNumber: flow.flowNumber, label: 'proceedEmail', });
  const { route, metadata, } = parseRouteInfo(flow.initialTransition);
  writeMetaDataToApollo(client, metadata);

  setFacebookParamsOnApollo(client);

  if (!isEmailValidationRequired(dataSaved) && hasValidatedPhone(dataSaved)) {
    handleGenerateOtp({
      client,
      email,
      phoneNum: phone ||
        (dataSaved && dataSaved.userData
          ? dataSaved.userData.phoneNum
          : null),
      ssoId: (res && res.userByMail ? res.userByMail.ssoId : null),
      flow,
      route,
      showError,
      setPreloader,
      eventsHandler,
    });
  }
  else if (dataSaved && dataSaved.userData && !hasValidatedEmail(dataSaved)) {
    // eslint-disable-next-line no-undef
    const prefix = /(https?:\/\/\D*).(haaretz.co.il|themarker.com|haaretz.com).*/.exec(window.location.origin)[1];
    sendMailConfirmation(client)({
      email,
      url: `${prefix}.${getHost(client)}`,
      paramString: JSON.stringify({ email, }),
    })
      .then(
        () => {
          eventsHandler();
          Router.push(route);
        },
        error => {
          showError((error.message || 'אירעה שגיאה'));
        }
      );
  }
  else {
    eventsHandler();
    Router.push(route);
  }
};

const onSubmit = (
  client,
  getFlowByData,
  showError,
  hideError,
  setPreloader,
  eventsTrackers,
  confirmation,
) => ({ email, phone, }) => {
  hideError();
  setPreloader(true);
  saveUserEmail(client)(email);
  // mockDataFromUserInfo(client)(email)
  getDataFromUserInfo(client)(email)
    .then(res => {
      handleResponseFromGraphql({
        client,
        getFlowByData,
        email,
        phone,
        res,
        showError,
        setPreloader,
        eventsTrackers,
        confirmation,
      });
    })
    .catch(err => {
      setPreloader(false);
      showError('אירעה שגיאה. אנא נסה שנית במועד מאוחר יותר');
    });
};
// ------------------------------------

class IndexForm extends Component {
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  }

  /* :::::::::::::::::::::::::::::::::::: { PROPS :::::::::::::::::::::::::::::::::::: */
  static propTypes = {
    client: PropTypes.object.isRequired,
    getFlowByData: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    gaAction: PropTypes.func,
    biAction: PropTypes.func,
  };

  static defaultProps = {
    client: null,
    getFlowByData: null,
    theme: null,
    gaAction: null,
    biAction: null,
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  componentDidMount() {
    this.setReferrer(this.props.client);
    checkIfLoggedin(this.props.client);
    this.autoSubmit(this.props);
  }

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  setReferrer = client => {
    const referrerUrl = document.referrer;
    saveUserData(client)({ loginReferrer: referrerUrl, });
  }

  /**
   * the autoSubmit method runs when the user returns to the login page from a confirmation email
   */
  autoSubmit = ({ client, getFlowByData, }) => {
    const { confirmation, email, phone, facebook, type, } = getUrlParams();
    const eventsTrackers = { gaAction: this.props.gaAction, biAction: this.props.biAction, };
    const { prefix, suffix, } = UserTransformations.mobileNumberParser(phone);
    if (confirmation && type === 'phoneEmailConnect') {
      validateMailWithPhone(client)({ email, confirmation, mobilePrefix: prefix, mobileNum: suffix, })
        .then(
          () => onSubmit(
            client,
            getFlowByData,
            this.showError,
            this.hideError,
            this.setPreloader,
            eventsTrackers)({ email, phone, }),
          fail => this.showError(fail.message)
        );
    }
    else if (confirmation && type === 'mailValidation') {
      validateMailConfirmation(client)({ email, confirmation, })
        .then(
          () => onSubmit(
            client,
            getFlowByData,
            this.showError,
            this.hideError,
            this.setPreloader,
            eventsTrackers
          )({ email, phone, }),
          fail => this.showError(fail.message)
        );
    } else if (type === 'reevaluate') {
      onSubmit(
        client,
        getFlowByData,
        this.showError,
        this.hideError,
        this.setPreloader,
        eventsTrackers
      )({ email, phone, });
    }
    if (facebook && facebook.token && facebook.redirect) {
      saveUserData(client)({ userData: { facebook, __typename: 'SsoUser', }, });
    }
    else {
      const facebookEmpty = { token: null, redirect: null, __typename: 'facebookLogin', };
      saveUserData(client)({ userData: { facebook: facebookEmpty, __typename: 'SsoUser', }, });
    }
  };
  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, getFlowByData, theme, gaAction, biAction, } = this.props;
    const eventsTrackers = { gaAction, biAction, };
    return (
      <FormWrapper>
        <ItemCenterer>
          <h5>לכניסה או להרשמה לאתר הזינו כתובת דוא”ל</h5>
        </ItemCenterer>
        <Form
          clearFormAfterSubmit={false}
          validate={validateEmailInput}
          onSubmit={onSubmit(client, getFlowByData, this.showError, this.hideError, this.setPreloader, eventsTrackers)}
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
                attrs={{
                  'name': 'userName',
                }}
              />

              <ErrorBox className={this.state.showError ? '' : 'hidden'}>
                <span>
                  {this.state.errorMessage}
                </span>
              </ErrorBox>

              <ItemCenterer>
                <Button isBusy={this.state.isLoading} onClick={handleSubmit}>המשך</Button>
              </ItemCenterer>
            </Fragment>
          )}
        />
      </FormWrapper>
    );
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }
}

export default IndexForm;
