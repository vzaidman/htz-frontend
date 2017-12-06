import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

Giphy.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  settings: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

Giphy.defaultProps = {
  caption: '',
  credit: '',
};

const giphyWrapper = () => ({
  margin: '0',
  marginBottom: '-4px',
});

const GiphyWrapper = createComponent(giphyWrapper, 'figure', props =>
  Object.keys(props)
);

function Giphy(props) {
  const settings = props.settings;
  const src = settings.src;
  const height = settings.height;
  const width = settings.width;

  const innerWidth = 700; // TODO: Temporary
  const newHeight = (innerWidth / width) * height;

  return (
    <GiphyWrapper>
      <iframe
        title="Giphy"
        src={src}
        width={innerWidth}
        height={newHeight}
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
      <Caption
        caption={props.caption}
        credit={props.credit}
        inputTemplate={props.inputTemplate}
        embedType={props.embedType}
      />
    </GiphyWrapper>
  );
}

export default Giphy;
