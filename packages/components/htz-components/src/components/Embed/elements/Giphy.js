/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.GiphyEmbed,
  ]
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const propTypes = {
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

const defaultProps = {
  onLoadCallback: null,
};

function Giphy({ settings: { src, height, width, }, onLoadCallback, }) {
  return (
    <FelaComponent
      style={{
        left: '0px',
        width: '100%',
        height: '0px',
        position: 'relative',
        // prettier-ignore
        paddingBottom: `${(height / width) * 100}%`,
      }}
      render={({ className, }) => (
        <div className={className}>
          <FelaComponent
            style={{
              top: '0px',
              left: '0px',
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            render={({ className: iframeStyles, }) => (
              <iframe
                className={`${iframeStyles} 'giphy-embed'`}
                title="Giphy"
                src={src}
                frameBorder="0"
                allowFullScreen
                onLoad={onLoadCallback}
              />
            )}
          />
        </div>
      )}
    />
  );
}

Giphy.propTypes = propTypes;
Giphy.defaultProps = defaultProps;

export default Giphy;
