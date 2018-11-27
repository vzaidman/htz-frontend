import React, { Fragment, Component, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';
import { connectMailWithPhone, getUserData, getEmail, getHostname, getPhoneNum, } from './queryutil/userDetailsOperations';

import { Form, TextInput, Button, } from '@haaretz/htz-components';
import theme from '../theme/index';
import BottomLinks from '../components/Misc/BottomLinks';
import Preloader from '../components/Misc/Preloader';
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

const sendAgain = (client, doTransition) => {
  const userData = getUserData(client);
  const email = getEmail(client);
  const phoneNumber = getPhoneNum(client);
  connectMailWithPhone(client)({
    email,
    userName: userData.firstName,
    phone: phoneNumber,
    paramString: btoa(`email=${email}&phone=${phoneNumber}`),
    url: getHostname(client),
  }).then(
    () => {
      const route = doTransition('sentAgain');
      Router.push(route);
    },
    error => console.log(error.message) //TODO error ui
  );
};
// --------------------------

class PhoneMailSent extends Component {

  state = {
    isLoading: false,
  }

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  render() {
    return(
      <FSMLayout>
        {({ currentState, findRout, doTransition, }) => (
          <ApolloConsumer>
            {client => {
              return (
                <Fragment>
                  <ContentWrapper>
                    <FormWrapper>
                      <ItemCenterer>
                        <h5>נשלח אלייך מייל על מנת לאשר את המספר הטלפון שלך</h5>
                      </ItemCenterer>

                      <ItemCenterer>
                        <Preloader isLoading={this.state.isLoading} />
                      </ItemCenterer>

                      <BottomLinks spacing={0}>
                        <span>לא הגיע?</span>

                        <br/>

                        <span>לשליחה חוזרת </span>
                        <HtzLink
                          href="/"
                          onClick={e => {
                            e.preventDefault();
                            this.setPreloader(true);
                            sendAgain(client, doTransition);
                          }}
                        >
                          לחץ כאן
                        </HtzLink>

                        <br/><br/>

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
              )
            }}
          </ApolloConsumer>
        )}
      </FSMLayout>
    );
  }
};

export default PhoneMailSent;
