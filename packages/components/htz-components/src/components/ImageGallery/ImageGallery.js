import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { rgba, } from 'polished';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import ArticleImage from '../ArticleImage/ArticleImage';
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

const captionWrapperStyle = theme => ({
  display: 'flex',
  marginBottom: '3rem',
  textAlign: 'start',
});

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

const itemsWrapperStyle = ({ miscStyles, theme, }) => ({
  height: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  position: 'relative',
});
const ItemsWrapper = createComponent(itemsWrapperStyle);

// eslint-disable-next-line react/prop-types
const DotsElement = ({ images, displayItemNum, miscStyles, }) => (
  <DotsWrapper miscStyles={miscStyles}>
    {images.map((img, i) => <Dot active={i === displayItemNum} />)}
  </DotsWrapper>
);

// eslint-disable-next-line react/prop-types
const CaptionElement = ({ caption, credit, index, itemsLength, }) => (
  <FelaComponent
    style={captionWrapperStyle}
    render={({ className, theme, }) => (
      <div className={className}>
        <Caption
          caption={caption}
          credit={credit}
          color={[ 'neutral', '-10', ]}
          miscStyles={{
            ':before': {
              content: theme.gallery.captionPrefix(index + 1, itemsLength),
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
  forceAspect,
  images,
  isFullScreen,
  name,
  showTitle,
}) => {
  const Image = imageProps => (
    <ArticleImage
      forceAspect={isFullScreen ? 'full' : forceAspect || 'regular'}
      isFullScreen
      showCaption={false}
      enableEnlarge={false}
      miscStyles={{
        textAlign: 'center',
        marginBottom:
          '0 !important' /** TODO: for some reason it won't Trump */,
        height: '100%',
      }}
      {...imageProps}
    />
  );

  const CarouselElement = () => (
    <FelaComponent
      render={({ theme, }) => (
        <Carousel
          itemsLength={images.length}
          loop
          miscStyles={{
            height: '100%',
          }}
          startAt={currentDisplaying}
          render={({
            renderPreviousItems,
            renderNextItems,
            renderCurrentItems,
            renderButton,
            renderIndicator,
            displayItemNum,
          }) =>
            // eslint-disable-line arrow-body-style
            // changeCurrentDisplaying(displayItemNum);
             (
               <Fragment>
                 <ItemsWrapper>
                   {renderPreviousItems(({ itemIndex, }) => (
                     <Image {...images[itemIndex]} />
                  ))}
                   {renderCurrentItems(({ itemIndex, }) => (
                     <Image {...images[itemIndex]} />
                  ))}
                   {renderNextItems(({ itemIndex, }) => (
                     <Image {...images[itemIndex]} />
                  ))}
                   {!isFullScreen && (
                   <FelaComponent
                     style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '100%',
                      }}
                   >
                     {renderButton(({ changeItem, }) => (
                       <PreviousButton
                         color={theme.color('neutral', '-1')}
                         backgroundColor={rgba(theme.color('quaternary'), 0.8)}
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
                     {renderButton(({ changeItem, }) => (
                       <NextButton
                         color={theme.color('neutral', '-1')}
                         backgroundColor={rgba(theme.color('quaternary'), 0.8)}
                         onClick={() => changeItem('next')}
                         aria-label={theme.nextText}
                       >
                         <IconBack size={2.5} />
                       </NextButton>
                      ))}
                   </FelaComponent>
                  )}
                 </ItemsWrapper>
                 {renderIndicator(() => (
                   <FelaComponent
                     style={{
                      display: 'flex',
                      justifyContent: 'center',
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
                            padding: '1rem',
                          }}
                        >
                          <CaptionElement
                            caption={images[displayItemNum].title}
                            credit={images[displayItemNum].credit}
                            index={displayItemNum}
                            itemsLength={images.length}
                          />
                          <DotsElement
                            miscStyles={{
                              marginBottom: '1rem',
                            }}
                            {...{ images, displayItemNum, }}
                          />
                        </FelaComponent>
                      ))
                    }
                   />
                ))}
               </Fragment>
            )
          }
        />
      )}
    />
  );

  return <CarouselElement isFullScreen={isFullScreen} />;
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
    const { currentDisplaying, } = this.state;
    return enableEnlarge ? (
      <FullScreenMedia
        captionElement={
          <CaptionElement
            caption={images[currentDisplaying].title}
            credit={images[currentDisplaying].credit}
            index={currentDisplaying}
            itemsLength={images.length}
          />
        }
        render={({ isFullScreen, mediaRef, }) => (
          <Gallery
            {...this.props}
            changeCurrentDisplaying={this.changeCurrentDisplaying}
            currentDisplaying={currentDisplaying}
            isFullScreen={isFullScreen}
          />
        )}
      />
    ) : (
      <Gallery {...this.props} />
    );
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default ImageGallery;
