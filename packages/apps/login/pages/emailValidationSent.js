import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { Form, TextInput, Button, ApolloConsumer, } from '@haaretz/htz-components';
import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import { sendMailValidation, } from '../util/requestUtil';
import { getEmail, } from './queryutil/userDetailsOperations';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { TextBox, } = LoginMiscLayoutStyles;
// --------------------------

const sendAgain = e => {
  console.log('test...');
};
// --------------------------

class EmailValidationSent extends React.Component {
  state = { firstTime: true, };

  componentDidMount() {
    this.setState({ firstTime: true, });
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return this.state.firstTime ? (
      <ApolloConsumer>
        {client => {
          const email = getEmail(client);
          // sendMailValidation({ email, });
          // this.setState({ firstTime: false, });
          return (
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
                        <br />
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
        }}
      </ApolloConsumer>
    ) : null;
  }
}

export default EmailValidationSent;
