/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.PlayBuzzEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

// eslint-disable-next-line react/prop-types
const PlayBuzzWrapper = ({ children, }) => (
  <FelaComponent
    style={{
      width: '100%',
      position: 'relative',
      margin: '0 auto',
    }}
    render={({ className, }) => <div className={className}>{children}</div>}
  />
);

export default class PlayBuzz extends React.Component {
  static propTypes = {
    /**
     * Some of the settings values are extracted from the PlayBuzz source code.
     */
    settings: PropTypes.shape({
      /**
       * Should it display facebook comments.
       */
      facebook: PropTypes.bool.isRequired,
      /**
       * Should it display social media share buttons.
       */
      share: PropTypes.bool.isRequired,
      /**
       * Should it display recommended PlayBuzz features.
       */
      recommendations: PropTypes.bool.isRequired,
      /**
       * Should it display this item's information (name, thumbnail, creator, etc).
       */
      info: PropTypes.bool.isRequired,
      /**
       * Get extracted from the PlayBuzz source code.
       */
      'data-item': PropTypes.string,
      /**
       * Get extracted from the PlayBuzz source code.
       */
      'data-id': PropTypes.string,
    }).isRequired,
    /**
     * A function to be called when this item finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  state = {
    isLoaded: false,
  };

  componentDidMount() {
    appendScript({
      src: '//embed.playbuzz.com/sdk.js',
      id: 'playbuzz-js',
      isAsync: true,
      onLoadFunction: () => {
        if (this.props.onLoadCallback) this.props.onLoadCallback();
        this.setState({ isLoaded: true, });
      },
      updateFunction: this.props.onLoadCallback,
    });
  }

  render() {
    const settings = this.props.settings;
    const info = settings.info || false;
    const share = settings.share || false;
    const facebook = settings.facebook || false;
    const recommendations = settings.recommendations || false;

    const dataId = settings['data-id']
      ? settings['data-id'].substring(
        settings['data-id'].indexOf('"') + 1,
        settings['data-id'].lastIndexOf('"')
      )
      : settings['data-item'].substring(
        settings['data-item'].indexOf('"') + 1,
        settings['data-item'].lastIndexOf('"')
      ) || '';

    return (
      <PlayBuzzWrapper isloaded={this.state.isLoaded}>
        <div
          className="playbuzz pb_feed"
          data-id={dataId}
          data-show-info={info}
          data-show-share={share}
          data-comments={facebook}
          data-recommend={recommendations}
        />
      </PlayBuzzWrapper>
    );
  }
}
