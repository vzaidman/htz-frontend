/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.FacebookEmbed,
  ]
 * *************************************************************** */

/* globals document, window, FB */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import Query from '../../ApolloBoundary/Query';

const getFbStatus = gql`
  query getPath {
    FbScriptLoaded @client
  }
`;

export default class Facebook extends React.Component<Props> {
  static propTypes = {
    /**
     * The type of this facebook element
     * ('post', 'video' or 'comment').
     */
    embedType: PropTypes.string.isRequired,
    /**
     * Facebook's URL (for post and comment) or HTML tag (for video).
     */
    source: PropTypes.string.isRequired,
    /**
     * These settings are relevant only for video elements.
     */
    settings: PropTypes.shape({
      /**
       * Should it display the post along with the video ('false' || 'true').
       */
      showText: PropTypes.string,
      /**
       * The width of the video.
       */
      width: PropTypes.string,
      /**
       * The height of the video.
       */
      height: PropTypes.string,
    }).isRequired,
  };

  static scriptAppended = false;

  appendScript = client => {
    const script = document.createElement('script');

    script.src = 'https://connect.facebook.net/en_US/all.js#xfbml=1&amp;version=v2.9';
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load', () => this.initScript(client));

    Facebook.scriptAppended = true;
  };

  initScript = client => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '110687712359084',
        status: false,
        xfbml: true,
        version: 'v2.9',
      });

      client.writeData({
        data: { FbScriptLoaded: true, },
      });
      console.log('Facebook script init');
    };
  };

  updateScript = () => {
    FB.XFBML.parse();
  };

  render() {
    const { embedType: type, settings: { showText, width, height, }, } = this.props;
    return (
      <Query
        query={getFbStatus}
      >
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) return null;
          const { FbScriptLoaded, } = data;
          if (!Facebook.scriptAppended) {
            this.appendScript(client);
          }
          if (FbScriptLoaded) {
            this.updateScript();
            return type === 'post' ? (
              <FelaComponent
                style={{
                  '& *': {
                    width: '100% !important',
                  },
                }}
                render={({ className, }) => (
                  <div
                    className={`fb-post ${className}`}
                    data-width="auto"
                    data-href={this.props.source}
                  />
                )}
              />
            ) : type === 'comments' ? (
              <div
                className="fb-comment-embed"
                data-width="auto"
                data-href={this.props.source}
              />
            ) : (
              <FelaComponent
                style={{
                  width: '100%',
                  // In mobile devices - Facebook currently applies a fixed width in pixels,
                  // according to the parent container. Without this next rule that results
                  // in too large a width. (a Facebook given class makes the display inline)
                  display: 'inline-block !important',
                }}
                render={({ className, }) => (
                  <div
                    className={`fb-video ${className}`}
                    data-width="auto"
                    data-href={this.props.source}
                    data-allowfullscreen="true"
                    data-autoplay="false"
                    data-show-text={showText}
                  />
                )}
              />
            );
          }
          return null;
        }}
      </Query>
    );
  }
}
