/* eslint-disable no-unused-expressions,react/no-did-mount-set-state */
/* eslint-disable */

import React, { Fragment } from 'react';
import FiniteStateMachine from '../components/FiniteStateMachine/FiniteStateMachine';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const MainLayout = ({ children }) => (
  <Fragment>
    <FiniteStateMachine
      initialState="initial"
      statesGraph={{
        initial: {
          action1: 'otpValidation',
          action2: 'state2',
        },
        otpValidation: {
          actionx: 'initial',
        },
      }}
      transitionFunctionsMap={
        new Map([
          ['initial-state1', () => '/resetPassword'],
          ['initial-state2', () => '/inputPhoneNumber'],
          ['initial-otpValidation', () => '/otpValidation'],
        ])
      }
      render={({ currentState, findTransitionFunction, transition }) => (
        <Fragment>
          <Header />
          {children({ currentState, findTransitionFunction, transition })}
          <Footer />
        </Fragment>
      )}
    />
  </Fragment>
);

export default MainLayout;
