import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import isEmail from 'validator/lib/isEmail';
import Router from 'next/router';
import objTransform from '../../../util/objectTransformationUtil';
import { storeFlowNumber, } from '../../FlowDispenser/flowStorage';
import { saveUserData, getDataFromUserInfo, saveOtpHash, generateOtp, saveUserEmail, getEmail, mockDataFromUserInfo, } from '../../../pages/queryutil/userDetailsOperations';
import { writeMetaDataToApollo, parseRouteInfo, } from '../../../pages/queryutil/flowUtil';
import Preloader from '../../Misc/Preloader';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { validateMailWithPhone, } from '../../../pages/queryutil/userDetailsOperations';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods ----------------------------
const b64DecodeUnicode = (str) => {
  return str ? decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')) : null;
}

const getUrlParams = () => {
  const pageUrl = new URL(window.location.href);
  return {
    confirmation: pageUrl.searchParams.get('confirmation'),
    ...getParamsData(pageUrl.searchParams.get('params')),
  }
}

const getParamsData = (params) => {
  if(params) {
    const decodedParams = atob(b64DecodeUnicode(params)).split('&');
    return {
      email: decodedParams[0].split('=')[1],
      phone: decodedParams[1].split('=')[1],
    }
  } else {
    return { email: '', phone: '', }
  }
}

const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const vlidateEmailPhoneConnection = (client, email, autoRoute, confirmation) => {
  validateMailWithPhone(client)({ email, confirmation, })
    .then(
      () => {
        return Router.push(autoRoute);
      },
      (error) => {
        showError(error.message)
      }
    );
}

const hasValidatedPhone = (dataSaved) => {
  return dataSaved
        && dataSaved.userData
        && dataSaved.userData.userStatus
        && dataSaved.userData.userStatus.phoneNum
        && dataSaved.userData.userStatus.isMobileValidated;
}

const handleGenerateOtp = ({ phoneNum, email, ssoId, client, flow, route, showError, setPreloader, autoRoute, confirmation, }) =>
  generateOtp(client)({ typeId: phoneNum, })
    .then(data => {
      const json = data.data.generateOtp;
      saveOtpHash(client)({ otpHash: json.hash, });
      if (json.success) {
        if(confirmation) {
          saveUserData(client)({ userData: { phoneNum, ssoId, __typename: "SsoUser", }, });
          vlidateEmailPhoneConnection(client, email, autoRoute, confirmation)
        } else {
          Router.push(route);
        }
      }
      else {
        setPreloader(false);
        showError((json.msg || "אירעה שגיאה, אנא נסה שנית מאוחר יותר."));
      }
    });

const handleResponseFromGraphql =
  ({ client, getFlowByData, email, phone, res, showError, setPreloader, autoRoute, confirmation, }) => {
    const dataSaved = saveUserData(client)({ userData: res.userByMail, });
    const transformedObj = objTransform(res);

    console.log(`data is: ${JSON.stringify(dataSaved)}, email is: ${email}`);

    const flow = getFlowByData(transformedObj.user);
    if(confirmation) {
      flow.flowNumber = 1;
      flow.initialState = "loginFormsOtp";
    }
    storeFlowNumber(client)(flow.flowNumber);

    console.log('**** initial transition', flow.initialTransition);

    const { route, metadata, } = parseRouteInfo(flow.initialTransition);
    writeMetaDataToApollo(client, metadata);

    console.log('***** route', route);

    if (hasValidatedPhone(dataSaved) || confirmation) {
      console.log('mobile is validated / in confirmation phase');
      handleGenerateOtp({
        client,
        email,
        phoneNum: phone || dataSaved.userData.phoneNum,
        ssoId: res.userByMail.ssoId,
        flow,
        route,
        showError,
        setPreloader,
        autoRoute,
        confirmation,
      });
    }
    else {
      console.log('mobile is not validated!!!');
      Router.push(route);
    }
  };

const onSubmit = (client, getFlowByData, showError, hideError, setPreloader, autoRoute, confirmation) => ({ email, phone, }) => {
  hideError();
  setPreloader(true);
  saveUserEmail(client)(email);
  // mockDataFromUserInfo(client)(email)
  getDataFromUserInfo(client)(email)
    .then(res => {
      handleResponseFromGraphql({ client, getFlowByData, email, phone, res, showError, setPreloader, autoRoute, confirmation });
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
  };

  static defaultProps = {
    client: null,
    getFlowByData: null,
    theme: null,
  };
  /* :::::::::::::::::::::::::::::::::::: PROPS } :::::::::::::::::::::::::::::::::::: */

  /* ::::::::::::::::::::::::::::::::::: { METHODS ::::::::::::::::::::::::::::::::::: */
  componentDidMount() {
    this.autoSubmit(this.props);
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

  /**
   * the autoSubmit method runs when the user returns to the login page from a confirmation email
   */
  autoSubmit = ({ client, getFlowByData, }) => {
    const { confirmation, email, phone, } = getUrlParams();
    if(confirmation) {
      const autoSubmitFunction = onSubmit(client, getFlowByData, this.showError, this.hideError, this.setPreloader, '/loginForms', confirmation);
      autoSubmitFunction({ email, phone, });
    }
  }
  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, getFlowByData, theme, } = this.props;
    return (
      <FormWrapper>
        <ItemCenterer>
          <h5>לכניסה או הרשמה לאתר הזינו כתובת דוא”ל</h5>
        </ItemCenterer>
        <Form
          clearFormAfterSubmit={false}
          // initialValues={{ email: 'insert email' }}
          validate={validateEmailInput}
          onSubmit={onSubmit(client, getFlowByData, this.showError, this.hideError, this.setPreloader)}
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

              <ErrorBox className={this.state.showError ? "" : "hidden"}>
                <span>
                  {this.state.errorMessage}
                </span>
              </ErrorBox>

              <ItemCenterer>
                <Preloader isLoading={this.state.isLoading} />
                <Button onClick={handleSubmit}>המשך</Button>
              </ItemCenterer>
            </Fragment>
          )}
        />
      </FormWrapper>
    )
    /* :::::::::::::::::::::::::::::::::::: RENDER } :::::::::::::::::::::::::::::::::::: */
  }
};

export default IndexForm;
