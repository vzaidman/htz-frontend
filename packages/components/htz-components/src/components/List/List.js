import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, } from 'react-apollo';

import ListQuery from './queries/fetchList';
import getView from './getView';

const propTypes = {
  /**
   * List's contentId.
   */
  contentId: PropTypes.string.isRequired,
  /**
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  data: PropTypes.shape({
    /** Indicates data loading state */
    loading: PropTypes.bool,
    /** Indicates data error state */
    error: PropTypes.bool,
    list: PropTypes.object,
  }).isRequired,
};

const List = props => {
  const { data, } = props;
  if (data.loading) {
    return <div>loading ...</div>;
  }
  if (data.error) {
    return <h1>ERROR</h1>;
  }

  const ViewType = getView(data.list.viewtype);
  return <ViewType {...data.list} />;
};

List.propTypes = propTypes;

export default compose(
  graphql(ListQuery, {
    options: props => ({
      variables: { path: props.contentId, },
    }),
    props: props => ({
      data: props.data,
    }),
  })
)(List);
