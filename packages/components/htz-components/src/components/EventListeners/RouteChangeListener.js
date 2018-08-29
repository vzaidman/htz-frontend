/* eslint-disable import/no-named-as-default */
import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { UPDATE_SCROLL, } from './ScrollStoreMutator';
import Mutation from '../ApolloBoundary/Mutation';

class RouteChangeListener extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    Router.onRouteChangeComplete = () => {
      this.props.mutate({ variables: { x: 0, y: 0, velocity: 0, }, });
    };
  }

  componentWillUnmount() {
    Router.onRouteChangeComplete = null;
  }

  render() {
    return null;
  }
}

export default () => (
  <Mutation mutation={UPDATE_SCROLL}>
    {updateScroll => <RouteChangeListener mutate={updateScroll} />}
  </Mutation>
);
