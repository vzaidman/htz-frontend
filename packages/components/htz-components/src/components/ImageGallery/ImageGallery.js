import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { rgba, } from 'polished';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import Carousel from '../Carousel/Carousel';
import FullScreenMedia from '../FullScreenMedia/FullScreenMedia';
import IconZoomIn from '../Icon/icons/IconZoomIn';

const propTypes = {
  /**
   * Gallery's title/name for Aria.
   */
  accessibility: PropTypes.string.isRequired,
  /**
   * Enable the button that allows you to see the gallery in full-screen.
   */
  enableEnlarge: PropTypes.bool,
  /**
   * Force the images in the gallery to render in a specific aspect,
   * regardless of the gallery's default.
   */
  forceAspect: PropTypes.string,
  /**
   * An array of images' objects you want to display in the gallery.
   */
  images: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  /**
   * Gallery's title/name for display (if enabled).
   */
  name: PropTypes.string.isRequired,
  /**
   * Should the gallery's title be displayed on the page.
   */
  showTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  enableEnlarge: true,
  forceAspect: null,
  showTitle: true,
};

const wrapperStyle = ({ theme, }) => ({
  position: 'relative',
  ...parseComponentProp(
    'marginBottom',
    theme.articleStyle.body.marginBottom,
    theme.mq,
    (prop, value) => ({ [prop]: value, })
  ),
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

/**
 * The ImageGallery component receives an array of images/pictures objects,
 * and mount them in a [`Carousel`](./#carousel) component, with [`ArticleImage`](./#articleimage)
 * component as a renderer.
 */
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
      accessibility,
      enableEnlarge,
      forceAspect,
      images,
      name,
      showTitle,
      theme,
    } = this.props;

    const image = images[this.state.currentDisplaying];

    const CarouselElement = ({ isFullScreen, }) => (
      <Carousel
        buttonsColor={rgba(theme.color('quaternary'), 0.9)}
        Component={ArticleImage}
        componentAttrs={{
          forceAspect: isFullScreen ? 'full' : forceAspect || 'regular',
          isFullScreen,
          showCaption: false,
          enableEnlarge: false,
          miscStyles: {
            marginBottom: '0 !important', /** TODO: for some reason it won't Trump */
            height: '100%',
          },
        }}
        items={images}
        loop
        onStateChangeCB={this.currentDisplaying}
        startAt={this.state.currentDisplaying}
      />
    );

    const DotsElement = () => (
      <DotsWrapper>
        {images.map((img, i) => (
          <Dot
            active={i === this.state.currentDisplaying}
          />
        ))}
      </DotsWrapper>
    );

    return (
      <Fragment>
        <Wrapper>
          {enableEnlarge && <ZoomWrapper onClick={this.toggleFullScreen} />}
          <CarouselElement />
          <CaptionWrapper>
            <Caption
              caption={image.title}
              credit={image.credit}
              color={[ 'neutral', '-10', ]}
              typeStyles={-2}
            />
            <DotsElement />
          </CaptionWrapper>
        </Wrapper>
        {this.state.fullScreen && (
          <FullScreenMedia
            closeCallBack={this.toggleFullScreen}
            credit={image.credit}
            media={
              <Fragment>
                <CarouselElement isFullScreen />
                <DotsElement />
              </Fragment>
            }
            mediaType={'gallery'}
            title={image.title}
          />
        )}
      </Fragment>
    );
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default withTheme(ImageGallery);
