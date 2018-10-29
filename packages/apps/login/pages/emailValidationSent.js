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
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { TextBox, } = LoginMiscLayoutStyles;
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

const onSubmit = doTransitionFunction => {
  const route = doTransitionFunction('accept');
  Router.push(route);
};

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

const PhoneMailSent = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
      <Fragment>
        <ContentWrapper>
          <FormWrapper>
            <TextBox>
              <h5>נשלח אלייך מייל</h5>
              <span>
                יש לאשר את המייל שנשלח אלייך על מנת לקרוא 6 כתבות באתר מדיי חודש
              </span>
            </TextBox>

            <BottomLinks spacing={1}>
              <span>לא הגיע המייל? </span>
              <HtzLink
                href={`${findRout('sendAgain')}`}
                onClick={e => {
                  e.preventDefault();
                  const route = doTransition('sendAgain');
                  Router.push(route);
                }}
              >
                אנא נסה בשנית
              </HtzLink>
                <br/>
              <HtzLink
                href={`${findRout('notRegistered')}`}
                onClick={e => {
                  e.preventDefault();
                  const route = doTransition('notRegistered');
                  Router.push(route);
                }}
              >
                או הירשם לאתר
              </HtzLink>
            </BottomLinks>

          </FormWrapper>
        </ContentWrapper>
      </Fragment>
    )}
  </FSMLayout>
);

export default PhoneMailSent;
