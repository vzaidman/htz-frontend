/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.WazeEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper as MapWrapper, } from '../sharedStyles/videoWrapper';
import { VideoElement as MapElement, } from '../sharedStyles/videoElement';

Waze.propTypes = {
  settings: PropTypes.shape({
    /**
     * Should there be a marker pinned to the center of the map (Default: False).
     */
    pin: PropTypes.string,
    /**
     * The language of display.
     */
    language: PropTypes.string.isRequired,
    /**
     * An Array\[3\] that contains the map's coordinates.
     * (for example: \['?zoom=15', 'lat=32.06408', 'lon=34.77688'\]).
     */
    coordinates: PropTypes.array.isRequired,
  }).isRequired,
  /**
   * A function to be called when the map finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

Waze.defaultProps = {
  onLoadCallback: null,
};

function Waze(props) {
  const settings = props.settings;
  const pin = settings.pin ? '&pin=1' : '';
  const language = settings.language;
  const coordinates = settings.coordinates;

  return (
    <MapWrapper>
      <MapElement
        width="600"
        height="450"
        src={`https://embed.waze.com/${language}/iframe${coordinates[0]}&${
          coordinates[1]
        }&${coordinates[2]}&${pin}`}
        frameBorder="0"
        allowFullScreen=""
        onLoad={props.onLoadCallback}
      />
    </MapWrapper>
  );
}

export default Waze;
