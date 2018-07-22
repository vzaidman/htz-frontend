/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.GiphyEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

Giphy.propTypes = {
  /**
   * These settings are extracted from the Giphy source code.
   */
  settings: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * A function to be called when the gif finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

Giphy.defaultProps = {
  onLoadCallback: null,
};

// eslint-disable-next-line react/prop-types
const GiphyWrapper = ({ children, }) => (
  <FelaComponent
    style={{
      margin: '0',
      marginBottom: '-4px',
    }}
  >
    {children}
  </FelaComponent>
);

function Giphy({ settings: { src, height, width, }, onLoadCallback, }) {
  // TODO: Temporary
  const innerWidth = 600;
  // prettier-ignore
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
        onLoad={onLoadCallback}
      />
    </GiphyWrapper>
  );
}

export default Giphy;
