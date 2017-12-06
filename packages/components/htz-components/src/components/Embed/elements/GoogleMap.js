import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

GoogleMap.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  settings: PropTypes.shape({
    heading: PropTypes.string,
    coordinates: PropTypes.string,
    language: PropTypes.string.isRequired,
    satellite: PropTypes.bool.isRequired,
    pitch: PropTypes.number,
    fov: PropTypes.number,
    mode: PropTypes.string,
    destination: PropTypes.string,
    units: PropTypes.string,
    waypoints: PropTypes.string,
  }).isRequired,
};

GoogleMap.defaultProps = {
  caption: '',
  credit: '',
};

const mapWrapper = ({ aspectRatio, }) => {
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

const mapCover = () => ({
  bottom: '0',
  left: '0',
  right: '0',
  top: '0',
  cursor: 'pointer',
  position: 'absolute',
  zIndex: '1',
});

const MapCover = createComponent(mapCover, 'div', props => Object.keys(props));

function GoogleMap(props) {
  const settings = props.settings;
  const type = props.embedType;
  const address = props.content;
  const key = 'AIzaSyBIAxVLUwr1Lls-usIxb0HxCRpCXMhJtlU';

  let waypoints;
  let method;
  let units;
  let heading;
  let fov;
  let pitch;

  const zoom =
    type !== 'streetView'
      ? settings.zoom ? `&zoom=${settings.zoom}` : ''
      : '';
  const satellite =
    type !== 'streetView' && settings.satellite ? '&maptype=satellite' : '';

  const searchString =
    type === 'static'
      ? `place?q=${address}`
      : type === 'search'
        ? `search?q=${address}`
        : type === 'directions'
          ? `directions?origin=${address}&destination=${settings.destination}`
          : type === 'streetView'
            ? `streetview?location=${settings.coordinates}`
            : '';

  if (type === 'directions') {
    waypoints = settings.waypoints
      ? `&waypoints=("${settings.waypoints}")`
      : '';
    method = `&mode=${settings.mode}`;
    units = `&units=${settings.units}`;
  }
  else if (type === 'streetView') {
    heading =
      settings.heading && settings.heading !== 'none'
        ? `&heading=${settings.heading}`
        : '';
    fov = `&fov=${settings.fov}`;
    pitch = `&pitch=${settings.pitch}`;
  }

  const removeCover = e => {
    e.target.remove();
  };

  return (
    <div>
      <MapWrapper>
        <MapElement
          width="600"
          height="450"
          src={`https://www.google.com/maps/embed/v1/${searchString}&key=${key}&language=${settings.language}${waypoints ||
            ''}${method || ''}${units || ''}${satellite || ''}${fov ||
            ''}${heading || ''}${zoom || ''}${pitch || ''}`}
          frameBorder="0"
          allowFullScreen=""
        />

        <MapCover onClick={removeCover} />
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

export default GoogleMap;
