import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ListItem({ children, }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

ListItem.propTypes = propTypes;

export default ListItem;
