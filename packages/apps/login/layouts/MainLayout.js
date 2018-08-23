/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { Fragment } from 'react';
import Head from 'next/head';
import FiniteStateMachine from '../components/FiniteStateMachine/FiniteStateMachine';

class MainLayout extends React.Component {
  // make stateless
  state = {
    hasMounted: false,
  };

  componentDidMount() {
    this.setState({ hasMounted: true });
  }

  render() {
    console.warn('main render');
    return !this.state.hasMounted ? null : (
      <Fragment>
        <FiniteStateMachine
          initialState="initial"
          statesGraph={{
            initial: {
              action1: 'state1',
              action2: 'state2',
            },
            state1: {
              actionx: 'initial',
            },
          }}
          transitionFunctionsMap={
            new Map([
              ['initial-state1', () => '/resetPassword'],
              ['initial-state2', () => '/inputPhoneNumber'],
            ])
          }
          render={({ resolveStateAndTransition, currentState }) => {
            const ans = resolveStateAndTransition('action1');
            console.warn('abc', ans);
            return (
              <Fragment>
                <Head>
                  <title>Login</title>
                </Head>
                <div>HEADER {console.warn('how many')}</div>
                {this.props.children(currentState)}
                <footer>
                  <div>FOOTER</div>
                </footer>
              </Fragment>
            );
            // return <Index resolveStateAndTransition={resolveStateAndTransition} currentState={currentState} />;
            // console.warn('hello')
            // children({ resolveStateAndTransition, currentState, });
          }}
        />
      </Fragment>
    );
  }
}
//
// const MainLayout = ({ children, }) => (
//   <Fragment>
//     <Head>
//       <title>Login</title>
//     </Head>
//     <div>
//       HEADER
//     </div>
//     <FiniteStateMachine
//
//       initialState="initial"
//
//       statesGraph={{
//         initial: {
//           action1: 'state1',
//           action2: 'state2',
//         },
//         state1: {
//           actionx: 'initial',
//         },
//       }}
//
//       transitionFunctionsMap={new Map([
//         [ 'initial-state1', () => '/resetPassword', ],
//         [ 'initial-state2', () => '/inputPhoneNumber', ],
//       ])}
//
//       render={({ resolveStateAndTransition, currentState, }) => {
//         const ans = resolveStateAndTransition('action1');
//         console.warn('abc', ans);
//         return <Index
//         // console.warn('hello')
//         // children({ resolveStateAndTransition, currentState, });
//       }}
//     />
//     <footer>
//       <div>FOOTER</div>
//     </footer>
//   </Fragment>
// );

export default MainLayout;
