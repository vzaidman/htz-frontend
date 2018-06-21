/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.GoogleMapEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import { VideoWrapper as MapWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement as MapElement, } from '../sharedStyles/videoElement';

GoogleMap.propTypes = {
  /**
   * The type of this twitter element
   * ('static', 'search', 'directions' or 'streetView').
   */
  embedType: PropTypes.string.isRequired,
  /**
   * The address (in static map) or starting address (in direction).
   */
  source: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    /**
     * The language of display.
     */
    language: PropTypes.string.isRequired,
    /**
     * Should the map be displayed as satellite map ('false' || 'true').
     */
    satellite: PropTypes.string.isRequired,
    /**
     * The finish address in Direction Map.
     */
    destination: PropTypes.string,
    /**
     * Checkpoints to include in the route (separated with '|') in Direction Map
     * (for example: 'dizengoff center | Tony Vespa').
     */
    waypoints: PropTypes.string,
    /**
     * The method of travel ('driving', 'walking', 'flying', etc) Direction Map.
     */
    mode: PropTypes.string,
    /**
     * The distance units to display ('metric' || 'imperial') Direction Map.
     */
    units: PropTypes.string,
    /**
     * The map coordinates in street view.
     */
    coordinates: PropTypes.string,
    /**
     * Camera's direction in street view.
     */
    heading: PropTypes.string,
    /**
     * Camera's vertical angle in street view (Between -90 to 90, default 0).
     */
    pitch: PropTypes.string,
    /**
     * Camera's zoom (field of view) in street view (Between 10 to 100).
     */
    fov: PropTypes.string,
  }).isRequired,
  /**
   * A function to be called when the map finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

GoogleMap.defaultProps = {
  onLoadCallback: null,
};

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
  const address = props.source;
  const key = 'AIzaSyBIAxVLUwr1Lls-usIxb0HxCRpCXMhJtlU';

  let waypoints;
  let method;
  let units;
  let heading;
  let fov;
  let pitch;

  const zoom =
    type !== 'streetView'
      ? settings.zoom
        ? `&zoom=${settings.zoom}`
        : ''
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
    <MapWrapper>
      <MapElement
        width="600"
        height="450"
        src={`https://www.google.com/maps/embed/v1/${searchString}&key=${key}&language=${
          settings.language
        }${waypoints || ''}${method || ''}${units || ''}${satellite ||
          ''}${fov || ''}${heading || ''}${zoom || ''}${pitch || ''}`}
        frameBorder="0"
        allowFullScreen=""
        onLoad={props.onLoadCallback}
      />

      <MapCover onClick={removeCover} />
    </MapWrapper>
  );
}

export default GoogleMap;
