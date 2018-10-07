import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { Form, TextInput, Button, } from '@haaretz/htz-components';
import theme from '../theme/index';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import BottomLinks from '../components/Misc/BottomLinks';

// Styling Components -------
const { PageWrapper, ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { InputLinkButton, } = LoginMiscLayoutStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];
const isNumeric = number => !isNaN(number);
const validateSmsCodeInput = ({ smscode, }) =>
  (!isNumeric(smscode) || !smscode || smscode.length < 1
    ? generateSmsCodeError('אנא הזינו את הקוד שנשלח אליכם')
    : []);

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
      <Fragment>
        <ContentWrapper>
          <FormWrapper>
            <ItemCenterer>
              <h5>
                להתחברות הזינו את הקוד שנשלח למספר
                <br />
                <span dir="ltr">054****212</span>
              </h5>
            </ItemCenterer>

            <Form
              clearFormAfterSubmit={false}
              // initialValues={{ email: 'insert email' }}
              validate={validateSmsCodeInput}
              onSubmit={onSubmit}
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
                        name: 'smscode',
                        label: 'קוד אימות',
                        type: 'text',
                      })}
                    />
                    <InputLinkButton>
                      <span
                        onClick={() => {
                          /* const route = doTransition('otpValidation2');
                        Router.push(route); */
                        }}
                      >
                        שלח בשנית
                      </span>
                    </InputLinkButton>
                  </div>
                  <ItemCenterer>
                    <Button onClick={handleSubmit}>התחברות</Button>
                  </ItemCenterer>
                </Fragment>
              )}
            />

            <BottomLinks spacing={0}>
              <span>הקוד נשלח בשנית. לא הגיע?</span>

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

              <br />

              <span>או </span>
              <HtzLink
                href={`${findRout('getCustomerService')}`}
                onClick={e => {
                  e.preventDefault();
                  const route = doTransition('getCustomerService');
                  Router.push(route);
                }}
              >
                פניה לשירות לקוחות
              </HtzLink>
            </BottomLinks>
          </FormWrapper>
        </ContentWrapper>
      </Fragment>
    )}
  </FSMLayout>
);

export default OtpValidation;
