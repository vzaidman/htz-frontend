import gql from 'graphql-tag';

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

const STATE_METADATA = gql `
  query MetadataState {
    stateMetaData @client
  }
`;

export { CURRENT_STATE, HISTORY_POINTER, HISTORY, STATE_METADATA };
