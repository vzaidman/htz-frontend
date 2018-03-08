import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';

const propTypes = {
  /**
   * The media component which will be displayed.
   */
  media: PropTypes.node.isRequired,
};

const carouselWrapperStyle = () => {
  const mq = createMqFunc();
  return ({
    ...mq({ until: 'm', misc: '(orientation: landscape)', }, {
      height: '100%',
      position: 'relative',
    }),
    ...mq({ from: 'm', }, {
      height: '100%',
      position: 'relative',
      paddingBottom: '10rem',
    }),
  }
  );
};
const MediaWrapper = createComponent(carouselWrapperStyle);

const Media = ({ media, }) => (
  <MediaWrapper>
    {media}
  </MediaWrapper>
);

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

export default Media;
