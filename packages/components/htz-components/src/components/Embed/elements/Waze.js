/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.WazeEmbed,
]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../../Caption/Caption';

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
  /**
   * Caption for this map (Passes down to the [***Caption***](./#caption) component).
   */
  caption: PropTypes.string,
  /**
   * Credit (Passes, along with the Caption, down to the [***Caption***](./#caption) component).
   */
  credit: PropTypes.string,
};

Waze.defaultProps = {
  caption: '',
  credit: '',
  onLoadCallback: null,
};

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
          onLoad={props.onLoadCallback}
        />
      </MapWrapper>
      <Caption
        caption={props.caption}
        credit={props.credit}
      />
    </div>
  );
}

export default Waze;
