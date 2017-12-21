/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.PlayBuzzEmbed,
]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../../Caption/Caption';
import { appendScript, } from '../../../utils/scriptTools';

const playBuzzWrapper = () => ({
  width: '100%',
  overflow: 'auto',
  maxHeight: '700px',
  position: 'relative',
  margin: '0 auto',
});

const PlayBuzzWrapper = createComponent(playBuzzWrapper, 'figure', props =>
  Object.keys(props)
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
      'data-item': PropTypes.string.isRequired,
      /**
       * Get extracted from the PlayBuzz source code.
       */
      'data-embed-by': PropTypes.string.isRequired,
      /**
       * Get extracted from the PlayBuzz source code.
       */
      'data-version': PropTypes.string.isRequired,
    }).isRequired,
    /**
     * A function to be called when this item finishes to load.
     */
    onLoadCallback: PropTypes.func,
    /**
     * Caption for this item (Passes down to the [***Caption***](./#caption) component).
     */
    caption: PropTypes.string,
    /**
     * Credit (Passes, along with the Caption, down to the [***Caption***](./#caption) component).
     */
    credit: PropTypes.string,
  };

  static defaultProps = {
    caption: '',
    credit: '',
    onLoadCallback: null,
  };

  componentDidMount() {
    const src = '//cdn.playbuzz.com/widget/feed.js';
    const async = true;
    const id = 'playbuzz-js';

    appendScript(src, id, async, this.props.onLoadCallback, this.props.onLoadCallback);
  }

  render() {
    const settings = this.props.settings;
    const info = settings.info || false;
    const share = settings.share || false;
    const facebook = settings.facebook || false;
    const recommendations = settings.recommendations || false;

    const dataItem =
      settings['data-item'].substring(
        settings['data-item'].indexOf('"') + 1,
        settings['data-item'].lastIndexOf('"')
      ) || '';
    const dataEmbedBy =
      settings['data-embed-by'].substring(
        settings['data-embed-by'].indexOf('"') + 1,
        settings['data-embed-by'].lastIndexOf('"')
      ) || '';
    const dataVersion =
      settings['data-version'].substring(
        settings['data-version'].indexOf('"') + 1,
        settings['data-version'].lastIndexOf('"')
      ) || '';

    return (
      <PlayBuzzWrapper>
        <div
          className="pb_feed"
          data-item={dataItem}
          data-embed-by={dataEmbedBy}
          data-version={dataVersion}
          data-game-info={info}
          data-shares={share}
          data-comments={facebook}
          data-recommend={recommendations}
        />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
        />
      </PlayBuzzWrapper>
    );
  }
}
