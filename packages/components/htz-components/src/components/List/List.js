// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import Mutation from '../ApolloBoundary/Mutation';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import DynamicListView from './DynamicListView';
import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';
import type { ListDataType, } from '../../flowTypes/ListDataType';

const UPDATE_LIST_DUPLICATION = gql`
  mutation UpdateDuplicationList($ids: [String]) {
    updateListDuplication(ids: $ids) @client {
      listDuplicationIds
    }
  }
`;
const GET_LIST_DUPLICATION = gql`
  query GetListDuplication {
    listDuplicationIds @client
  }
`;

// eslint-disable-next-line react/require-default-props
const ListWrapper = (props: { listData: Object, viewProps?: Object, }) => (
  <Mutation mutation={UPDATE_LIST_DUPLICATION}>
    {(updateListDuplication, data) => (
      <ApolloConsumer>
        {client => (
          <List client={client} {...props} updateListDuplication={updateListDuplication} />
        )}
      </ApolloConsumer>
    )}
  </Mutation>
);

type ListProps = {
  /** the apollo client instance allowing us to preform a query from the store directly */
  client: {
    readQuery: Function,
  },
  listData: ListDataType,
  /** A function that updates the apollo store with the itemsRepresentedContent ids  */
  updateListDuplication: Function,
  viewProps?: Object,
};

type State = {
  updatedListDuplication: boolean,
  listDuplicationIds: string[],
};

class List extends React.Component<ListProps, State> {
  static defaultProps = {
    viewProps: {},
  };

  state = {
    updatedListDuplication: false,
    listDuplicationIds: [],
  };

  componentDidMount() {
    // we want this to run just once at component mount,
    // This makes this whole component only usable for client side lists,
    // Once we make add ssr capabilities we need to make sure the listDuplicationIds
    // wont cause the list to re-query data and re render,
    if (this.props.listData.loadPriority !== 'ssr') {
      const { listDuplicationIds, } = this.props.client.readQuery({
        query: GET_LIST_DUPLICATION,
      });
      this.setState({ listDuplicationIds, });
    }
  }

  updateListDuplication = items => {
    if (!this.state.updatedListDuplication) {
      const itemsRepresentedContent = items.reduce((accumulator, currentValue) => {
        if (currentValue && currentValue.representedContent) {
          accumulator.push(currentValue.representedContent);
        }
        return accumulator;
      }, []);

      this.props.updateListDuplication({
        variables: { ids: itemsRepresentedContent, },
      });
      this.setState({ updatedListDuplication: true, });
    }
  };

  render() {
    const { listData, viewProps, } = this.props;
    const { listDuplicationIds, } = this.state;
    return (
      <ReadingHistoryProvider>
        {readingHistory => (
          <DynamicListView
            listData={listData}
            viewProps={viewProps}
            updateListDuplication={this.updateListDuplication}
            variables={{
              listId: listData.contentId,
              history: [ ...readingHistory, ...listDuplicationIds, ],
            }}
          />
        )}
      </ReadingHistoryProvider>
    );
  }
}

export default ListWrapper;
