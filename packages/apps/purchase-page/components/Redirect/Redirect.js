import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter, } from 'next/router';

class Redirect extends React.Component {
  static propTypes = {
    destination: PropTypes.string.isRequired,
    replace: PropTypes.bool,
    router: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    replace: false,
  };

  componentDidMount() {
    const { destination, replace, router, } = this.props;
    replace
      ? Router.replace(destination, router.asPath)
      : Router.push(destination, router.asPath);
  }

  render() {
    return null;
  }
}

export default withRouter(Redirect);
