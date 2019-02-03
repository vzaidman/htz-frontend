import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import { UserTransformations, } from '@haaretz/htz-user-utils';
import isEmail from 'validator/lib/isEmail';
import Router from 'next/router';
import objTransform from '../../../util/objectTransformationUtil';
import { storeFlowNumber, } from '../../FlowDispenser/flowStorage';
import {
  saveUserData,
  getDataFromUserInfo,
  saveUserEmail,
  validateMailWithPhone,
  validateMailConfirmation,
  sendMailConfirmation,
  saveIsEnterWithSms,
  getUserProducts,
} from '../../../pages/queryutil/userDetailsOperations';
import { writeMetaDataToApollo, parseRouteInfo, } from '../../../pages/queryutil/flowUtil';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { getFacebookLoginUrl, getFacebookParams, } from '../../../util/facebookLoginUtil';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';
import { getReferrerUrl, } from '../../../util/referrerUtil';
import { getAndSaveDebtParams, getDebtReferrer, } from '../../../util/debtCheckUtil';
import { getHost, } from '../../../util/requestUtil';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods ----------------------------
const getFacebookLogin = user => {
  const facebookParams = getFacebookParams(user);
  return facebookParams
    ? getFacebookLoginUrl(facebookParams)
    : false;
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

const getProducts = (client, ssoId) => {
  return getUserProducts(client)({ id: ssoId, });
}

const checkIfLoggedin = (client, { isLoggedIn, user, }) => {
  if (isLoggedIn) {
    const host = getHost(client);
    const { facebook, } = getUrlParams();
    const facebookUser = {
      facebook,
      subscription: user.type,
      ssoId: user.id,
    };

    if(getAndSaveDebtParams(client)) {
      getProducts(client, user.id)
      .then(
        (res) => {
          window.location.href = getDebtReferrer(res) || `https://www.${host}`;
        },
        (res) => {
          console.log("debt - err");
          window.location.href = `https://www.${host}`;
        },
      );
    } else {
      // eslint-disable-next-line no-undef
      window.location = (getFacebookLogin(facebookUser) || (getReferrerUrl(client) || `https://www.${host}`)) || false;
    }
  }
};

const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) => (!email
  ? generateEmailError('אנא הזינו כתובת דוא”ל')
  : !isEmail(email)
    ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
    : []); // email is valid

const hasValidatedEmail = dataSaved => dataSaved
        && dataSaved.userData
        && dataSaved.userData.userStatus
        && dataSaved.userData.userStatus.isEmailValidated;

const setFacebookParamsOnApollo = client => {
  const { facebook, } = getUrlParams();
  if (facebook && facebook.token && facebook.redirect) {
    saveUserData(client)({ userData: { facebook, __typename: 'SsoUser', }, });
  }
};

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
  getAndSaveDebtParams(client);
  const dataSaved = saveUserData(client)({ userData: res.userByMail, });
  const transformedObj = objTransform(res);
  const flow = getFlowByData(transformedObj.user);
  storeFlowNumber(client)(flow.flowNumber);
  const eventsHandler = sendTrackingEvents(eventsTrackers, { page: 'Main Login', flowNumber: flow.flowNumber, label: 'proceedEmail', });
  const { route, metadata, } = parseRouteInfo(flow.initialTransition);
  writeMetaDataToApollo(client, metadata);

  setFacebookParamsOnApollo(client);

  const phoneNum = phone || (dataSaved && dataSaved.userData
    ? dataSaved.userData.phoneNum
    : null);
  const ssoId = (res && res.userByMail ? res.userByMail.ssoId : null);
  saveUserData(client)({
    userData: { phone: phoneNum, ssoId, __typename: 'SsoUser', },
  });

  if (dataSaved && dataSaved.userData && !hasValidatedEmail(dataSaved)) {
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
    client: PropTypes.shape().isRequired,
    getFlowByData: PropTypes.func.isRequired,
    theme: PropTypes.shape().isRequired,
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
    checkIfLoggedin(this.props.client, this.props.userDispenser);
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
    // eslint-disable-next-line no-undef
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
      saveIsEnterWithSms(client)(true);
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
    }
    else if (type === 'reevaluate') {
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
                  name: 'userName',
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
