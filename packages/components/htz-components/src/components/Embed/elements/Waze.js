import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

Waze.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  settings: PropTypes.shape({
    pin: PropTypes.bool,
    coordinates: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
  }).isRequired,
};

Waze.defaultProps = {
  caption: '',
  credit: '',
};

const mapWrapper = ({ aspectRatio, nyt, }) => {
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

const MapWrapper = createComponent(mapWrapper, 'figure');

const mapElement = () => ({
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

const MapElement = createComponent(mapElement, 'iframe', props =>
  Object.keys(props)
);

function Waze(props) {
  const settings = props.settings;
  const pin = settings.pin ? '&pin=1' : '';
  const language = settings.language;
  const coordinates = settings.coordinates;

  return (
    <div>
      <MapWrapper>
        <MapElement
          width="600"
          height="450"
          src={`https://embed.waze.com/${language}/iframe${coordinates[0]}&${coordinates[1]}&${coordinates[2]}&${pin}`}
          frameBorder="0"
          allowFullScreen=""
        />
      </MapWrapper>
      <Caption
        caption={props.caption}
        credit={props.credit}
        inputTemplate={props.inputTemplate}
        embedType={props.embedType}
      />
    </div>
  );
}

export default Waze;
