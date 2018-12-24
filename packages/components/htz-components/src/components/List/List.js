import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Mutation from '../ApolloBoundary/Mutation';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import DynamicListView from './DynamicListView';
import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';

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

const ListWrapper = props => (
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

class List extends React.Component {
  static propTypes = {
    /** the apollo client instance allowing us to preform a query from the store directly */
    client: PropTypes.shape({ readQuery: PropTypes.func, }).isRequired,
    /**
     * List's contentId.
     */
    contentId: PropTypes.string.isRequired,
    /** A function that updates the apollo store with the itemsRepresentedContent ids  */
    updateListDuplication: PropTypes.func.isRequired,
    /**
     * List's view name.
     */
    view: PropTypes.string.isRequired,
    /** props to pass to the rendered view component */
    viewProps: PropTypes.shape({}),
  };

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
    const { listDuplicationIds, } = this.props.client.readQuery({
      query: GET_LIST_DUPLICATION,
    });
    this.setState({ listDuplicationIds, });
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
    const { contentId, view, viewProps, } = this.props;
    const { listDuplicationIds, } = this.state;

    return (
      <ReadingHistoryProvider>
        {readingHistory => (
          <DynamicListView
            view={view}
            viewProps={viewProps}
            contentId={contentId}
            updateListDuplication={this.updateListDuplication}
            variables={{
              listId: contentId,
              history: [ ...readingHistory, ...listDuplicationIds, ],
            }}
          />
        )}
      </ReadingHistoryProvider>
    );
  }
}

export default ListWrapper;
