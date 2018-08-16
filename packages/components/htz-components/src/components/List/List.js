/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import getView from './getView';
import EventTracker from '../../utils/EventTracker';

const propTypes = {
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
    const { contentId, } = this.props;
    const { selectedView, } = this.state;
    const ListComponent = selectedView
      ? Array.isArray(selectedView)
        ? selectedView[0].default
        : selectedView
      : null;
    return ListComponent ? (
      selectedView[1] ? (
        <Query query={selectedView[1].default} variables={{ path: contentId, }}>
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

List.propTypes = propTypes;

export default List;
