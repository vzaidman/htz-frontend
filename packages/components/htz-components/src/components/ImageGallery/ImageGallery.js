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
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Should the gallery be rendered as full-screen.
   */
  isFullScreen: PropTypes.bool,
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

const galleryProps = {
  ...propTypes,
  /**
   * A callback that changes the Main component's state with the current displaying image's index.
   */
  changeCurrentDisplaying: PropTypes.func.isRequired,
  /**
   * Current displaying image's index.
   */
  currentDisplaying: PropTypes.number.isRequired,
};

const defaultProps = {
  enableEnlarge: true,
  forceAspect: null,
  isFullScreen: false,
  showTitle: true,
};

const wrapperStyle = ({ theme, isFullScreen, }) => ({
  position: 'relative',
  ...parseComponentProp(
    'marginBottom',
    theme.articleStyle.body.marginBottom,
    theme.mq,
    (prop, value) => ({ [prop]: value, })
  ),
  ...(isFullScreen && {
    height: '100%',
  }),
});
const Wrapper = createComponent(wrapperStyle);

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

const dotsPropTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentDisplaying: PropTypes.number.isRequired,
};

const DotsElement = ({ items, currentDisplaying, }) => (
  <DotsWrapper>
    {items.map((img, i) => (
      <Dot
        active={i === currentDisplaying}
      />
    ))}
  </DotsWrapper>
);

DotsElement.propTypes = dotsPropTypes;

const Gallery = ({
  accessibility,
  changeCurrentDisplaying,
  currentDisplaying,
  enableEnlarge,
  forceAspect,
  images,
  isFullScreen,
  name,
  showTitle,
  theme,
}) => {
  const CarouselElement = () => (
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
      IndicationComponent={DotsElement}
      items={images}
      loop
      onStateChangeCB={changeCurrentDisplaying}
      startAt={currentDisplaying}
    />
  );

  return (
    <Wrapper isFullScreen={isFullScreen}>
      <CarouselElement isFullScreen={isFullScreen} />
      <CaptionWrapper>
        {!isFullScreen &&
          <Caption
            caption={images[currentDisplaying].title}
            credit={images[currentDisplaying].credit}
            color={[ 'neutral', '-10', ]}
            typeStyles={-2}
          />
        }
        <DotsElement
          items={images}
          currentDisplaying={currentDisplaying}
        />
      </CaptionWrapper>
    </Wrapper>
  );
};

Gallery.propTypes = galleryProps;
Gallery.defaultProps = defaultProps;

/**
 * The ImageGallery component receives an array of images/pictures objects,
 * and mount them in a [`Carousel`](./#carousel) component, with [`ArticleImage`](./#articleimage)
 * component as a renderer.
 */
class ImageGallery extends React.Component {
  state = {
    currentDisplaying: 0,
    isFullScreen: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.currentDisplaying !== nextState.currentDisplaying ||
      this.state.isFullScreen !== nextState.isFullScreen
    );
  }
  toggleFullScreen = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen,
    });
  };

  changeCurrentDisplaying = index => {
    this.setState({
      currentDisplaying: index,
    });
  };

  render() {
    return (
      this.props.enableEnlarge ?
        <FullScreenMedia
          credit={this.props.images[this.state.currentDisplaying].credit}
          media={
            <Gallery
              {...this.props}
              changeCurrentDisplaying={this.changeCurrentDisplaying}
              currentDisplaying={this.state.currentDisplaying}
              isFullScreen={this.state.isFullScreen}
            />
          }
          title={this.props.images[this.state.currentDisplaying].title}
          toggleFullScreenCB={this.toggleFullScreen}
        />
        :
        <Gallery {...this.props} />
    );
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default withTheme(ImageGallery);
