/* globals window location FB */
import React from 'react';
import PropTypes from 'prop-types';
import { appendScript, } from '../lib/scriptTools';

const initScript = () => {
  FB.init({
    appId: '110687712359084',
    status: true,
    xfbml: true,
    version: 'v2.9',
  });
};

export default class FacebookComments extends React.Component {
  static propTypes = {
    embedType: PropTypes.string.isRequired,
    content: PropTypes.number.isRequired,
  };

  componentWillMount() {
    const src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.9';
    const async = true;
    const id = 'facebook-jssdk';

    appendScript(src, id, async, initScript);
  }

  render() {
    const { content, embedType, } = this.props;
    return (
      <figure>
        <div
          className="fb-comments"
          data-width="100%"
          data-href={location.href}
          data-order-by={embedType}
          data-numposts={content}
        />
      </figure>
    );
  }
}
