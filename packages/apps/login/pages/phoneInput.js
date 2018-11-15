import React, { Fragment, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { Form, TextInput, Button, HtzLink, } from '@haaretz/htz-components';

import FSMLayout from '../layouts/FSMLayout';

import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../components/StyleComponents/LoginStyleComponents';

import { connectMailWithPhone, getUserData, getEmail, getHostname, } from './queryutil/userDetailsOperations';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];

const isMobile = phone => {
  phone = phone.replace(/[\s\-]/g, '');
  const phoneRegex = /(^05\d{8}$)|(^\+\d{8,13}$)/;
  return phoneRegex.test(phone);
};

const validatePhoneNumber = ({ phoneNumber, }) =>
  (!isMobile(phoneNumber) || !phoneNumber || phoneNumber.length < 10
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
    paramString: btoa(`email=${email}/phone=${phoneNumber}`),
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
// --------------------------

class PhoneInput extends React.Component {
  state = {
    showError: false,
    errorMessage: '',
  };

  showError = (errorMsg) => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  hideError = () => {
    this.setState({ showError: false, errorMessage: "", });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <FSMLayout>
            {({ currentState, findRout, doTransition, }) => (
              <Fragment>
                <ContentWrapper>
                  <FormWrapper>
                    <ItemCenterer>
                      <h5>הזינו מספר טלפון נייד</h5>
                    </ItemCenterer>

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

                    <BottomLinks spacing={2.5}>
                      <HtzLink
                        href={`${findRout('withPassword')}`}
                        onClick={e => {
                          e.preventDefault();
                          const route = doTransition('withPassword');
                          Router.push(route);
                        }}
                      >
                        לא כרגע. כניסה באמצעות סיסמה
                      </HtzLink>
                    </BottomLinks>
                  </FormWrapper>
                </ContentWrapper>
              </Fragment>
            )}
          </FSMLayout>
        )}
      </ApolloConsumer>
    );
  }
}

export default PhoneInput;
