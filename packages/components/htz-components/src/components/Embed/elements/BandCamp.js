import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

BandCamp.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
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
};

BandCamp.defaultProps = {
  caption: '',
  credit: '',
};

const bandCampWrapper = () => ({
  overflow: 'auto',
  position: 'relative',
  margin: '0 auto -4px',
  maxWidth: '700px',
});

const BandCampWrapper = createComponent(bandCampWrapper, 'figure', props =>
  Object.keys(props)
);

function BandCamp(props) {
  const settings = props.settings;
  const type = props.embedType;
  const layout = settings.layout;
  const link = settings.link;
  const album = settings.album;
  const trackId = settings.track;

  const size = layout === 'slim' ? 'small' : 'large';
  const minimal = layout === 'artworkOnly' ? '/minimal=true' : '';
  const trackList =
    layout === 'standard' && !settings.showTrackList ? '/tracklist=false' : '';
  const track = type === 'track' ? `/track=${trackId}` : '';
  const artwork =
    !settings.slimShowArt || !settings.standardShowArt
      ? '/artwork=none'
      : layout === 'standard' && settings.artworkSize === 'small'
        ? '/artwork=small'
        : '';

  const width = 700;

  const height =
    layout === 'slim'
      ? 42
      : layout === 'artworkOnly'
        ? width
        : settings.standardShowArt === true &&
          settings.artworkSize === 'large' &&
          settings.showTrackList === false
          ? width + 117
          : settings.standardShowArt === true &&
            settings.artworkSize === 'large' &&
            settings.showTrackList === true
            ? width + 436
            : (settings.standardShowArt === false ||
                settings.artworkSize === 'small') &&
              settings.showTrackList === false
              ? 120
              : 472;

  return (
    <BandCampWrapper>
      <iframe
        title="BandCamp"
        width="100%"
        height={height}
        src={`https://bandcamp.com/EmbeddedPlayer/transparent=true/album=${album}/size=${size}/bgcol=${settings.theme}/linkcol=${settings.linkcol}${minimal}${trackList}${track}${artwork}`}
        frameBorder="0"
        allowFullScreen=""
      >
        {link}
      </iframe>
      <Caption
        caption={props.caption}
        credit={props.credit}
        inputTemplate={props.inputTemplate}
        embedType={props.embedType}
      />
    </BandCampWrapper>
  );
}

export default BandCamp;
