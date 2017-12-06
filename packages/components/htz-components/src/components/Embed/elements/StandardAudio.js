import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

StandardAudio.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
};

StandardAudio.defaultProps = {
  caption: '',
  credit: '',
};

const audioWrapper = ({ height, }) => ({
  margin: '0',
  height: `${height}px` || 'auto',
  overflow: 'hidden',
  position: 'relative',
});

const AudioWrapper = createComponent(audioWrapper, 'figure', props =>
  Object.keys(props)
);

function StandardAudio(props) {
  const src =
    props.embedType === '103FM'
      ? `https://103fm.maariv.co.il/mediaEmbed.aspx?${props.content}`
      : `https://w.soundcloud.com/player/?url=${props.content}`;

  const height =
    props.embedType === '103FM'
      ? 300
      : props.embedType === 'playlist' ? 450 : 180;

  return (
    <AudioWrapper height={height}>
      <iframe
        title="audio embed"
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="no"
        src={src}
        seamless
      />
      <Caption
        caption={props.caption}
        credit={props.credit}
        inputTemplate={props.inputTemplate}
        embedType={props.embedType}
      />
    </AudioWrapper>
  );
}

export default StandardAudio;
