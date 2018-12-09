import React, { Fragment, } from 'react';
import Router from 'next/router';

import { Form, TextInput, Button, HtzLink, } from '@haaretz/htz-components';

import theme from '../../../theme';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../../components/StyleComponents/LoginStyleComponents';

import { connectMailWithPhone, getUserData, getEmail, getHostname, saveUserData, } from '../../../pages/queryutil/userDetailsOperations';
import { getFlowNumber, } from '../../../components/FlowDispenser/flowStorage';
import { isName, isMobile, isPassword, } from './fieldsValidators';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];

const validatePhoneNumber = ({ phoneNumber, }) =>
  (!isMobile(phoneNumber) || !phoneNumber || phoneNumber.length < 10
    ? generateSmsCodeError('אנא הזינו מספר טלפון נייד')
    : []);

const getEmailUrl = (hostname) => {
  return (hostname.includes("login-dev.") || hostname.includes("login.")) ?
    `https://${hostname}` : `http://${hostname}:3000`;
}

const cleanPhoneNumber = phoneNumber => {
  return phoneNumber ? phoneNumber.replace(/[\s\-]/g, '') : phoneNumber;
}

const onSubmit = ({ doTransition, client, showError, hideError, setPreloader, eventsTrackers, }) => ({ phoneNumber, }) => {
  setPreloader(true);
  hideError();
  const userData = getUserData(client);
  const email = getEmail(client);
  const flow = getFlowNumber(client);
  phoneNumber = cleanPhoneNumber(phoneNumber);
  connectMailWithPhone(client)({
    email,
    userName: userData.firstName || email,
    phone: phoneNumber,
    paramString: JSON.stringify({ email, phone: phoneNumber, }),
    url: getEmailUrl(getHostname(client)),
  }).then(
    () => {
      saveUserData(client)({ userData: { phoneNum: phoneNumber, __typename: "SsoUser", }, });
      const route = doTransition('accept');
      sendTrackingEvents(eventsTrackers, { page: 'How to login? SMS', flowNumber: flow, label: 'connectSMS', });
      Router.push(route);
    },
    error => {
      setPreloader(false);
      showError(error.message)
    }
  );
};

class PhoneInputForm extends React.Component {
  state = {
    showError: false,
    errorMessage: '',
    isLoading: false,
  };

  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  setPreloader = isLoadingStatus => {
    this.setState({ isLoading: !!isLoadingStatus, });
  };

  render() {
    const { client, findRout, doTransition, eventsTrackers, } = this.props;
    return (
      <ContentWrapper>
        <FormWrapper>
          <Form
            clearFormAfterSubmit={false}
            // initialValues={{ email: 'insert email' }}
            validate={validatePhoneNumber}
            onSubmit={onSubmit({
              doTransition,
              client,
              showError: this.showError,
              hideError: this.hideError,
              setPreloader: this.setPreloader,
              eventsTrackers,
            })}
            render={({ getInputProps, handleSubmit, clearForm, }) => (
              <Fragment>
                <div>
                  <TextInput
                    type="tel"
                    label={theme.emailInputLabel}
                    noteText="אנא הזינו מספר טלפון נייד"
                    requiredText={{
                      long: 'אנא הזינו מספר טלפון נייד',
                      short: '*',
                    }}
                    {...getInputProps({
                      name: 'phoneNumber',
                      label: 'מספר טלפון נייד',
                      type: 'tel',
                    })}
                  />
                </div>

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
      </ContentWrapper>
    );
  }
}

export { PhoneInputForm, };
