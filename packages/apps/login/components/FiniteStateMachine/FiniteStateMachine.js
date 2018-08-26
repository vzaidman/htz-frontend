/* eslint-disable */

import React from 'react';
import { withApollo } from 'react-apollo';

class FiniteStateMachine extends React.Component {
  state = {
    currentState: this.props.initialState || 'idle',
  };

  shouldComponentUpdate() {
    return false;
  }

  /**
   * Returns the current inner state of the FSM
   */
  currentState = () => this.state.currentState;

  /**
   * This is This function uses the current inner state and the action that the user applied
   * to resolve its new state
   * @param {string} action the action that the user applied
   */
  resolveNewState = action =>
    Object.entries(this.props.statesGraph).find(
      entry => entry[0] === this.state.currentState
    )[1][action];

  /**
   * This function uses the old and new states as parameters to find the transition
   * function between them
   * @param {string} oldState the previous state
   * @param {string} newState the resolved new state
   */
  resolveTransitionFunction = (oldState, newState) => {
    const wantedTransition = `${oldState}-${newState}`;
    console.warn(`searching for function: ${wantedTransition}`);
    for (const [
      transition,
      func,
    ] of this.props.transitionFunctionsMap.entries()) {
      if (wantedTransition === transition) return func;
    }

    // loosen the transition function search parameters to only the new state
    const looseTransitionRule = `-${newState}`;
    for (const [
      transition,
      func,
    ] of this.props.transitionFunctionsMap.entries()) {
      if (looseTransitionRule === transition) return func;
    }
    throw new Error(
      `transition function not found for state transition: ${oldState}-${newState}`
    );
  };

  /**
   * simulate a transition
   * @param action
   * @returns {*|void}
   */
  findTransition = action => {
    const oldState = this.currentState();
    const newState = this.resolveNewState(action);
    const transitionFunction = this.resolveTransitionFunction(
      oldState,
      newState
    );
    console.warn(
      `simulation: action: ${action}. oldState: ${oldState}. new state: ${newState}`
    );
    return transitionFunction;
  };

  /**
   * This function should be used to transition from one state to another
   * It resolves the new state and then returns the right transition function
   * which enables the actual transition. Also, it updates the component
   * with the new state.
   * @param action
   * @returns {function|function}
   */
  makeTransition = action => () => {
    console.warn(`transition wanted. action: ${action}`);
    const oldState = this.currentState();
    const newState = this.resolveNewState(action);
    console.warn(`new state: ${newState}`);
    this.setState({ currentState: newState });
    console.warn(
      `transition: action: ${action}. oldState: ${oldState}. new state: ${newState}`
    );
    return newState;
  };

  render() {
    return this.props.render({
      currentState: this.currentState,
      findTransitionFunction: this.findTransition,
      transition: this.makeTransition,
    });
  }
}

export default withApollo(FiniteStateMachine);
