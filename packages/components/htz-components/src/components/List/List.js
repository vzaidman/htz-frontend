import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import Mutation from '../ApolloBoundary/Mutation';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import getView from './getView';
import EventTracker from '../../utils/EventTracker';
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
  };

  static defaultProps = {};

  state = {
    selectedView: null,
    updatedListDuplication: false,
  };

  componentDidMount() {
    const { view, } = this.props;
    getView(view)
      .then(response => {
        this.setState({
          selectedView: response,
        });
      })
      .catch(err => console.log(err));
  }

  shouldComponentUpdate(prevProps, nextState) {
    if (nextState.selectedView !== this.state.selectedView) return true;
    return false;
  }

  render() {
    const { contentId, } = this.props;
    const { selectedView, } = this.state;
    const ListComponent = selectedView
      ? Array.isArray(selectedView)
        ? selectedView[0].default
        : selectedView
      : null;

    if (ListComponent) {
      const { listDuplicationIds, } = this.props.client.readQuery({ query: GET_LIST_DUPLICATION, });

      return selectedView[1] ? (
        <ReadingHistoryProvider>
          {readingHistory => (
            <Query
              query={selectedView[1].default}
              variables={{
                listId: contentId,
                history: [ ...readingHistory, ...listDuplicationIds, ],
              }}
            >
              {({ data: { list, }, loading, error, }) => {
                if (loading) return null;
                if (error) return null;

                const { title, items, ...restList } = list;
                items.filter(item => Object.prototype.hasOwnProperty.call(item, 'contentId'));

                const itemsRepresentedContent = items.reduce((accumulator, currentValue) => {
                  if (currentValue && currentValue.representedContent) {
                    accumulator.push(currentValue.representedContent);
                  }
                  return accumulator;
                }, []);
                // make sure this only runs once
                if (!this.state.updatedListDuplication) {
                  this.props.updateListDuplication({
                    variables: { ids: itemsRepresentedContent, },
                  });
                  this.setState({ updatedListDuplication: true, });
                }

                return (
                  <EventTracker>
                    {({ biAction, gaAction, HtzReactGA, }) => {
                      HtzReactGA.ga('ec:addImpression', {
                        id: contentId,
                        name: title,
                        list: 'List impressions',
                      });
                      return (
                        <ListComponent
                          list={{ items, title, ...restList, }}
                          listId={contentId}
                          gaAction={gaAction}
                          biAction={biAction}
                        />
                      );
                    }}
                  </EventTracker>
                );
              }}
            </Query>
          )}
        </ReadingHistoryProvider>
      ) : (
        <ListComponent />
      );
    }
    return null;
  }
}

export default ListWrapper;
