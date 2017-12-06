import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

Youtube.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  settings: PropTypes.shape({
    controls: PropTypes.string.isRequired,
    related: PropTypes.string.isRequired,
    loop: PropTypes.string.isRequired,
    videoImage: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    mute: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    startAt: PropTypes.number.isRequired,
  }).isRequired,
};

Youtube.defaultProps = {
  caption: '',
  credit: '',
  settings: {
    controls: '1',
    related: '1',
    loop: '0',
    logo: '1',
    mute: false,
    autoplay: false,
    startAt: 0,
  },
};

const videoWrapper = ({ aspectRatio, }) => {
  const [ width, height, ] = aspectRatio ? aspectRatio.split('/') : [ 16, 9, ];
  const aspect = `${(height / width) * 100}%`;

  return {
    margin: '0',
    paddingBottom: aspect,
    height: '0',
    overflow: 'hidden',
    position: 'relative',
  };
};

const VideoWrapper = createComponent(videoWrapper, 'figure');

const videoElement = () => ({
  margin: '0',
  padding: '0',
  height: '100% !important',
  width: '100% !important',
  left: '0',
  top: '0',
  position: 'absolute',
  display: 'block',
  border: 'none',
});

const VideoElement = createComponent(videoElement, 'iframe', props =>
  Object.keys(props)
);

function Youtube(props) {
  const startAt = props.embedType === 'playlist' ? '&start=' : '?start=';
  const { settings, } = props;
  return (
    <div>
      <VideoWrapper aspectRatio={'16/9'}>
        <VideoElement
          id={`yt_embed_${props.content}`}
          width="560"
          height="315"
          src={`//www.youtube.com/embed/${props.content}${startAt}${settings.startAt}
                  &controls=${settings.controls}
                  &loop=${settings.loop}
                  &modestbranding=${settings.logo}
                  &rel=${settings.related}
                  &enablejsapi=1`}
          frameBorder="0"
          allowFullScreen=""
        />
      </VideoWrapper>
      <Caption
        caption={props.caption}
        credit={props.credit}
        inputTemplate={props.inputTemplate}
        embedType={props.embedType}
      />
    </div>
  );
}

export default Youtube;
