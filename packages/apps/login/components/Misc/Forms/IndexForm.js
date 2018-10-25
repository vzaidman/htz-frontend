import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import isEmail from 'validator/lib/isEmail';
import Router from 'next/router';
import objTransform from '../../../util/objectTransformationUtil';
import { storeFlowNumber, } from '../../FlowDispenser/flowStorage';
import { saveUserData, getDataFromUserInfo, saveOtpHash, generateOtp, mockDataFromUserInfo, } from '../../../pages/queryutil/userDetailsOperations';
import { writeMetaDataToApollo, parseRouteInfo, } from '../../../pages/queryutil/flowUtil';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';

// Styling Components -----------------
const { FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// ------------------------------------

// Methods ----------------------------
const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
(!email
  ? generateEmailError('אנא הזינו כתובת דוא”ל')
  : !isEmail(email)
  ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
  : []); // email is valid

const handleGenerateOtp = ({ phoneNum, client, flow, route, showError, hideError, }) =>
  generateOtp(client)({ typeId: phoneNum, })
    .then(data => {
      const json = data.data.generateOtp;
      saveOtpHash(client)({ otpHash: json.hash, });
      if (json.success) {
        Router.push(route);
      }
      else {
        showError(json.msg);
      }
  });

const handleResponseFromGraphql = ({ client, getFlowByData, email, res, showError, hideError, }) => {
  const dataSaved = saveUserData(client)({ userData: res.userByMail, });
  const transformedObj = objTransform(res);

  console.log(`data is: ${JSON.stringify(dataSaved)}, email is: ${email}`);

  const flow = getFlowByData(transformedObj.user);
  storeFlowNumber(client)(flow.flowNumber);

  console.log('**** initial transition', flow.initialTransition);

  const { route, metadata, } = parseRouteInfo(flow.initialTransition);
  writeMetaDataToApollo(client, metadata);

  console.log('***** route', route);

  if (dataSaved.userData.userStatus.isMobileValidated) {
    console.log('mobile is validated!!!!');
    handleGenerateOtp({ client, phoneNum: dataSaved.userData.phoneNum, flow, route, showError, hideError, });
  }
  else {
    console.log('mobile is not validated!!!');
    Router.push(route);
  }
};

const onSubmit = (client, getFlowByData, showError, hideError) => ({ email, }) => {
  // mockDataFromUserInfo(client)(email)
  getDataFromUserInfo(client)(email)
    .then(res => handleResponseFromGraphql({ client, getFlowByData, email, res, showError, hideError, }))
    // TODO handle error
    .catch(err => console.error(err));
};
// ------------------------------------

class IndexForm extends Component {

  state = {
    showError: false,
    errorMessage: '',
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
  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  }
  /* ::::::::::::::::::::::::::::::::::: METHODS } ::::::::::::::::::::::::::::::::::: */

  render() {
    /* :::::::::::::::::::::::::::::::::::: { RENDER :::::::::::::::::::::::::::::::::::: */
    const { client, getFlowByData, theme } = this.props;
    return (
      <FormWrapper>
        <ItemCenterer>
          <h5>לכניסה או הרשמה לאתר הזינו כתובת דוא”ל</h5>
        </ItemCenterer>
        <Form
          clearFormAfterSubmit={false}
          // initialValues={{ email: 'insert email' }}
          validate={validateEmailInput}
          onSubmit={onSubmit(client, getFlowByData, this.showError, this.hideError)}
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