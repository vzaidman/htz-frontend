import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { rgba, } from 'polished';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import ArticleImage from '../ArticleBodyImage/ArticleBodyImage';
import { buildUrl, } from '../../utils/buildImgURLs';
import Caption from '../Caption/Caption';
import Carousel from '../Carousel/Carousel';
import FullScreenMedia from '../FullScreenMedia/FullScreenMedia';
import IconBack from '../Icon/icons/IconBack';

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

const captionWrapperStyle = ({
  theme,
  position,
  moving,
  direction,
  isFullScreen,
}) => {
  const positionChange =
    direction === 'next' ? 100 : direction === 'previous' ? -100 : 0;

  return {
    marginBottom: '3rem',
    paddingInlineEnd: '1rem',
    paddingInlineStart: '1rem',
    position: isFullScreen ? 'static' : 'absolute',
    textAlign: 'start',
    top: '1rem',
    transform: `translateX(${position + positionChange}%)`,
    width: '100%',
    ...(moving ? {
      transitionProperty: 'all',
      ...theme.getDelay('transition', 1),
      ...theme.getDuration('transition', 3),
      ...theme.getTimingFunction('transition', 'linear'),
    } : {}),
  };
};

const dotsWrapperStyle = ({ theme, miscStyles, }) => ({
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const DotsWrapper = createComponent(dotsWrapperStyle);

const dotStyle = ({ theme, active, }) => ({
  backgroundColor: active
    ? theme.color('quaternary')
    : rgba(theme.color('neutral', '-6'), 0.5),
  borderRadius: '50%',
  display: 'inline-block',
  height: '1.3rem',
  marginStart: '1rem',
  marginEnd: '1rem',
  width: '1.3rem',
});
const Dot = createComponent(dotStyle, 'span');

const navigationStyle = ({
  theme,
  color,
  backgroundColor = 'transparent',
}) => ({
  backgroundColor,
  color,
  width: '4rem',
  height: '9rem',
  zIndex: '3',
});
const NavigationButton = createComponent(navigationStyle, 'button', [
  'aria-label',
  'onClick',
]);

const nextButtonStyle = () => ({
  end: '0',
});
const NextButton = createComponent(nextButtonStyle, NavigationButton, [
  'aria-label',
  'onClick',
]);

const previousButtonStyle = () => ({
  start: '0',
});
const PreviousButton = createComponent(previousButtonStyle, NavigationButton, [
  'aria-label',
  'onClick',
]);

const itemsWrapperStyle = ({ theme, }) => ({
  height: '100%',
  display: 'flex',
  flexWrap: 'nowrap',
  position: 'relative',
  extend: [
    theme.mq({ from: 's', misc: 'portrait', }, { flexShrink: '1', }),
    theme.mq({ from: 'm', misc: 'landscape', }, { flexShrink: '1', }),
  ],
});
const ItemsWrapper = createComponent(itemsWrapperStyle);

// eslint-disable-next-line react/prop-types
const DotsElement = ({ images, displayItemNum, miscStyles, }) => (
  <DotsWrapper miscStyles={miscStyles}>
    {images.map((img, i) => <Dot active={i === displayItemNum} />)}
  </DotsWrapper>
);

/* eslint-disable react/prop-types */
const CaptionElement = ({
  caption,
  credit,
  index,
  isFullScreen,
  itemsLength,
  size,
  position,
  moving,
  direction,
}) => (
  /* eslint-enable react/prop-types */
  <FelaComponent
    position={position}
    moving={moving}
    direction={direction}
    isFullScreen={isFullScreen}
    rule={captionWrapperStyle}
    render={({ className, theme, }) => (
      <div className={className}>
        <Caption
          caption={caption}
          credit={credit}
          color={[ 'neutral', '-10', ]}
          miscStyles={{
            maxHeight: '6rem',
            overflow: 'hidden',
            ':before': {
              content: theme.galleryI18n.captionPrefix(index + 1, itemsLength),
              color: theme.color('quaternary'),
              fontWeight: '700',
            },
          }}
          typeStyles={size}
        />
      </div>
    )}
  />
);

const Gallery = ({
  accessibility,
  currentDisplaying,
  forceAspect,
  images,
  name,
  showTitle,
}) => {
  const CarouselElement = () => (
    <FelaComponent
      render={({ theme, }) => (
        <Carousel
          itemsLength={images.length}
          loop
          miscStyles={{
            height: '100%',
            position: 'relative',
          }}
          startAt={currentDisplaying}
          render={({
            renderPreviousItems,
            renderNextItems,
            renderCurrentItems,
            renderButton,
            renderIndicator,
            displayItemNum,
            previousItemIndex,
            nextItemIndex,
            direction,
            moving,
          }) => {
            const image = images[displayItemNum];
            const previousImage = images[previousItemIndex];
            const nextImage = images[nextItemIndex];
            return (
              <FullScreenMedia
                enlargeOnClick={false}
                itemName={image.contentName}
                itemUrl={buildUrl(
                  image.contentId,
                  { ...image.imgArray[0], aspects: image.aspects, },
                  {
                    width: '1920',
                    aspect: 'full',
                    quality: 'auto',
                  }
                )}
                captionElement={
                  <CaptionElement
                    caption={image.title}
                    credit={image.credit}
                    index={displayItemNum}
                    isFullScreen
                    itemsLength={images.length}
                    size={-1}
                  />
                }
                render={({ isFullScreen, }) => {
                  const Image = imageProps => (
                    <ArticleImage
                      forceAspect={
                        isFullScreen ? 'full' : forceAspect || 'regular'
                      }
                      isFullScreen={isFullScreen}
                      showCaption={false}
                      enableEnlarge={false}
                      miscStyles={{
                        marginBottom: '0 !important',
                      }}
                      {...imageProps}
                    />
                  );
                  return (
                    <FelaComponent
                      style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <ItemsWrapper>
                        {renderPreviousItems(({ itemIndex, }) => (
                          <Image {...images[itemIndex]} />
                        ))}
                        {renderCurrentItems(
                          image.alt || image.title,
                          ({ itemIndex, }) => <Image {...images[itemIndex]} />
                        )}
                        {renderNextItems(({ itemIndex, }) => (
                          <Image {...images[itemIndex]} />
                        ))}
                        <FelaComponent
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'absolute',
                            top: '50%',
                            start: '0',
                            transform: 'translateY(-50%)',
                            width: '100%',
                            extend: [ isFullScreen ? { display: 'none', } : {}, ],
                          }}
                        >
                          {renderButton(({ changeItem, }) => (
                            <PreviousButton
                              color={theme.color('neutral', '-1')}
                              backgroundColor={rgba(
                                theme.color('quaternary'),
                                0.8
                              )}
                              onClick={event => {
                                event.stopPropagation();
                                changeItem('previous');
                              }}
                              aria-label={theme.previousText}
                            >
                              <IconBack
                                size={2.5}
                                miscStyles={{
                                  transform: 'rotateY(180deg)',
                                }}
                              />
                            </PreviousButton>
                          ))}
                          {renderButton(({ changeItem, }) => (
                            <NextButton
                              color={theme.color('neutral', '-1')}
                              backgroundColor={rgba(
                                theme.color('quaternary'),
                                0.8
                              )}
                              onClick={event => {
                                event.stopPropagation();
                                changeItem('next');
                              }}
                              aria-label={theme.nextText}
                            >
                              <IconBack size={2.5} />
                            </NextButton>
                          ))}
                        </FelaComponent>
                      </ItemsWrapper>
                      {renderIndicator(() => (
                        <FelaComponent
                          style={{
                            display: 'none',
                            extend: [
                              theme.mq(
                                { from: 'm', misc: 'landscape', },
                                {
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }
                              ),
                              theme.mq(
                                { from: 's', misc: 'portrait', },
                                {
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }
                              ),
                            ],
                          }}
                          render={({ className, }) =>
                            (isFullScreen ? (
                              <div className={className}>
                                {renderButton(({ changeItem, }) => (
                                  <PreviousButton
                                    color={theme.color('quaternary')}
                                    onClick={() => changeItem('previous')}
                                    aria-label={theme.previousText}
                                  >
                                    <IconBack
                                      size={2.5}
                                      miscStyles={{
                                        transform: 'rotateY(180deg)',
                                      }}
                                    />
                                  </PreviousButton>
                                ))}
                                <DotsElement {...{ images, displayItemNum, }} />
                                {renderButton(({ changeItem, }) => (
                                  <NextButton
                                    color={theme.color('quaternary')}
                                    onClick={() => changeItem('next')}
                                    aria-label={theme.nextText}
                                  >
                                    <IconBack size={2.5} />
                                  </NextButton>
                                ))}
                              </div>
                            ) : (
                              <FelaComponent
                                style={{
                                  backgroundColor: theme.color('neutral'),
                                  display: 'flex',
                                  justifyContent: 'center',
                                  padding: '1rem',
                                  position: 'relative',
                                  height: '13.5rem',
                                }}
                              >
                                <CaptionElement
                                  caption={previousImage.title}
                                  credit={previousImage.credit}
                                  direction={direction}
                                  index={previousItemIndex}
                                  itemsLength={images.length}
                                  moving={moving}
                                  position={100}
                                  size={-2}
                                />
                                <CaptionElement
                                  caption={image.title}
                                  credit={image.credit}
                                  direction={direction}
                                  index={displayItemNum}
                                  itemsLength={images.length}
                                  moving={moving}
                                  position={0}
                                  size={-2}
                                />
                                <CaptionElement
                                  caption={nextImage.title}
                                  credit={nextImage.credit}
                                  direction={direction}
                                  index={nextItemIndex}
                                  itemsLength={images.length}
                                  moving={moving}
                                  position={-100}
                                  size={-2}
                                />
                                <DotsElement
                                  miscStyles={{
                                    alignSelf: 'flex-end',
                                    marginBottom: '1rem',
                                  }}
                                  {...{ images, displayItemNum, }}
                                />
                              </FelaComponent>
                            ))
                          }
                        />
                      ))}
                    </FelaComponent>
                  );
                }}
              />
            );
          }}
        />
      )}
    />
  );

  return <CarouselElement />;
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
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isFullScreen !== nextState.isFullScreen ||
      this.state.currentDisplaying !== nextState.currentDisplaying
    );
  }

  render() {
    const { currentDisplaying, } = this.state;
    return <Gallery {...this.props} currentDisplaying={currentDisplaying} />;
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default ImageGallery;
