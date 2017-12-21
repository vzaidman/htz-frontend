/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.FacebookComments,
]
 * *************************************************************** */

/* globals window location FB */
import React from 'react';
import PropTypes from 'prop-types';
import { appendScript, } from '../../../utils/scriptTools';

export default class FacebookComments extends React.Component {
  static propTypes = {
    /**
     * Contains the order of the comments ('social', 'time' or 'reverse_time').
     */
    embedType: PropTypes.string.isRequired,
    /**
     * The number of posts to display (between 1 and 10).
     */
    content: PropTypes.string.isRequired,
    /**
     * A function to be called when this item finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    const src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.9';
    const async = true;
    const id = 'facebook-jssdk';

    appendScript(src, id, async, this.initScript, this.updateScript);
  }

  initScript = () => {
    FB.init({
      appId: '110687712359084',
      status: true,
      xfbml: true,
      version: 'v2.9',
    });

    FB.Event.subscribe('xfbml.render', () => {
      console.log('fb embed is loaded');
      this.props.onLoadCallback ? this.props.onLoadCallback() : '';
    });
  };

  updateScript = () => {
    FB.XFBML.parse();
  };

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
