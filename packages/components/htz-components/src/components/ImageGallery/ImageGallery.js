import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { rgba, } from 'polished';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import Carousel from '../Carousel/Carousel';
import FullScreenMedia from '../FullScreenMedia/FullScreenMedia';

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
  showTitle: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ]),
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

const captionWrapperStyle = theme => ({
  display: 'flex',
  textAlign: 'start',
});

const dotsWrapperStyle = () => ({
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});
const DotsWrapper = createComponent(dotsWrapperStyle);

const dotStyle = ({ theme, active, }) => ({
  backgroundColor: active
    ? theme.color('quaternary')
    : rgba(theme.color('neutral', '-6'), 0.5),
  borderRadius: '50%',
  display: 'inline-block',
  height: '1.3rem',
  marginEnd: '2rem',
  width: '1.3rem',
});
const Dot = createComponent(dotStyle, 'span');

// eslint-disable-next-line react/prop-types
const DotsElement = ({ items, currentDisplaying, }) => (
  <DotsWrapper>
    {items.map((img, i) => <Dot active={i === currentDisplaying} />)}
  </DotsWrapper>
);

// eslint-disable-next-line react/prop-types
const CaptionElement = ({ items, currentDisplaying, }) => (
  <FelaComponent
    style={captionWrapperStyle}
    render={({ className, theme, }) => (
      <div className={className}>
        <Caption
          caption={items[currentDisplaying].title}
          credit={items[currentDisplaying].credit}
          color={[ 'neutral', '-10', ]}
          miscStyles={{
            ':before': {
              content: theme.gallery.captionPrefix(
                currentDisplaying + 1,
                items.length
              ),
              color: theme.color('quaternary'),
              fontWeight: '700',
            },
          }}
          typeStyles={-2}
        />
      </div>
    )}
  />
);

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
}) => {
  const CarouselElement = () => (
    <FelaComponent
      render={({ theme, }) => (
        <Carousel
          buttonsColor={rgba(theme.color('quaternary'), 0.9)}
          Component={ArticleImage}
          componentAttrs={{
            forceAspect: isFullScreen ? 'full' : forceAspect || 'regular',
            isFullScreen,
            showCaption: false,
            enableEnlarge: false,
            miscStyles: {
              marginBottom:
                '0 !important' /** TODO: for some reason it won't Trump */,
              height: '100%',
            },
          }}
          IndicationElement={DotsElement}
          isFullScreen={isFullScreen}
          items={images}
          loop
          onStateChangeCB={changeCurrentDisplaying}
          startAt={currentDisplaying}
        />
      )}
    />
  );

  return (
    <Wrapper isFullScreen={isFullScreen}>
      <CarouselElement isFullScreen={isFullScreen} />
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
      this.state.isFullScreen !== nextState.isFullScreen ||
      this.state.currentDisplaying !== nextState.currentDisplaying
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
    const { enableEnlarge, images, } = this.props;
    const { currentDisplaying, isFullScreen, } = this.state;
    return enableEnlarge ? (
      <FullScreenMedia
        captionElement={
          <CaptionElement
            items={images}
            currentDisplaying={currentDisplaying}
          />
        }
        credit={images[currentDisplaying].credit}
        media={
          <Gallery
            {...this.props}
            changeCurrentDisplaying={this.changeCurrentDisplaying}
            currentDisplaying={currentDisplaying}
            isFullScreen={isFullScreen}
          />
        }
        title={images[currentDisplaying].title}
        toggleFullScreenCB={this.toggleFullScreen}
      />
    ) : (
      <Gallery {...this.props} />
    );
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default ImageGallery;
