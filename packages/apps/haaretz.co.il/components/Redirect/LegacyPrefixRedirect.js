import { Component, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

class LegacyPrefixRedirect extends Component {
  static propTypes = {
    pageType: PropTypes.string.isRequired,
  };
  componentDidMount() {
    Router.replace({ pathname: `/${this.props.pageType}`, query: Router.query, }, Router.asPath);
  }
  render() {
    return null;
  }
}

export default LegacyPrefixRedirect;
