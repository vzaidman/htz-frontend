import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';

const propTypes = {
  /**
   * The media component which will be displayed.
   */
  media: PropTypes.node.isRequired,
  /**
   * A callback function that returns the width of the component (ideal for mobile).
   */
  setWidth: PropTypes.func,
};

const defaultProps = {
  setWidth: null,
};

const carouselWrapperStyle = () => {
  const mq = createMqFunc();
  return ({
    ...mq(
      { until: 'm', misc: '(orientation: landscape)', }, {
        height: '100%',
        position: 'relative',
      }
    ),
    ...mq(
      { from: 'm', }, {
        height: '100%',
        position: 'relative',
        paddingBottom: '10rem',
      }
    ),
  }
  );
};
const MediaWrapper = createComponent(carouselWrapperStyle);

class Media extends React.Component {
  componentDidMount() {
    this.props.setWidth && this.props.setWidth(this.media.offsetWidth);
  }

  render() {
    return (
      <MediaWrapper
        innerRef={media => this.media = media} // eslint-disable-line no-return-assign
      >
        {this.props.media}
      </MediaWrapper>
    );
  }
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

export default Media;
