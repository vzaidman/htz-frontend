import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
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
   * The duration of the sliding animation.
   */
  animationDuration: PropTypes.number,
  /**
   * Disables you to see the gallery in full-screen.
   */
  disableFullScreen: PropTypes.bool,
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
   * Should the gallery be rendered as full-screen only.
   */
  fullScreenOnly: PropTypes.bool,
  /**
   * A method that should be executed when closing full-screen.
   */
  exitFullScreenAction: PropTypes.func,
  /**
   * Gallery's title/name for display (if enabled).
   */
  name: PropTypes.string.isRequired,
  /**
   * A render prop that will trump the default caption and lice(indicator).
   */
  renderCaption: PropTypes.func,
  /**
   * Should the gallery's title be displayed on the page.
   */
  showTitle: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ]),
  /**
   * At what index should the gallery start.
   */
  startAt: PropTypes.number,
};

const galleryProps = {
  ...propTypes,
  /**
   * Current displaying image's index.
   */
  currentDisplaying: PropTypes.number.isRequired,
};

const defaultProps = {
  animationDuration: 3,
  disableFullScreen: false,
  forceAspect: null,
  fullScreenOnly: false,
  isFullScreen: false,
  renderCaption: null,
  showTitle: true,
  exitFullScreenAction: null,
  startAt: 0,
};

const buildImgOptions = (aspect, isFullScreen) => ({
  sizes: isFullScreen
    ? '100vw'
    : '(min-width:1280px) 800px,(min-width:1024px) 490px,(min-width:600px) 540px, calc(100vw - 6rem)',
  transforms: [
    {
      width: '350',
      aspect,
      quality: 'auto',
    },
    {
      width: '490',
      aspect,
      quality: 'auto',
    },
    {
      width: '600',
      aspect,
      quality: 'auto',
    },

    {
      width: '700',
      aspect,
      quality: 'auto',
    },
    {
      width: '1024',
      aspect,
      quality: 'auto',
    },
    {
      width: '1280',
      aspect,
      quality: 'auto',
    },
  ],
});


const captionWrapperStyle = ({
  theme,
  position,
  moving,
  direction,
  isFullScreen,
  animationDuration,
  miscStyles,
}) => {
  const positionChange = direction === 'next' ? 100 : direction === 'previous' ? -100 : 0;

  return {
    marginBottom: '3rem',
    paddingInlineEnd: '1rem',
    paddingInlineStart: '1rem',
    position: isFullScreen ? 'static' : 'absolute',
    textAlign: 'start',
    top: '1rem',
    display: 'flex',
    transform: `translateX(${position + positionChange}%)`,
    width: '100%',
    ...(moving
      ? {
        transitionProperty: 'all',
        ...theme.getDuration('transition', animationDuration),
        ...theme.getTimingFunction('transition', 'swiftOut'),
      }
      : {}),
    extend: [
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
};

// eslint-disable-next-line react/prop-types
const DotsElement = ({ images, displayItemNum, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
  >
    {images.map((img, i) => (
      <FelaComponent
        style={theme => ({
          backgroundColor:
            i === displayItemNum
              ? theme.color('quaternary')
              : rgba(theme.color('neutral', '-6'), 0.5),
          borderRadius: '50%',
          display: 'inline-block',
          height: '1.3rem',
          marginStart: '1rem',
          marginEnd: '1rem',
          width: '1.3rem',
        })}
        render={({ className, }) => <span className={className} />}
      />
    ))}
  </FelaComponent>
);

/* eslint-disable react/prop-types */
export const CaptionElement = ({
  animationDuration,
  caption,
  credit,
  index,
  isFullScreen,
  itemsLength,
  size,
  creditSize,
  position,
  moving,
  direction,
  wrapperMiscStyles,
  captionMiscStyles,
  prefixContent,
}) => (
  /* eslint-enable react/prop-types */
  <FelaComponent
    position={position}
    moving={moving}
    direction={direction}
    isFullScreen={isFullScreen}
    animationDuration={animationDuration}
    miscStyles={wrapperMiscStyles}
    rule={captionWrapperStyle}
    render={({ className, theme, }) => (
      <div className={className}>
        <FelaComponent
          style={{
            ...theme.type(size),
            color: theme.color('quaternary'),
            fontWeight: '700',
            flexShrink: '0',
            marginEnd: '1rem',
          }}
          render="span"
        >
          {prefixContent || theme.galleryI18n.captionPrefix(index + 1, itemsLength)}
        </FelaComponent>
        <Caption
          caption={caption}
          credit={credit}
          creditprefix="צילום"
          color={[ 'neutral', '-10', ]}
          miscStyles={{
            overflow: 'hidden',
            display: isFullScreen ? 'static' : 'flex',
            ...(captionMiscStyles || {}),
          }}
          captionMiscStyles={!isFullScreen
            ? {
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }
            : {}
          }
          typeStyles={size}
          creditTypeStyles={creditSize}
        />
      </div>
    )}
  />
);

const Gallery = ({
  accessibility,
  animationDuration,
  currentDisplaying,
  forceAspect,
  images,
  renderCaption,
  fullScreenOnly,
  exitFullScreenAction,
  disableFullScreen,
}) => {
  // const renderCaption = false;
  const CarouselElement = () => (
    <FelaComponent
      render={({ theme, }) => (
        <Carousel
          animationDuration={animationDuration}
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
                itemName={image.contentName}
                fullScreenOnly={fullScreenOnly}
                disableFullScreen={disableFullScreen}
                exitAction={exitFullScreenAction}
                itemUrl={buildUrl(
                  image.contentId,
                  { ...image.imgArray[0], },
                  {
                    width: '1920',
                    aspect: 'full',
                    quality: 'auto',
                  }
                )}
                captionElement={(
                  <CaptionElement
                    animationDuration={animationDuration}
                    caption={image.title}
                    credit={image.credit}
                    index={displayItemNum}
                    isFullScreen
                    itemsLength={images.length}
                    size={-1}
                  />
                )}
                render={({ isFullScreen, toggleFullScreen, }) => {
                  const Image = imageProps => (isFullScreen ? (
                    <ArticleImage
                      forceAspect="full"
                      isFullScreen
                      showCaption={false}
                      ignoreSchema
                      shouldOpenGallery={false}
                      imgOptions={aspect => buildImgOptions(aspect, true)}
                      miscStyles={{
                        textAlign: 'center',
                        marginBottom: '0 !important',
                      }}
                      {...imageProps}
                    />
                  ) : (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div onClick={!disableFullScreen ? toggleFullScreen : null}>
                      <ArticleImage
                        forceAspect={forceAspect || 'regular'}
                        isFullScreen={false}
                        showCaption={false}
                        ignoreSchema
                        shouldOpenGallery={false}
                        imgOptions={aspect => buildImgOptions(aspect, false)}
                        miscStyles={{
                          textAlign: 'center',
                          marginBottom: '0 !important',
                        }}
                        {...imageProps}
                      />
                    </div>
                  ));
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
                      <FelaComponent
                        style={{
                          height: '100%',
                          display: 'flex',
                          flexWrap: 'nowrap',
                          position: 'relative',
                          ...(isFullScreen ? { paddingBottom: '8rem', } : {}),
                          extend: [
                            theme.mq({ from: 's', misc: 'portrait', }, { flexShrink: '1', }),
                            theme.mq({ from: 'm', misc: 'landscape', }, { flexShrink: '1', }),
                          ],
                        }}
                      >
                        {renderPreviousItems(({ itemIndex, }) => (
                          <Image {...images[itemIndex]} />
                        ))}
                        {renderCurrentItems(image.alt || image.title, ({ itemIndex, }) => (
                          <Image {...images[itemIndex]} />
                        ))}
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
                            zIndex: 2,
                            extend: [ isFullScreen ? { display: 'none', } : {}, ],
                          }}
                        >
                          {renderButton(({ changeItem, }) => (
                            <FelaComponent
                              style={{
                                width: '4rem',
                                height: '9rem',
                                zIndex: '3',
                                color: theme.color('neutral', '-1'),
                                backgroundColor: rgba(theme.color('quaternary'), 0.8),
                                start: '0',
                                ':focus': {
                                  outline: 'none',
                                },
                              }}
                              render={({ className, }) => (
                                <button
                                  type="button"
                                  className={className}
                                  onClick={event => {
                                    event.preventDefault();
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
                                </button>
                              )}
                            />
                          ))}
                          {renderButton(({ changeItem, }) => (
                            <FelaComponent
                              style={{
                                width: '4rem',
                                height: '9rem',
                                zIndex: '3',
                                end: '0',
                                color: theme.color('neutral', '-1'),
                                backgroundColor: rgba(theme.color('quaternary'), 0.8),
                                ':focus': {
                                  outline: 'none',
                                },
                              }}
                              render={({ className, }) => (
                                <button
                                  type="button"
                                  className={className}
                                  onClick={event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    changeItem('next');
                                  }}
                                  aria-label={theme.nextText}
                                >
                                  <IconBack size={2.5} />
                                </button>
                              )}
                            />
                          ))}
                        </FelaComponent>
                      </FelaComponent>
                      {renderIndicator(() => (
                        <FelaComponent
                          style={{
                            display: 'none',
                            position: 'absolute',
                            bottom: '0',
                            start: '50%',
                            transform: 'translateX(50%)',
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
                          render={({ className, }) => (isFullScreen ? (
                            <div className={className}>
                              {renderButton(({ changeItem, }) => (
                                <FelaComponent
                                  style={{
                                    width: '4rem',
                                    height: '9rem',
                                    zIndex: '3',
                                    color: theme.color('quaternary'),
                                    backgroundColor: 'transparent',
                                    start: '0',
                                  }}
                                  render={({ className, }) => (
                                    <button
                                      type="button"
                                      className={className}
                                      onClick={() => changeItem('previous')}
                                      aria-label={theme.previousText}
                                    >
                                      <IconBack
                                        size={2.5}
                                        miscStyles={{
                                          transform: 'rotateY(180deg)',
                                        }}
                                      />
                                    </button>
                                  )}
                                />
                              ))}
                              <DotsElement {...{ images, displayItemNum, }} />
                              {renderButton(({ changeItem, }) => (
                                <FelaComponent
                                  style={{
                                    width: '4rem',
                                    height: '9rem',
                                    zIndex: '3',
                                    end: '0',
                                    color: theme.color('quaternary'),
                                    backgroundColor: 'transparent',
                                  }}
                                  render={({ className, }) => (
                                    <button
                                      type="button"
                                      className={className}
                                      onClick={() => changeItem('next')}
                                      aria-label={theme.nextText}
                                    >
                                      <IconBack size={2.5} />
                                    </button>
                                  )}
                                />
                              ))}
                            </div>
                          )
                            : renderCaption
                              ? renderCaption({
                                isFullScreen,
                                renderButton,
                                previousImage,
                                image,
                                nextImage,
                                displayItemNum,
                                previousItemIndex,
                                nextItemIndex,
                                direction,
                                moving,
                                animationDuration,
                                currentDisplaying,
                                itemsLength: images.length,
                              })
                              : (
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
                                    animationDuration={animationDuration}
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
                                    animationDuration={animationDuration}
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
                                    animationDuration={animationDuration}
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
                              )
                          )}
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
  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState || { currentDisplaying: nextProps.startAt, };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isFullScreen !== nextState.isFullScreen
      || this.state.currentDisplaying !== nextState.currentDisplaying
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
