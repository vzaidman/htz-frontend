import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { Form, TextInput, Button, } from '@haaretz/htz-components';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import isEmail from 'validator/lib/isEmail';
import theme from '../theme';
import { FelaTheme, } from 'react-fela';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const {
  PageWrapper,
  ContentWrapper,
  FormWrapper,
  TopLinks,
  ItemCenterer,
} = LoginContentStyles;
const { InputLinkButton, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateEmailError = message => [ { name: 'email', order: 1, errorText: message, }, ];

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const validatePasswordInput = ({ password, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const onSubmit = () => {
  console.log('submit');
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

const OtpValidation = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
      <FelaTheme
        render={theme => (
          <Fragment>
            <ContentWrapper>
              <FormWrapper>
                <ItemCenterer>
                  <h5>הרשמה</h5>
                </ItemCenterer>

                <Form
                  clearFormAfterSubmit={false}
                  // initialValues={{ email: 'insert email' }}
                  validate={validateEmailInput}
                  onSubmit={onSubmit}
                  render={({ getInputProps, handleSubmit, clearForm, }) => (
                    <Fragment>
                      <div>
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
                      </div>

                      <div>
                        <TextInput
                          type="email"
                          label={theme.emailInputLabel}
                          noteText="אנא הזינו סיסמה"
                          requiredText={{
                            long: theme.emailInputRequiredLong,
                            short: theme.emailInputRequiredShort,
                          }}
                          {...getInputProps({
                            name: 'password',
                            label: theme.passwordInputLabel,
                            type: 'password',
                          })}
                        />
                      </div>

                      <div>
                        <TextInput
                          type="email"
                          label={theme.phoneInputLabel}
                          noteText="אנא הזינו קידומת ומספר סלולרי"
                          requiredText={{
                            long: theme.phoneInputRequiredLong,
                            short: theme.phoneInputRequiredShort,
                          }}
                          {...getInputProps({
                            name: 'phone',
                            label: theme.phoneInputLabel,
                            type: 'tel',
                          })}
                        />
                      </div>
                      <ItemCenterer>
                        <Button onClick={handleSubmit}>הרשמה</Button>
                      </ItemCenterer>
                    </Fragment>
                  )}
                />

                <BottomLinks spacing={2.5}>
                  <span>כבר רשומים? </span>
                  <HtzLink
                    href={`${findRout('backToLogin')}`}
                    onClick={e => {
                      e.preventDefault();
                      const route = doTransition('backToLogin');
                      Router.push(route);
                    }}
                  >
                    התחברו
                  </HtzLink>
                </BottomLinks>

                {/* <BottomLinks>
                  <HtzLink
                    href={`${findRout('withSms')}`}
                    onClick={e => {
                      e.preventDefault();
                      const route = doTransition('withSms');
                      Router.push(route);
                    }}
                  >
                    כניסה באמצעות SMS
                  </HtzLink>
                </BottomLinks> */}
              </FormWrapper>
            </ContentWrapper>
          </Fragment>
        )}
      />
    )}
  </FSMLayout>
);

export default OtpValidation;
