import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

NYT.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  content: PropTypes.string.isRequired,
};

NYT.defaultProps = {
  caption: '',
  credit: '',
};

const videoWrapper = ({ aspectRatio, nyt, }) => {
  const [ width, height, ] = aspectRatio ? aspectRatio.split('/') : [ 16, 9, ];
  const aspect = `${(height / width) * 100}%`;
  const paddingTop = nyt ? '69px' : '';

  return {
    margin: '0',
    paddingBottom: aspect,
    height: '0',
    overflow: 'hidden',
    position: 'relative',
    paddingTop,
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

function NYT(props) {
  return (
    <div>
      <VideoWrapper aspectRatio={'16/9'} nyt>
        <VideoElement
          title="New York Times Video - Embed Player"
          width="auto"
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true"
          marginHeight="0"
          marginWidth="0"
          id="nyt_video_player"
          src={props.content}
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

export default NYT;
