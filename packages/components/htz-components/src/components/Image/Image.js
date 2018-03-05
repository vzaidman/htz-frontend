import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Observer from 'react-intersection-observer';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { buildURLs, buildUrl, } from '../../utils/buildImgURLs';
import ImgSource from './elements/ImgSource';

const ImgWrapperStyle = ({ bgc, height, theme, width, miscStyles, }) => ({
  height: '0',
  // prettier-ignore
  paddingBottom: `${(height / width) * 100}%`,
  position: 'relative',
  width: '100%',
  extend: [
    parseComponentProp(
      'backgroundColor',
      bgc || [ 'image', 'bgc', ],
      theme.mq,
      setColor,
      theme.color
    ),
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

function setColor(prop, value, converter) {
  const valueArray = Array.isArray(value) ? value : [ value, ];
  return { [prop]: converter(...valueArray), };
}

const StyledImgWrapper = createComponent(ImgWrapperStyle);

/** The shape of an `<Image />` component's transforms options */
const ImgTransfromOptions = PropTypes.shape({
  /** The image's aspect ratio to use as base crop, default 'full' */
  aspect: PropTypes.string,
  /** An array of strings with misc flags to apply to the image url */
  flags: PropTypes.arrayOf(PropTypes.string),
  /**
   * The height, in pixels, of the image the generated url points to.
   * This describes the number of pixels in the file (not rendered size!).
   */
  height: PropTypes.string,
  /** Generate a progressive jpeg. default false */
  isProgressive: PropTypes.bool,
  /** The image quality, default 'auto' */
  quality: PropTypes.string,
  /** An array of strings with misc transforms to apply to the image url */
  transforms: PropTypes.arrayOf(PropTypes.string),
  /**
   * The width, in pixels, of the image the generated url points to.
   * This describes the number of pixels in the file (not rendered size!).
   */
  width: PropTypes.string.isRequired,
});

const imageOptionsType = PropTypes.shape({
  /**
   * A string describing the sizes (optional) and the rendered
   * width of the image (not the file!).
   */
  sizes: PropTypes.string,
  /**
   * transforms for the url used as the `src` and `srcset` attributes.
   * When `transforms` is an array, the first item will be used for
   * the `src` attribute, and then all items will be used in
   * constructing the `srcset` attribute.
   */
  transforms: PropTypes.oneOfType([
    ImgTransfromOptions,
    PropTypes.arrayOf(ImgTransfromOptions),
  ]).isRequired,
});

class Image extends React.Component {
  static propTypes = {
    /**
     * An object of attributes to set on the DOM element.
     * Passed to the underlying react element
     */
    attrs: attrsPropType,
    /**
     * A background color for the wrapper around the image, which will be
     * visible until the image is loaded. Defaults to the color set in the
     * theme.
     */
    bgcolor: PropTypes.string,
    /** Image data from polopoly */
    data: PropTypes.shape({
      /** Image alt from polopoly */
      alt: PropTypes.string.isRequired,
      /** Holds the image aspects object */
      aspects: PropTypes.object,
      /**
       * When the array contains multiple elements, each should be used
       * independently in creating sources for the picture element.
       */
      imgArray: PropTypes.arrayOf(
        PropTypes.shape({
          /** Image name from polopoly by the format 'image/imageName.imgType' */
          imgName: PropTypes.string.isRequired,
          /** Image version from polopoly */
          version: PropTypes.string,
        })
      ),
      /** Image id from polopoly */
      contentId: PropTypes.string.isRequired,
      /** The photographer credit. added to title in the title attribute */
      credit: PropTypes.string.isRequired,
      /**
       * When present, the image should be rendered inside
       * a `<picture>` element to serve webp image type
       */
      isAnimatedGif: PropTypes.bool,
    }).isRequired,
    /** An image options for user transforms and sizes */
    imgOptions: imageOptionsType.isRequired,
    /**
     * Determines if the image will be surrounded by
     * a wrapper to prevent content jumping
     */
    hasWrapper: PropTypes.bool,
    /** Passing attributes role="presentation" and aria-hidden="true" if exists  */
    isPresentational: PropTypes.bool,
    /**
     * Determine if the component should be lazyloaded. Defaults to `false`.
     * If lazyloaded, indicates how many pixels before entering the screen
     * should the image be loaded.
     * For example, when `{lazyLoad: true}`, the image will be
     * lazyloaded as soon as it enters the screen. When `{lazyLoad: '400px'}`
     * the image will be lazyloaded 400px before entering the screen.
     * Strings should be in css length units.
     */
    lazyLoad: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string, ]),
    /**
     * A special property holding miscellaneous CSS values that
     * trumps all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops).
     * passes down only to the image wrapper.
     */
    miscStyles: stylesPropType,
  };
  static defaultProps = {
    attrs: null,
    bgcolor: null,
    className: null,
    hasWrapper: true,
    isPresentational: false,
    lazyLoad: false,
    miscStyles: null,
    sizes: null,
    tagName: 'img',
  };

  componentWillMount() {
    const { imgArray, } = this.props.data;
    const { transforms, } = this.props.imgOptions;

    // Check if transforms matches image aspects pattern
    const aspectMatchResult = Array.isArray(transforms)
      ? transforms.every(
        (element, index, arr) =>
          (index === 0 ? true : element.aspect === arr[index - 1].aspect)
      )
      : true;

    // Does this look like it should be a `<Picture />` component?
    const isPicture = !aspectMatchResult || imgArray.length > 1;

    if (isPicture) {
      console.error(
        `The data structure of the "${
          this.props.data.contentId
        }" image is of a picture element, not an image.
Please use the "<Picture />" component`
      );
    }
  }

  render() {
    const {
      attrs,
      bgcolor,
      data: { alt, credit, isAnimatedGif, },
      imgOptions: { sizes, },
      isPresentational,
      lazyLoad,
      miscStyles,
      hasWrapper,
    } = this.props;

    if (
      isPresentational &&
      (attrs && (!!attrs.role || !!attrs['aria-hidden']))
    ) {
      console.warn(
        'When "isPresentational" prop value is true, "role" and "aria-hidden" are set automatically'
      );
    }
    const { height, width, } = getDimensions(this.props);
    const sources = getSources(this.props);
    const src = sources[0];
    const srcSet = sources[1];
    const webpSources = isAnimatedGif
      ? getSources(this.props, true)
      : undefined;

    const Sources = isAnimatedGif ? (
      <picture>
        <ImgSource
          {...(sizes ? { sizes, } : {})}
          tagName="source"
          type="image/webp"
          src={webpSources[0]}
          {...(srcSet ? { srcSet: webpSources[1], } : {})}
        />

        <ImgSource
          alt={alt}
          src={src}
          hasWrapper={hasWrapper}
          {...(srcSet ? { srcSet, } : {})}
          {...(sizes ? { sizes, } : {})}
          title={credit}
          attrs={
            isPresentational
              ? {
                ...attrs,
                role: 'presentation',
                'aria-hidden': true,
              }
              : attrs
          }
        />
      </picture>
    ) : (
      <ImgSource
        alt={alt}
        hasWrapper={hasWrapper}
        title={credit}
        src={src}
        {...(srcSet ? { srcSet, } : {})}
        {...(sizes ? { sizes, } : {})}
        attrs={
          isPresentational
            ? {
              ...attrs,
              role: 'presentation',
              'aria-hidden': true,
            }
            : attrs
        }
      />
    );

    if (!lazyLoad) {
      return hasWrapper
        ? (
          <StyledImgWrapper
            width={width}
            height={height}
            bgc={bgcolor}
            miscStyles={miscStyles}
          >
            {Sources}
          </StyledImgWrapper>
        )
        : Sources;
    }

    return hasWrapper ?
      (
        <StyledImgWrapper
          width={width}
          height={height}
          bgc={bgcolor}
          miscStyles={miscStyles}
        >
          <Observer triggerOnce rootMargin={lazyLoad}>
            {inView => (inView ? Sources : null)}
          </Observer>
        </StyledImgWrapper>
      ) : (
        <Observer triggerOnce rootMargin={lazyLoad}>
          {inView => (inView ? Sources : null)}
        </Observer>
      );
  }
}

export default Image;

// //////////////////////////////////////////////////////////////////////
//                          Helper Functions                          //
// //////////////////////////////////////////////////////////////////////
const aspectRatios = {
  regular: { height: 3, width: 4, },
  headline: { height: 9, width: 16, },
  landscape: { height: 9, width: 21, },
  square: { height: 1, width: 1, },
  vertical: { height: 20, width: 17, },
  belgrade: { height: 1, width: 3.18, },
};

function getDimensions({ data: { aspects, }, imgOptions: { transforms, }, }) {
  const { aspect, } = Array.isArray(transforms) ? transforms[0] : transforms;
  const { height, width, } = aspects[aspect] || aspectRatios[aspect];

  return { height, width, };
}

function getSources(
  {
    data: { aspects, contentId, imgArray, isAnimatedGif, },
    imgOptions: { transforms, },
  },
  isWebP = false
) {
  const transformsArray = Array.isArray(transforms) ? transforms : [ transforms, ];
  const hasSrcset = transformsArray.length > 1;
  const imageNameFromData = imgArray[0].imgName.split('/')[1];

  const imgName =
    isAnimatedGif && isWebP
      ? `${imageNameFromData.split('.')[0]}.webp`
      : imageNameFromData;

  // Always use the first image in the imageArray
  const imgVersion = imgArray[0].version;
  const imgData = {
    imgName,
    version: imgVersion,
    aspects,
  };

  const src = buildUrl(contentId, imgData, transformsArray[0]);

  return hasSrcset
    ? [
      // If more than one transform is defined,
      src, // Use the first transform to build the `src` attribute
      // And all transforms to build the `srcset` attribute
      buildURLs(contentId, imgData, transformsArray),
    ]
    : [ src, ];
}
