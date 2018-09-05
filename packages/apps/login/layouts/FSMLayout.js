/* eslint-disable no-unused-expressions,react/no-did-mount-set-state */
/* eslint-disable */

import React, { Fragment } from 'react';
import FiniteStateMachine from '../components/FiniteStateMachine/FiniteStateMachine';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import { StyleProvider } from '@haaretz/fela-utils';
import theme from '../theme';
import { Query, } from '@haaretz/htz-components';
import GET_FSM_DATA from '../pages/queries/GetFsmData';

const FSMLayout = ({ children }) => (
  <Fragment>
    <Query query={GET_FSM_DATA}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        const host = data.hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        const flow = JSON.parse(data.userFlowJson);

        return (
          <Fragment>
            <FiniteStateMachine
              apolloClient={client}
              initialState={flow.initialState}
              initialTransition={flow.initialTransition}
              statesGraph={flow}
              transitionRouteMap={
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
  </Fragment>
);

export default FSMLayout;
