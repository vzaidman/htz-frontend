import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter, } from 'next/router';
import pathGenerator from '../OfferPage/Stages/utils/pathGenerator';

class Redirect extends React.Component {
  static propTypes = {
    destination: PropTypes.string.isRequired,
    /** query param string without ? or & which will be added programmatically by pathGenerator */
    paramString: PropTypes.string.isRequired,
    replace: PropTypes.bool,
    router: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    replace: false,
  };

  componentDidMount() {
    const { destination, replace, paramString, router, } = this.props;
    const { pathName, asPath, } = pathGenerator(
      destination,
      router,
      paramString
    );
    replace ? Router.replace(pathName, asPath) : Router.push(pathName, asPath);
  }

  render() {
    return null;
  }
}

export default withRouter(Redirect);
