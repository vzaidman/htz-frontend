/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.FacebookComments,
  ]
 * *************************************************************** */

/* globals FB */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { appendScript, } from '../../../utils/scriptTools';
import { Query, } from '../../ApolloBoundary/ApolloBoundary';

const GET_CANONICAL = gql`
  query GetCanonicalUrl {
    canonicalUrl @client
  }
`;

export default class FacebookComments extends React.Component {
  static propTypes = {
    /**
     * Contains the order of the comments ('social', 'time' or 'reverse_time').
     */
    embedType: PropTypes.string.isRequired,
    /**
     * The number of posts to display (between 1 and 10).
     */
    source: PropTypes.string.isRequired,
    /**
     * A function to be called when this item finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    appendScript({
      src: '//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.9',
      id: 'facebook-jssdk',
      isAsync: true,
      onLoadFunction: this.initScript,
      updateFunction: this.updateScript,
    });
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
      this.props.onLoadCallback && this.props.onLoadCallback();
    });
  };

  updateScript = () => {
    FB.XFBML.parse();
  };

  render() {
    const { source, embedType, } = this.props;
    return (
      <Query query={GET_CANONICAL}>
        {({ loading, error, data: { canonicalUrl, }, }) => (
          <div
            className="fb-comments"
            data-width="100%"
            data-href={canonicalUrl}
            data-order-by={embedType}
            data-numposts={source}
          />
        )}
      </Query>
    );
  }
}
