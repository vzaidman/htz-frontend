import React, { Fragment, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { Form, TextInput, Button, Login, HtzLink, } from '@haaretz/htz-components';

import FSMLayout from '../layouts/FSMLayout';
import { getUserData, getPhoneNum, getOtpHash, } from './queryutil/userDetailsOperations';
import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import GET_HOST from './queries/GetHost';
import OtpForm from '../components/Misc/Forms/OtpForm';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smsCode', order: 1, errorText: message, }, ];
const isNumeric = number => Number(number).toString() !== 'NaN';
const validateSmsCodeInput = ({ smsCode, }) =>
  (!isNumeric(smsCode) || !smsCode || smsCode.length < 1
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

const onSubmit = ({ client, host, loginWithMobile, }) => ({ smsCode, termsChk, }) =>
  loginWithMobile(getPhoneNum(client), smsCode, termsChk, getOtpHash(client))
    .then(
      // eslint-disable-next-line no-undef
      () => { window.location = `https://www.${host}`; },
      reason => console.log(reason.message) // TODO: add error UI
    );

const hidePhone = (phoneNumber) => {
  return phoneNumber.substring(0, 3) + "****" + phoneNumber.substring(7);
}

// --------------------------

const OtpValidation = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
      <ApolloConsumer>
        {client => {
          const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
          return (
            <ContentWrapper>
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
                      onSubmit={onSubmit({ client, host, loginWithMobile, })}
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
                            <InputLinkButton>
                              <button
                                data-role="resend"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const route = doTransition('sendAgain');
                                  Router.push(route);
                                }}
                              >
                                שלח בשנית
                              </button>
                            </InputLinkButton>
                          </div>
                          <ItemCenterer>
                            <Button onClick={handleSubmit}>התחברות</Button>
                          </ItemCenterer>
                        </Fragment>
                      )}
                    />
                  )}
                />
                <BottomLinks spacing={2.5}>
                  <HtzLink
                    href={`${findRout('notMyPhone')}`}
                    onClick={e => {
                      e.preventDefault();
                      const route = doTransition('notMyPhone');
                      Router.push(route);
                    }}
                  >
                    לא הטלפון שלך?
                  </HtzLink>

                  <br />

                  <HtzLink
                    href={`${findRout('withPassword')}`}
                    onClick={e => {
                      e.preventDefault();
                      const route = doTransition('withPassword');
                      Router.push(route);
                    }}
                  >
                    כניסה באמצעות סיסמה
                  </HtzLink>
                </BottomLinks>
              </FormWrapper>

              <OtpForm dataRefs={{host, client, findRoute, doTransition}} />
            </ContentWrapper>
          );
        }}
      </ApolloConsumer>
    )}
  </FSMLayout>
);

export default OtpValidation;
