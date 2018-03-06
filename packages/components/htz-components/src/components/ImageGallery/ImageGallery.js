import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { rgba, } from 'polished';

import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import Carousel from '../Carousel/Carousel';
import IconZoomIn from '../Icon/icons/IconZoomIn';

const propTypes = {
  name: PropTypes.string.isRequired,
  showTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  accessibility: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  showTitle: true,
};

const wrapperStyle = () => ({
  position: 'relative',
});
const Wrapper = createComponent(wrapperStyle);

const zoomWrapperStyle = ({ theme, }) => ({
  backgroundColor: rgba(theme.color('neutral', '+1'), 0.5),
  borderRadius: '50%',
  cursor: 'zoom-in',
  end: '1rem',
  height: '5rem',
  padding: '1rem',
  position: 'absolute',
  top: '1rem',
  width: '5rem',
  zIndex: '1',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
});

// eslint-disable-next-line react/prop-types
const ZoomWrapperUnstyled = ({ theme, ...props }) => (
  <button {...props} aria-label={theme.zoominText}>
    <IconZoomIn
      color={[ 'neutral', '-10', ]}
      size={2.5}
      miscStyles={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  </button>
);


const ZoomWrapper = createComponent(
  zoomWrapperStyle,
  withTheme(ZoomWrapperUnstyled),
  props => Object.keys(props)
);

const captionWrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
  padding: '1.5rem',
  textAlign: 'start',
});
const CaptionWrapper = createComponent(captionWrapperStyle);

const dotsWrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '3rem',
});
const DotsWrapper = createComponent(dotsWrapperStyle);

const dotStyle = ({ theme, active, }) => ({
  backgroundColor: active ?
    theme.color('quaternary') :
    rgba(theme.color('neutral', '-6'), 0.5),
  borderRadius: '50%',
  display: 'inline-block',
  height: '1.3rem',
  marginEnd: '2rem',
  width: '1.3rem',
});
const Dot = createComponent(dotStyle, 'span');

class ImageGallery extends React.Component {
  state = {
    currentDisplaying: 0,
    fullScreen: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.currentDisplaying !== nextState.currentDisplaying ||
      this.state.fullScreen !== nextState.fullScreen
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  toggleFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
  };

  currentDisplaying = index => {
    this.setState({
      currentDisplaying: index,
    });
  };

  render() {
    const {
      images,
      theme,
      name,
      showTitle,
      accessibility,
    } = this.props;
    const image = images[this.state.currentDisplaying];
    return (
      <Wrapper>
        <ZoomWrapper onClick={this.toggleFullScreen} />
        <Carousel
          buttonsColor={rgba(theme.color('quaternary'), 0.9)}
          Component={ArticleImage}
          componentAttrs={{
            forceAspect: 'regular',
            showCaption: false,
            enableEnlarge: false,
            miscStyles: {
              marginBottom: '0 !important', /** TODO: for some reason it won't Trump */
            },
          }}
          items={images}
          loop
          onStateChangeCB={this.currentDisplaying}
          startAt={this.state.currentDisplaying}
        />
        <CaptionWrapper>
          <Caption
            caption={image.title}
            credit={image.credit}
            color={[ 'neutral', '-10', ]}
            typeStyles={-2}
          />
          <DotsWrapper>
            {images.map((img, i) => (
              <Dot
                active={i === this.state.currentDisplaying}
              />
            ))}
          </DotsWrapper>
        </CaptionWrapper>
      </Wrapper>
    );
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default withTheme(ImageGallery);
