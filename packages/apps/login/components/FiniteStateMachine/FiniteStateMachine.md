<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

### Finite State Machine example

```js static
const states = {
  initial: {
    action1: 'state1',
    action2: 'state2',
  },
  state1: {
    actionx: 'initial',
  },
};

const transitionFunctionsMap = new Map([
  ['initial-state1', () => '/resetPassword'],
  ['initial-state2', () => '/inputPhoneNumber'],
]);

const fsm = new FiniteStateMachine('initial', states, transitionFunctionsMap);
const newState = fsm.resolveState('action1');
```
