/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, } from 'react-apollo';

import getView from './getView';

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
    listComponent: null,
  };

  componentWillMount() {
    const { contentId, view, } = this.props;

    getView(view)
      .then(response => {
        this.setState({
          listComponent: Array.isArray(response)
            ? compose(
              graphql(response[1].default, {
                options: () => ({
                  variables: { path: contentId, },
                }),
                props: props => ({
                  data: props.data,
                }),
              })
            )(response[0].default)
            : response,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const ListComponent = this.state.listComponent;
    return ListComponent ? <ListComponent {...this.props} /> : <p>List</p>;
  }
}

List.propTypes = propTypes;

export default List;
