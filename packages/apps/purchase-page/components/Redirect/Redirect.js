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
    let [ pathWithoutQuery, queryPartFromPath, ] = router.asPath.split(/\?(.+)/);
    const destPath = `${pathWithoutQuery.substr(
      pathWithoutQuery.lastIndexOf('/') + 1
    )}`; // thankYou, stage3 etc.
    pathWithoutQuery = pathWithoutQuery.substr(
      0,
      pathWithoutQuery.lastIndexOf('/')
    ); // ${appPrefix}
    queryPartFromPath = queryPartFromPath ? `?${queryPartFromPath}` : '';
    const asPath = `${pathWithoutQuery}/${destPath}${queryPartFromPath}`;
    replace
      ? Router.replace(destination, asPath)
      : Router.push(destination, asPath);
  }

  render() {
    return null;
  }
}

export default withRouter(Redirect);
