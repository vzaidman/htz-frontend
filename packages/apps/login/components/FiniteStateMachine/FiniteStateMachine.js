import React from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_STATE = gql`
  query CurrentState {
    currentState @client
  }
`;

const HISTORY_POINTER = gql`
  query HistoryPointer {
    historyPointer @client
  }
`;

const HISTORY = gql`
  query StateHistory {
    stateHistory @client {
      pastState
      pastTransition
    }
  }
`;

const finiteStateMachinePropTypes = {
  render: PropTypes.func.isRequired,
  initialState: PropTypes.string.isRequired,
  initialTransition: PropTypes.string.isRequired,
  statesGraph: PropTypes.objectOf(PropTypes.object).isRequired,
  transitionRouteMap: PropTypes.objectOf(PropTypes.any).isRequired,
  apolloClient: PropTypes.shape().isRequired,
};

class FiniteStateMachine extends React.Component {
  static propTypes = finiteStateMachinePropTypes;

  constructor(props) {
    super(props);

    if (this.currentState() === null) {
      this.writeStateToApolloStore(props.initialState);
      this.addHistory({ pastState: props.initialState, pastTransition: props.initialTransition, });
    }
  }

  componentDidMount = () => Router.beforePopState(this.changeHistoryCallback);

  getHistoryObject = () => {
    const historyObject = this.props.apolloClient
      .readQuery({ query: HISTORY, }).stateHistory;
    // TODO render from server if null or undefined
    if (typeof historyObject === 'undefined') {
      throw new Error('could not get history object from store. force SSR');
    }
    return historyObject;
  };

  getHistoryPointer = () => {
    const historyPointer = this.props.apolloClient
      .readQuery({ query: HISTORY_POINTER, }).historyPointer;
    // TODO render from server if null or undefined
    if (typeof historyPointer === 'undefined') {
      throw new Error('could not get history pointer from store. force SSR');
    }
    return historyPointer;
  };

  /**
   * Do not use set history pointer. it's a util for
   * 'increment/decrement history pointer methods'
   * @param pointer
   */
  setHistoryPointer = pointer => {
    console.warn(`pointer is written: ${pointer}`);
    this.props.apolloClient.writeData({
      data: { historyPointer: pointer, },
    });
    return pointer;
  };

  writeStateToApolloStore = newState => {
    console.warn(`state to be written to apollo: ${newState}`);
    this.props.apolloClient.writeData({
      data: { currentState: newState, },
    });
    return newState;
  };

  /**
   * Remove history till the current pointer that shows the navigation location
   * within the history object. This should happen only after a link is pressed
   * @returns {*}
   */
  removeHistory = () => {
    const pointerLocation = this.getHistoryPointer();
    let historyObject = this.getHistoryObject();
    if (!Array.isArray(historyObject)) {
      historyObject = [ historyObject, ];
    }

    console.warn(`removing history till pointer location: ${pointerLocation}`);
    if (historyObject.length - 1 === pointerLocation) return historyObject;
    const newHistoryObject = historyObject.slice(0, parseInt(pointerLocation, 10) + 1);
    this.props.apolloClient.writeData({
      data: { stateHistory: [ ...newHistoryObject, ], },
    });
    return newHistoryObject;
  };

  incrementHistoryPointer = () => {
    let pointer = this.getHistoryPointer();
    pointer = pointer === null ? 0 : parseInt(pointer, 10) + 1;
    return this.setHistoryPointer(pointer);
  };

  decrementHistoryPointer = () => {
    let pointer = this.getHistoryPointer();
    const pointerLocation = parseInt(pointer, 10);
    pointer = (pointer === null || pointerLocation === 0) ? 0 : pointerLocation - 1;
    return this.setHistoryPointer(pointer);
  };

  addHistory = ({ pastState, pastTransition, }) => {
    console.warn(`executed add history with ${pastState}, ${pastTransition}`);
    let historyObject = this.getHistoryObject();
    if (!Array.isArray(historyObject)) {
      historyObject = [];
    }
    this.props.apolloClient.writeData({
      data: {
        stateHistory: [ ...historyObject, {
          pastState,
          pastTransition,
          __typename: 'StateHistory',
        }, ],
      },
    });
    return this.incrementHistoryPointer();
  };

  /**
   * Returns the last state and transition function.
   * Also, removes the last state from the "stack" to simulate the back button
   * effect
   * @param url
   * @param as alternative (client) url
   * @param options
   * @returns {object} an object which contains the 'state' and transition
   * function to that state
   */
  changeHistoryCallback = ({ url, as, options, }) => {
    console.warn('executed "change history"');
    const historyObject = this.getHistoryObject();
    const currentHistoryPointer = parseInt(this.getHistoryPointer(), 10);
    const backwards = historyObject[currentHistoryPointer - 1];
    const forward = historyObject[currentHistoryPointer + 1];
    console.warn(`back: ${JSON.stringify(backwards)}. forward: ${JSON.stringify(forward)}`);
    const direction =
      (backwards !== undefined && (url === backwards.pastTransition || as === backwards.pastTransition))
        ? 'backwards'
        : (
          forward !== undefined
          && (url === forward.pastTransition || as === forward.pastTransition)
        )
          ? 'forward'
          : null;

    const updatedHistoryPointer = direction === 'backwards'
      ? this.decrementHistoryPointer()
      : direction === 'forward'
        ? this.incrementHistoryPointer()
        : null;

    if (updatedHistoryPointer == null) {
      // TODO: replace this so an initial state is
      // rendered rather than crushing the whole app
      throw new Error('could not resolve pop state direction');
    }

    const currentHistoryObject = historyObject[updatedHistoryPointer];
    this.writeStateToApolloStore(currentHistoryObject.pastState);

    return currentHistoryObject;
  };

  /**
   * Returns the current inner state of the FSM
   */
  currentState = () => {
    const currentState = this.props.apolloClient
      .readQuery({ query: CURRENT_STATE, }).currentState;

    // TODO render from server if null or undefined
    if (typeof currentState === 'undefined') {
      throw new Error('could not get current state from store. force SSR');
    }
    return currentState;
  };

  /**
   *  This is This function uses the current inner state and the action that the user applied
   * to resolve its new state
   * @param {string} action the action that the user applied
   * @param action
   * @param state
   * @returns {*}
   */
  resolveNewState = (action, state) => Object.entries(this.props.statesGraph)
    .find(entry => entry[0] === state)[1][action];

  /**
   * This function uses the old and new states as parameters to find the transition
   * rout between them
   * @param {string} oldState the previous state
   * @param {string} newState the resolved new state
   */
  resolveRout = (oldState, newState) => {
    const wantedTransition = `${oldState}-${newState}`;
    console.warn(`searching for rout: ${wantedTransition}`);
    for (const [ transition, rout, ] of this.props.transitionRouteMap.entries()) {
      if (wantedTransition === transition) return rout;
    }

    // loosen the transition function search parameters to only search the new state
    const looseTransitionRule = `-${newState}`;
    for (const [ transition, rout, ] of this.props.transitionRouteMap.entries()) {
      if (looseTransitionRule === transition) return rout;
    }
    throw new Error(`transition function not found for state transition: ${oldState}-${newState}`);
  };

  /**
   * find a transition route, based on an action
   * @param action
   * @returns {*|void}
   */
  findTransition = action => {
    const oldState = this.currentState();
    console.warn(`inside find transition. old state: ${oldState}`);
    const newState = this.resolveNewState(action, oldState);
    const route = this.resolveRout(oldState, newState);
    console.warn(`simulation: action: ${action}. oldState: ${oldState}. new state: ${newState}`);
    return route;
  };

  /**
   * This function should be used to transition from one state to another
   * It resolves the new state and then returns the right transition function
   * which enables the actual transition. Also, it updates the component
   * with the new state.
   * @param action
   * @returns {function|function}
   */
  doTransition = action => {
    console.warn(`transition wanted. action: ${action}`);
    const oldState = this.currentState();
    const newState = this.resolveNewState(action, oldState);
    const route = this.findTransition(action);
    this.removeHistory();
    this.addHistory({ pastState: newState, pastTransition: route, });
    console.warn(`new state: ${newState}`);
    this.writeStateToApolloStore(newState);
    console.warn(
      `transition: action: ${action}. oldState: ${oldState}. new state: ${newState}`
    );
    return route;
  };

  render() {
    return this.props.render({
      currentState: this.currentState,
      findRout: this.findTransition,
      doTransition: this.doTransition,
    });
  }
}


export default FiniteStateMachine;
