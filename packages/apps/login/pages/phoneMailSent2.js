import React, { Fragment, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { EventTracker, Form, TextInput, Button, } from '@haaretz/htz-components';
import theme from '../theme/index';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { sendTrackingEvents, } from '../util/trackingEventsUtil';
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
      <ApolloConsumer>
        {client => {
          const flow = getFlowNumber(client);
          return (
            <Fragment>
              <EventTracker>
                {({ biAction, gaAction, gaMapper, }) => (
                  <ContentWrapper>
                    <FormWrapper>
                      <ItemCenterer>
                        <h5>שלחנו שוב את הדוא"ל</h5>
                      </ItemCenterer>

                      <BottomLinks spacing={0}>
                        <span>לא הגיע?</span>
                        <br />
                        <HtzLink
                          href={`${findRout('withPassword')}`}
                          onClick={e => {
                            e.preventDefault();
                            const route = doTransition('withPassword');
                            Router.push(route);
                            sendTrackingEvents({ biAction, gaAction, }, { page: 'Phone validation 2', flowNumber: flow, label: 'withPassword', })(() => {
                                Router.push(route);
                              }
                            );
                          }}
                        >
                          פנו לשירות הלקוחות שלנו
                        </HtzLink>

                        <br />
                        <br />

                        <HtzLink
                          href={`${findRout('withPassword')}`}
                          onClick={e => {
                            e.preventDefault();
                            const route = doTransition('withPassword');
                            sendTrackingEvents({ biAction, gaAction, }, { page: 'Phone validation 2', flowNumber: flow, label: 'withPassword', })(() => {
                                Router.push(route);
                              }
                            );
                          }}
                        >
                          להתחברות באמצעות הסיסמה שברשותכם
                        </HtzLink>
                      </BottomLinks>
                    </FormWrapper>
                  </ContentWrapper>
                )}
              </EventTracker>
            </Fragment>
          )}
        }
      </ApolloConsumer>
    )}
  </FSMLayout>
);

export default PhoneMailSent2;
