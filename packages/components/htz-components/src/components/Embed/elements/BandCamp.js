/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.BandCampEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

BandCamp.propTypes = {
  /**
   * The type of this band camp element
   * ('track' or simply '').
   */
  embedType: PropTypes.string.isRequired,
  /**
   * These settings are extracted from the Bandcamp source code and calculated with
   * consideration of the user input in Polopoly.
   */
  settings: PropTypes.shape({
    album: PropTypes.string.isRequired,
    linkcol: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    bgcol: PropTypes.string.isRequired,
    transparent: PropTypes.string.isRequired,
    showTrackList: PropTypes.string.isRequired,
    tracklist: PropTypes.string,
    layout: PropTypes.string.isRequired,
    artwork: PropTypes.string,
    artworkSize: PropTypes.string,
    slimShowArt: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    standardShowArt: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * A function to be called when the video finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

BandCamp.defaultProps = {
  onLoadCallback: null,
};

// eslint-disable-next-line react/prop-types
const BandCampWrapper = ({ children, }) => (
  <FelaComponent
    style={{
      overflow: 'auto',
      position: 'relative',
      margin: '0 auto -4px',
      maxWidth: '700px',
    }}
  >
    {children}
  </FelaComponent>
);

function BandCamp({ embedType: type, settings, onLoadCallback, }) {
  const {
    layout,
    link,
    album,
    track: trackId,
    showTrackList,
    slimShowArt,
    standardShowArt,
    artworkSize,
    theme,
    linkcol,
  } = settings;

  const size = layout === 'slim' ? 'small' : 'large';
  const minimal = layout === 'artworkOnly' ? '/minimal=true' : '';
  const trackList = layout === 'standard' && !showTrackList ? '/tracklist=false' : '';
  const track = type === 'track' ? `/track=${trackId}` : '';
  const artwork = !slimShowArt || !standardShowArt
    ? '/artwork=none'
    : layout === 'standard' && artworkSize === 'small'
      ? '/artwork=small'
      : '';

  const width = 600;

  const height = layout === 'slim'
    ? 42
    : layout === 'artworkOnly'
      ? width
      : standardShowArt === true
          && artworkSize === 'large'
          && showTrackList === false
        ? width + 117
        : standardShowArt === true
            && artworkSize === 'large'
            && showTrackList === true
          ? width + 436
          : (standardShowArt === false || artworkSize === 'small')
              && showTrackList === false
            ? 120
            : 472;

  return (
    <BandCampWrapper>
      <iframe
        title="BandCamp"
        width="100%"
        height={height}
        src={`https://bandcamp.com/EmbeddedPlayer/transparent=true/album=${album}/size=${size}/bgcol=${theme}/linkcol=${linkcol}${minimal}${trackList}${track}${artwork}`}
        frameBorder="0"
        allowFullScreen=""
        onLoad={onLoadCallback}
      >
        {link}
      </iframe>
    </BandCampWrapper>
  );
}

export default BandCamp;
