import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';

import Caption from '../Caption/Caption';
import Image from '../Image/Image';
import Picture from '../Image/Picture';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import ApolloBoundaryConsumer from '../ApolloBoundary/ApolloConsumer';
import EnlargementWrapper from './EnlargementWrapper';

const articleImagePropTypes = {
  /**
   * A mutation function that passes from `AddImageToSchema` mutation.
   */
  addImageToSchema: PropTypes.func.isRequired,
  /** The image's aspect ratio to use as base crop, default 'full' */
  aspects: PropTypes.string.isRequired,
  /**
   * react-fela class names
   */
  className: PropTypes.string,
  /** Image id from polopoly */
  contentId: PropTypes.string.isRequired,
  /** Image name from polopoly */
  contentName: PropTypes.string.isRequired,
  /**
   * Image's credit.
   */
  credit: PropTypes.string,
  /**
   * Force the image to render in a specific aspect, regardless of the editor's choice.
   */
  forceAspect: PropTypes.string,
  /**
   * Is it a standard image or infographic.
   */
  imageType: PropTypes.string.isRequired,
  /**
   * Image's dada that comes from polopoly.
   */
  imgArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * A function that gets the aspect and isFullScreen args
   * should return an objects of imgOptions the includes sizes and transforms
   */
  imgOptions: PropTypes.func.isRequired,
  /**
   * Should the image be rendered as full-screen.
   */
  isFullScreen: PropTypes.bool,
  /**
   * Is the image is a headline (Position 0).
   */
  isHeadline: PropTypes.bool,
  /**
   * Is this image is the last item in the article body (needed for margin bottom).
   */
  lastItem: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /**
   * Should the image open an Image gallery on click.
   */
  shouldOpenGallery: PropTypes.bool,
  /**
   * Should the image be rendered with its caption.
   */
  showCaption: PropTypes.bool,
  /**
   * Image's title.
   */
  title: PropTypes.string,
  /**
   * The image's selected view mode set by the editor (regular, full or 1/3).
   */
  viewMode: PropTypes.string.isRequired,
};

const articleImageDefaultProps = {
  className: null,
  credit: null,
  forceAspect: null,
  isFullScreen: false,
  isHeadline: false,
  lastItem: false,
  miscStyles: {},
  shouldOpenGallery: true,
  showCaption: true,
  title: null,
};

const imagePropTypes = {
  /**
   * Force the image to render in a specific aspect, regardless of the editor's choice.
   */
  forceAspect: PropTypes.string,
  /**
   * Is it a standard image or infographic.
   */
  imageType: PropTypes.string.isRequired,
  /**
   * Image's dada that comes from polopoly.
   */
  imgArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * A function that gets the aspect and isFullScreen args
   * should return an objects of imgOptions the includes sizes and transforms
   */
  imgOptions: PropTypes.func.isRequired,
  /**
   * Should the view switch to full-screen.
   */
  isFullScreen: PropTypes.bool,
  /**
   * The image's selected view mode set by the editor (regular, full or 1/3).
   */
  viewMode: PropTypes.string,

  /* Image description */

  accessibility: PropTypes.string,
};

const imageDefaultProps = {
  isFullScreen: false,
  viewMode: null,
  forceAspect: null,
  accessibility: null,
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const wrapperStyle = ({
  viewMode,
  lastItem,
  isHeadline,
  miscStyles,
  theme,
  isFullScreen,
}) => ({
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '100%',
  flexShrink: '0',
  ...(isFullScreen
    ? {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    : {}),
  extend: [
    theme.mq(
      { from: 's', misc: 'portrait', },
      {
        ...(isFullScreen ? { display: 'block', } : {}),
      }
    ),
    theme.mq(
      { from: 'm', misc: 'landscape', },
      {
        ...(isFullScreen ? { display: 'block', } : {}),
      }
    ),
    ...(!lastItem && !isHeadline
      ? [
        parseComponentProp(
          'marginBottom',
          theme.articleStyle.body.marginBottom,
          theme.mq,
          mediaQueryCallback
        ),
      ]
      : []),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    [ 'OneThirdView', 'TwoThirdView', 'VerticalView', ].includes(viewMode)
    && !isFullScreen
      ? {
        float: 'end',
        marginBottom: '0.75rem',
        marginStart: '1.5rem',
        ...(viewMode !== 'VerticalView'
          ? {
            width: `calc(100% *  ${viewMode === 'OneThirdView' ? 1 : 2}/3)`,
          }
          : {}),
        width: 'calc(100%*1/3)',
      }
      : {},
  ],
});

const getAspect = viewMode => {
  switch (viewMode) {
    case 'regularModeBigImage':
      return 'full';
    case 'OneThirdView':
      return 'full';
    case 'landscapeView':
      return 'landscape';
    case 'squareView':
      return 'square';
    case 'verticalView':
      return 'vertical';
    case 'FullColumnWithVerticalImage':
      return 'full';
    default:
      return 'full';
  }
};

const ImageElement = props => {
  const {
    imageType,
    imgArray,
    isFullScreen,
    viewMode,
    forceAspect,
    imgOptions,
  } = props;

  const aspect = imageType === 'infographic' ? 'full' : forceAspect || getAspect(viewMode);

  const sourceAndImageOptions = imgOptions
    ? imgOptions(aspect, isFullScreen)
    : {
      sizes: '100vw',
      transforms: [
        {
          width: 'auto',
          aspect,
          quality: 'auto',
        },
      ],
    };

  return imageType === 'image' ? (
    <Image
      hasWrapper={!isFullScreen}
      data={props}
      attrs={{ alt: props.accessibility, }}
      imgOptions={sourceAndImageOptions}
      bgcolor={isFullScreen ? 'neutral' : ''}
    />
  ) : (
    <Picture
      hasWrapper={!isFullScreen}
      defaultImg={{
        data: {
          ...props,
          imgArray: [ imgArray[1], ],
        },
        sourceOptions: sourceAndImageOptions,
      }}
      sources={[
        {
          from: 'm',
          data: {
            ...props,
            imgArray: [ imgArray[0], ],
          },
          sourceOptions: sourceAndImageOptions,
        },
      ]}
      bgcolor={isFullScreen ? 'neutral' : ''}
    />
  );
};

ImageElement.propTypes = imagePropTypes;
ImageElement.defaultProps = imageDefaultProps;

const openGallery = ({ client, contentId, }) => client.writeData({
  data: {
    pageGallery: {
      isOpen: true,
      startWith: contentId,
      __typename: 'PageGallery',
    },
  },
});

/**
 * The ArticleImage component takes the Image/Picture component, strips it
 * from it's wrapper and wraps it with a specific new one, according to the
 * image's Meta (which is unique per article), and adds a [`full-screen`](./#fullscreenmedia) option as
 * a default.
 */
function ArticleBodyImage({
  className,
  credit,
  imgOptions,
  isFullScreen,
  isHeadline,
  lastItem,
  miscStyles,
  showCaption,
  title,
  shouldOpenGallery,
  forceAspect,
  viewMode,
  ...image
}) {
  return (
    <FelaComponent
      rule={wrapperStyle}
      viewMode={forceAspect || viewMode}
      lastItem={lastItem}
      isHeadline={isHeadline}
      className={className}
      miscStyles={miscStyles}
      isFullScreen={isFullScreen}
      render={({
        className,
        theme: {
          creditPrefixI18n: { imageCreditPrefix, },
        },
      }) => (
        <figure className={className}>
          {shouldOpenGallery && !isFullScreen ? (
            <ApolloBoundaryConsumer>
              {client => (
                <EnlargementWrapper
                  isFullScreen={isFullScreen}
                  onClick={() => openGallery({ client, contentId: image.contentId, })
                  }
                >
                  <ImageElement
                    imgOptions={imgOptions}
                    forceAspect={forceAspect}
                    viewMode={viewMode}
                    {...image}
                    isFullScreen={isFullScreen}
                  />
                </EnlargementWrapper>
              )}
            </ApolloBoundaryConsumer>
          ) : (
            <ImageElement
              imgOptions={imgOptions}
              forceAspect={forceAspect}
              viewMode={viewMode}
              {...image}
              isFullScreen={isFullScreen}
            />
          )}
          {showCaption && !isFullScreen ? (
            <Caption
              caption={title}
              credit={credit}
              creditprefix={imageCreditPrefix}
              miscStyles={{ paddingInlineStart: 0, marginTop: '1rem', }}
              typeStyles={{ step: -2, }}
              creditTypeStyles={{ step: -2, }}
            />
          ) : null}
        </figure>
      )}
    />
  );
}

ArticleBodyImage.propTypes = articleImagePropTypes;
ArticleBodyImage.defaultProps = articleImageDefaultProps;

export default ArticleBodyImage;
