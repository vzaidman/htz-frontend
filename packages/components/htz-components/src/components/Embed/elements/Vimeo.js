import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

Vimeo.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  content: PropTypes.string.isRequired,
};

Vimeo.defaultProps = {
  caption: '',
  credit: '',
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

function Vimeo(props) {
  return (
    <div>
      <VideoWrapper>
        <VideoElement
          width="640"
          height="360"
          src={`https://player.vimeo.com/video/${props.content}`}
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

export default Vimeo;
