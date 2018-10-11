import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { Form, TextInput, Button, } from '@haaretz/htz-components';
import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { PageWrapper, ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
// --------------------------

// Methods -------------------
const generateSmsCodeError = message => [ { name: 'smscode', order: 1, errorText: message, }, ];

const isValidPhoneNumber = number => {
  const phoneRegex = /^(\s*|[\+0-9]\d{6,})$/;
  return phoneRegex.test(number);
};
const validatePhoneNumber = ({ smscode, }) =>
  (!isValidPhoneNumber(smscode) || !smscode || smscode.length < 10
    ? generateSmsCodeError('אנא הזינו מספר טלפון נייד')
    : []);

const onSubmit = doTransitionFunc => () => {
  const route = doTransitionFunc('accept');
  Router.push(route);
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

const PhoneInput = () => (
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
              onSubmit={onSubmit(doTransition)}
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
                        name: 'smscode',
                        label: 'מספר טלפון נייד',
                        type: 'text',
                      })}
                    />
                  </div>
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
);

export default PhoneInput;
