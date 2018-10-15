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
const generateError = (name, order) => message => [ { name: name, order: order, errorText: message, }, ];
const generateEmailError = message => generateError('email', 1)(message)
const generatePasswordError = message => generateError('password', 2)(message)

const isPassword = password => password.length > 0; // TODO: write proper password validation

const validateEmailInput = ({ email, }) =>
  (!email
    ? generateEmailError('אנא הזינו כתובת דוא”ל')
    : !isEmail(email)
      ? generateEmailError('אנא הזינו כתובת דוא”ל תקינה')
      : []); // email is valid

const validatePasswordInput = ({ password, }) =>
  (!password
    ? generatePasswordError('אנא הזינו סיסמה')
    : !isPassword(password) 
      ? generatePasswordError('אנא הזינו סיסמה תקינה')
      : []); // email is valid

const onSubmit = () => {
  console.log('submit');
};

const valdiateForm = ({ email, password, }) => {
  let errors = [];
  if (email != null) {
    errors = [ ...validateEmailInput({ email, }), ]
  }
  if (password != null) {
    errors = [ ...errors, ...validatePasswordInput({ password, }), ]
  }
  console.log(errors.map(arr => JSON.stringify(arr)))
  return errors;
}

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

const Password = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
      <FelaTheme
        render={theme => (
          <Fragment>
            <ContentWrapper>
              <FormWrapper>
                <ItemCenterer>
                  <h5>שלום, כיצד תרצה/י להתחבר לחשבונך?</h5>
                </ItemCenterer>

                <TopLinks>
                  <span>
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
                  </span>

                  <span className="on">
                    <HtzLink
                      href="/password"
                      onClick={e => {
                        e.preventDefault();
                      }}
                    >
                      כניסה באמצעות סיסמה
                    </HtzLink>
                  </span>
                </TopLinks>

                <Form
                  clearFormAfterSubmit={false}
                  // initialValues={{ email: 'insert email' }}
                  validate={valdiateForm}
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
                          type="password"
                          label={theme.passwordInputLabel}
                          noteText="אנא הזינו סיסמה"
                          requiredText={{
                            long: theme.passwordInputRequiredLong,
                            short: theme.passwordInputRequiredShort,
                          }}
                          {...getInputProps({
                            name: 'password',
                            label: theme.passwordInputLabel,
                            type: 'password',
                          })}
                        />
                        <InputLinkButton>
                          <span
                            onClick={() => {
                              // const route = doTransition('otpValidation2');
                              // Router.push(route);
                            }}
                          >
                            שכחתי סיסמה
                          </span>
                        </InputLinkButton>
                      </div>
                      <ItemCenterer>
                        <Button onClick={handleSubmit}>התחברות</Button>
                      </ItemCenterer>
                    </Fragment>
                  )}
                />

                <BottomLinks spacing={2.5}>
                  <span>עדיין לא רשומים? </span>
                  <HtzLink
                    href={`${findRout('registration')}`}
                    onClick={e => {
                      e.preventDefault();
                      const route = doTransition('registration');
                      Router.push(route);
                    }}
                  >
                    הירשמו
                  </HtzLink>
                </BottomLinks>
                
              </FormWrapper>
            </ContentWrapper>
          </Fragment>
        )}
      />
    )}
  </FSMLayout>
);

export default Password;
