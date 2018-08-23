/* eslint-disable */
import React, { Fragment } from 'react';

class FiniteStateMachine extends React.Component {
  // initialProps = {
  //   statesGraph: this.props.statesGraph || {},
  //   transitionFunctionsMap: this.props.transitionFunctionsMap || new Map(),
  // }

  state = {
    currentState: this.props.initialState || 'idle',
  };

  /**
   * Returns the current inner state of the FSM
   */
  currentState = () => this.state.currentState;

  /**
   * (Private) This is This function uses the current inner state and the action that the user applied
   * to resolve its new state
   * @param {string} action the action that the user applied
   */
  resolveNewState = action =>
    Object.entries(this.props.statesGraph).find(
      entry => entry[0] === this.state.currentState
    )[1][action];

  shouldComponentUpdate(nextProps, nextState) {
    // if(nextState.currentState !== this.state.currentState) return true
    return false;
  }
  /**
   * (Private) This function uses the old and new states as parameters to find the transition
   * function between them
   * @param {string} oldState the previous state
   * @param {string} newState the resolved new state
   */
  resolveTransitionFunction = (oldState, newState) => {
    console.log(`oldstate: ${oldState}. newstate: ${newState}`);
    const wantedTransition = `${oldState}-${newState}`;
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
    throw new Error('transition function not found');
  };

  /**
   * This function should be used to transition from one state to another
   * It resolves the new state and then returns the right transition function
   * which enables the actual transition. Also, it updates the component
   * with the new state.
   * @param action
   * @returns {function|function}
   */
  resolveStateAndTransition = action => {
    console.error('action: ', action);
    const oldState = this.currentState();
    const newState = this.resolveNewState(action);
    const transitionFunction = this.resolveTransitionFunction(
      oldState,
      newState
    );
    this.setState({ currentState: newState });
    return transitionFunction;
  };

  render() {
    const { render } = this.props;
    return (
      <Fragment>
        {render({
          resolveStateAndTransition: this.resolveStateAndTransition,
          currentState: this.currentState,
        })}
      </Fragment>
    );
  }
}

export default FiniteStateMachine;
