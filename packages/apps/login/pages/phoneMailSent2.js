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

const onSubmit = doTransitionFunction => {
  const route = doTransitionFunction('accept');
  Router.push(route);
};
// --------------------------

const PhoneMailSent2 = () => (
  <FSMLayout>
    {({ currentState, findRout, doTransition, }) => (
      <Fragment>
        <ContentWrapper>
          <FormWrapper>
            <ItemCenterer>
              <h5>נשלח אלייך מייל בשנית</h5>
            </ItemCenterer>

            <BottomLinks spacing={0}>
              <span>לא הגיע?</span>
              <br />
              <HtzLink
                href="https://www.haaretz.co.il/misc/contact-us"
                target="_blank"
              >
                פניה לשירות לקוחות
              </HtzLink>

              <br />
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
        </ContentWrapper>
      </Fragment>
    )}
  </FSMLayout>
);

export default PhoneMailSent2;
