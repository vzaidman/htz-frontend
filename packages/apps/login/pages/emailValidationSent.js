import React, { Fragment, } from 'react';
import Router from 'next/router';

import { HtzLink, } from '@haaretz/htz-components';
import FSMLayout from '../layouts/FSMLayout';

import { ApolloConsumer, } from '@haaretz/htz-components';
import BottomLinks from '../components/Misc/BottomLinks';
import Preloader from '../components/Misc/Preloader';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';

// Styling Components -------
const { ContentWrapper, FormWrapper, ItemCenterer, } = LoginContentStyles;
const { TextBox, } = LoginMiscLayoutStyles;
// --------------------------

class EmailValidationSent extends React.Component {
  state = {
    firstTime: true,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ firstTime: true, });
  }

  shouldComponentUpdate() {
    return false;
  }

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
                        <h5>נשלח אלייך מייל</h5>
                        <span>
                          יש לאשר את המייל שנשלח אלייך על מנת לקרוא 6 כתבות באתר מדיי חודש
                        </span>
                      </TextBox>

                      <br/>
                      <ItemCenterer>
                        <Preloader isLoading={this.state.isLoading} />
                      </ItemCenterer>

                      <BottomLinks spacing={1}>
                        <span>לא הגיע המייל? </span>
                        <HtzLink
                          href={`${findRout('sendAgain')}`}
                          onClick={e => {
                            e.preventDefault();
                            this.setPreloader(true);
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
