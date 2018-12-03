import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { ApolloConsumer, } from '@haaretz/htz-components';
import { sendMailValidation, } from '../util/requestUtil';
import { getEmail, } from './queryutil/userDetailsOperations';
import BottomLinks from '../components/Misc/BottomLinks';
import Preloader from '../components/Misc/Preloader';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { TextBox, ErrorBox, } = LoginMiscLayoutStyles;
// --------------------------

const sendEmailAgain = (client, route, showError, hideError, setPreloader) => {
  setPreloader(true);
  hideError();
  const email = getEmail(client);
  sendMailValidation({ email, }).then(
    () => {
      Router.push(route);
    },
    error => {
      setPreloader(false);
      showError((error.message || 'אירעה שגיאה'));
    }
  );
}

class EmailValidationSent extends React.Component {
  state = {
    firstTime: true,
    isLoading: false,
    showError: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.setState({ firstTime: true, });
  }

  shouldComponentUpdate() {
    return false;
  }

  hideError = () => {
    this.setState({ showError: false, errorMessage: '', });
  };

  showError = errorMsg => {
    this.setState({ showError: true, errorMessage: errorMsg, });
  };

  setPreloader = (isLoadingStatus) => {
    this.setState({ isLoading: !!isLoadingStatus, });
  }

  render() {
    return this.state.firstTime ? (
      <ApolloConsumer>
        {client => {
          return (
            <FSMLayout>
              {({ currentState, findRout, doTransition, }) => (
                <Fragment>
                  <ContentWrapper>
                    <FormWrapper>
                      <TextBox>
                        <h5>נשלח אליכם דוא"ל</h5>
                        <span>
                          יש ללחוץ על כפתור האישור בדוא"ל שקיבלתם להמשך הגלישה באתר
                        </span>
                      </TextBox>

                      <br/>
                      <ItemCenterer>
                        <Preloader isLoading={this.state.isLoading} />
                      </ItemCenterer>

                      <ErrorBox className={this.state.showError ? '' : 'hidden'}>
                        <span>
                          {this.state.errorMessage}
                        </span>
                      </ErrorBox>

                      <BottomLinks spacing={1}>
                        <span>הדוא"ל לא הגיע? </span>
                        <HtzLink
                          href={`${findRout('sendAgain')}`}
                          onClick={e => {
                            e.preventDefault();
                            sendEmailAgain(client, doTransition('sendAgain'), this.showError, this.hideError, this.setPreloader);
                          }}
                        >
                          אנא נסו בשנית
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
