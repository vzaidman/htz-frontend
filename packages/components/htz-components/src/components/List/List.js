/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';

import Query from '../ApolloBoundary/Query';
import getView from './getView';
import EventTracker from '../../utils/EventTracker';
import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';
import NoSSR from '../NoSSR/NoSSR';


const ListWithReadingHistory = props => (
  <NoSSR>
    <ReadingHistoryProvider>
      {
        readingHistory => (
          <List history={readingHistory} {...props} />
        )
      }
    </ReadingHistoryProvider>
  </NoSSR>
);

ListWithReadingHistory.propTypes = {
  /**
   * List's contentId.
   */
  contentId: PropTypes.string.isRequired,
  /**
   * List's view name.
   */
  view: PropTypes.string.isRequired,
};


class List extends React.Component {
  static propTypes = {
    ...ListWithReadingHistory.propTypes,
    history: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    history: [],
  }

  state = {
    selectedView: null,
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

  render() {
    const { contentId, history, } = this.props;
    const { selectedView, } = this.state;
    const ListComponent = selectedView
      ? Array.isArray(selectedView)
        ? selectedView[0].default
        : selectedView
      : null;
    return ListComponent && history ? (
      selectedView[1] ? (
        <Query
          query={selectedView[1].default}
          variables={{ listId: contentId, history, }}
        >
          {({ data: { list, }, loading, error, }) => {
            if (loading) return null;
            if (error) return null;
            const { title, items, } = {
              title: list.title,
              items: list.items.filter(item =>
                // eslint-disable-next-line no-prototype-builtins
                item.hasOwnProperty('contentId')
              ),
            };

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
                      list={{ title, items, }}
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
      ) : (
        <ListComponent />
      )
    ) : null;
  }
}

export default ListWithReadingHistory;
