/* global document embedArtiPlayer */
/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.ArtiMediaEmbed
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { VideoWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement, } from '../sharedStyles/videoElement';

export default class ArtiMedia extends React.Component {
  static propTypes = {
    /**
     * These settings are extracted from the ArtiMedia source code.
     */
    settings: PropTypes.shape({
      publisherId: PropTypes.string.isRequired,
      sitekey: PropTypes.string.isRequired,
      videoId: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      playerId: PropTypes.string.isRequired,
    }).isRequired,
    /**
     * A function to be called when this item finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    const script = document.createElement('script');

    script.src = '//p.artipbox.net/amapi.js';
    script.async = true;

    document.body.appendChild(script);

    const settings = {};

    Object.keys(this.props.settings).forEach(key => {
      settings[key] = this.props.settings[key].replace(/'/g, '');
    });

    script.addEventListener('load', () => {
      embedArtiPlayer({ targetId: settings.playerId, ...settings, });
      this.props.onLoadCallback && this.props.onLoadCallback();
    });
  }

  render() {
    const settings = this.props.settings;
    const playerId = settings.playerId;

    return (
      <VideoWrapper aspectRatio="16/9">
        <VideoElement
          as="div"
          id={playerId}
          className="arti-media-video"
          artiMedia
        />
      </VideoWrapper>
    );
  }
}
