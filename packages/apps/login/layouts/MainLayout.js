/* eslint-disable no-unused-expressions,react/no-did-mount-set-state */
/* eslint-disable */

import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import FiniteStateMachine from '../components/FiniteStateMachine/FiniteStateMachine';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import { StyleProvider } from '@haaretz/fela-utils';
import theme from '../theme';
import { Query, } from '@haaretz/htz-components';

const GET_HOST_NAME = gql`
  query GetHost {
    hostname @client
  }
`;

const MainLayout = ({ children }) => (
  <Query query={GET_HOST_NAME}>
    {({ loading, error, data, client, }) => {
      if (loading) return null;
      const host = data.hostname.match(/^(?:.*?\.)?(.*)/i)[1];
      return (
        <Fragment>
          <FiniteStateMachine
            apolloClient={client}
            initialState="initial"
            initialTransition="/"
            statesGraph={{
              initial: {
                action1: 'otpValidation',
                action2: 'state2',
              },
              otpValidation: {
                actionx: 'initial',
              },
            }}
            transitionRoutMap={
              new Map([
                ['initial-state1', '/resetPassword'],
                ['initial-state2', '/inputPhoneNumber'],
                ['initial-otpValidation', '/otpValidation'],
                [ '-initial', '/' ],
              ])
            }
            render={({ currentState, findRout, doTransition, }) => (
              <StyleProvider renderer={styleRenderer} theme={theme(host)}>
                <Fragment>
                  <Header />
                  {children({
                    currentState,
                    findRout,
                    doTransition,
                  })}
                  <Footer />
                </Fragment>
              </StyleProvider>
            )}
          />
        </Fragment>
      );
    }}
  </Query>
);

export default MainLayout;
