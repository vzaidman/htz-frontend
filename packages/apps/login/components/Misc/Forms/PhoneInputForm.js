import React, { Fragment, } from 'react';
import Router from 'next/router';

import { Form, TextInput, Button, HtzLink, } from '@haaretz/htz-components';

import theme from '../../../theme';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../../components/StyleComponents/LoginStyleComponents';

import { connectMailWithPhone, getUserData, getEmail, getHostname, } from '../../../pages/queryutil/userDetailsOperations';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];

const isValidPhoneNumber = number => {
  const phoneRegex = /^(\s*|[+0-9]\d{6,})$/;
  return phoneRegex.test(number);
};
const validatePhoneNumber = ({ phoneNumber, }) =>
  (!isValidPhoneNumber(phoneNumber) || !phoneNumber || phoneNumber.length < 10
    ? generateSmsCodeError('אנא הזינו מספר טלפון נייד')
    : []);

const onSubmit = ({ doTransition, client, showError, hideError, }) => ({ phoneNumber, }) => {
  hideError();
  const userData = getUserData(client);
  const email = getEmail(client);
  console.log(userData);
  connectMailWithPhone(client)({
    email,
    userName: userData.firstName,
    phone: phoneNumber,
    paramString: btoa(`email=${email}&phone=${phoneNumber}`),
    url: getHostname(client),
  }).then(
    () => {
      const route = doTransition('accept');
      Router.push(route);
    },
    error => showError(error.message)
  );
};

// const sendAgain = e => {
//   console.log('test...');
// };

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
    const { client, findRout, doTransition, } = this.props;
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
            })}
            render={({ getInputProps, handleSubmit, clearForm, }) => (
              <Fragment>
                <div>
                  <TextInput
                    type="number"
                    label={theme.emailInputLabel}
                    noteText="אנא הזינו מספר טלפון נייד"
                    requiredText={{
                      long: 'אנא הזינו מספר טלפון נייד',
                      short: '*',
                    }}
                    {...getInputProps({
                      name: 'phoneNumber',
                      label: 'מספר טלפון נייד',
                      type: 'text',
                    })}
                  />
                </div>

                <ErrorBox className={this.state.showError ? '' : 'hidden'}>
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
      </ContentWrapper>
    );
  }
}

export { PhoneInputForm, };
