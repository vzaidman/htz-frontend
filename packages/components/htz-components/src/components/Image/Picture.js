import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaTheme, withTheme, } from 'react-fela';
import Observer from 'react-intersection-observer';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { imageOptionsType, } from '../../propTypes/imageOptionsType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { buildUrl, buildURLs, } from '../../utils/buildImgURLs';
import ImgSource from './elements/ImgSource';
import { aspectRatios, } from './Image';
import DefaultImage from '../DefaultImage/DefaultImage';
import setColor from '../../utils/setColor';

const PictureWrapperStyle = ({
  sources,
  theme,
  defaultImg,
  bgc,
  miscStyles,
}) => ({
  height: '0',
  width: '100%',
  position: 'relative',
  paddingBottom: getDimensions(defaultImg),
  extend: [
    ...sources.map(({ from, until, misc, type, ...restOfImgData }) => theme.mq(
      { from, until, misc, type, },
      { paddingBottom: getDimensions(restOfImgData), }
    )
    ),
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

function getDimensions({ data, sourceOptions: { transforms, }, }) {
  const { aspect, } = Array.isArray(transforms) ? transforms[0] : transforms;
  const { width, height, } = data.imgArray[0].aspects[aspect] || aspectRatios[aspect];
  // prettier-ignore
  return `${(height / width) * 100}%`;
}

const StyledPictureWrapper = createComponent(PictureWrapperStyle);

Picture.propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * The image Background color determined by the user,
   * if no bgc prop passed the default background color will be automatically set from theme color
   */
  bgcolor: PropTypes.string,
  /** The default img tag data and sourceOption to create effective fallback strategy. */
  defaultImg: PropTypes.shape({
    sourceOptions: imageOptionsType,
    /** Image data object from polopoly */
    data: PropTypes.shape({
      /** Image alt from polopoly */
      alt: PropTypes.string,
      /** Each image name, type and version will build a "source" tag */
      imgArray: PropTypes.arrayOf(
        PropTypes.shape({
          /** Image name from polopoly by the format 'image/imageName.imgType' */
          imgName: PropTypes.string.isRequired,
          /** Image version from polopoly */
          version: PropTypes.string,
          /** Holds the image aspects object */
          aspects: PropTypes.object,
        })
      ),
      /** Image id from polopoly */
      contentId: PropTypes.string.isRequired,
      /** The photographer credit. added to title in the title attribute */
      credit: PropTypes.string,
      /**
       * When present, the image should be rendered inside a
       * <picture> element to serve webp image type
       */
      isAnimatedGif: PropTypes.bool,
    }).isRequired,
  }),
  /**
   * Determines if the image will be surrounded by
   * a wrapper to prevent content jumping
   */
  hasWrapper: PropTypes.bool,
  /** Passing attributes role="presentation" and aria-hidden="true" if exists  */
  isPresentational: PropTypes.bool,
  /**
   * Determine if the component is lazyload rendered, false is the default
   * If lazyloaded, how many pixels before entering the screen should the image be loaded.
   * For example, when `{lazyLoad: true}`, the image will be
   * lazyloaded at it enters the screen. When `{lazyLoad: '400px'}`
   * the image will be lazyloaded 400px before entering the screen.
   */
  lazyLoad: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string, ]),
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops).
   * passes down only to the picture wrapper.
   */
  miscStyles: stylesPropType,
  /** Sources are required to create each of source tag attributes */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Pass this to create custom source tag Media attribute.
       * Accepts 's','m',l' and 'xl' to define each breakpoint min-width, can be undefined
       */
      from: PropTypes.string,
      /**
       * Pass this to create custom source tag Media attribute.
       * Accepts 's','m',l' and 'xl' to define each breakpoint max-width, can be undefined
       */
      until: PropTypes.string,
      /**
       * Miscellaneous media feature queries. Either a named breakpoint,
       * or a feature string, e.g., (misc: 'landscape')
       */
      misc: PropTypes.string,
      /** A media type, e.g., only screen , print , etc. */
      type: PropTypes.string,
      /** The Image file type, e.g, `mimeType: 'image/webp'` */
      mimeType: PropTypes.string,
      /** Transforms and sizes for each source tag */
      sourceOptions: imageOptionsType,
      /** Image data object from polopoly */
      data: PropTypes.shape({
        /** Image alt from polopoly */
        alt: PropTypes.string,
        /** Each image name, type and version will build a "source" tag */
        imgArray: PropTypes.arrayOf(
          PropTypes.shape({
            /** Image name from polopoly by the format 'image/imageName.imgType' */
            imgName: PropTypes.string.isRequired,
            /** Image version from polopoly */
            version: PropTypes.string,
            /** Holds the image aspects object */
            aspects: PropTypes.object,
          })
        ),
        /** Image id from polopoly */
        contentId: PropTypes.string.isRequired,
        /** The photographer credit. added to title in the title attribute */
        credit: PropTypes.string,
        /**
         * When present, the image should be rendered inside
         * a <picture> element to serve webp image type
         */
        isAnimatedGif: PropTypes.bool,
      }).isRequired,
    })
  ).isRequired,
};
Picture.defaultProps = {
  attrs: null,
  bgcolor: null,
  defaultImg: null,
  lazyLoad: false,
  miscStyles: null,
  hasWrapper: true,
  isPresentational: false,
};

function Picture(props) {
  const {
    attrs,
    bgcolor,
    defaultImg,
    hasWrapper,
    isPresentational,
    lazyLoad,
    miscStyles,
    sources,
  } = props;

  if (!defaultImg.data) {
    const defaultImgTransforms = defaultImg.sourceOptions.transforms;
    // sourceOptions.transforms can be either an array or an object,
    // we need the aspect / width and height and they should be the same
    //  for every transform so we just take the first one
    const defaultImageTransform = Array.isArray(defaultImgTransforms)
      ? defaultImgTransforms[0]
      : defaultImgTransforms;

    // building the data to match data of sources
    const transformForDefaultImage = {
      sourceOptions: {
        transforms: {
          aspect: defaultImageTransform.aspect,
          width: defaultImageTransform.width,
          height: defaultImageTransform.height,
        },
      },
    };
    const transforms = [ transformForDefaultImage, ...sources, ].map(
      ({ from, until, sourceOptions, }) => {
        const sourceTransform = Array.isArray(sourceOptions.transforms)
          ? sourceOptions.transforms[0]
          : sourceOptions.transforms;

        const value = {
          aspect: sourceTransform.aspect,
          width: sourceTransform.width,
          height: sourceTransform.height,
        };
        return {
          ...(from ? { from, } : {}),
          ...(until ? { until, } : {}),
          // since value is an object and we dont always get a from or until
          // in order for parseComponentProp in DefaultImage
          //  to work correctly with the value key we always pass media type: all
          type: 'all',
          value,
        };
      }
    );

    return <DefaultImage transforms={transforms} />;
  }

  const {
    data: { accessibility, alt, title, credit, },
    sourceOptions,
  } = defaultImg;
  const [ imgSrc, ...imgSrcSet ] = getImgSources(props);
  const defaultSizes = sourceOptions.sizes;
  const media = getMedia(props);

  const Element = (
    <FelaTheme
      render={theme => (
        <picture>
          {sources.map((img, index) => (img.data.isAnimatedGif ? (
          // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              <ImgSource
                {...(media[index] ? { media: media[index], } : [])}
                tagName="source"
                type="image/webp"
                srcSet={getSources(props, index, true)}
                {...(img.sourceOptions.sizes
                  ? { sizes: img.sourceOptions.sizes, }
                  : {})}
              />
              <ImgSource
                {...(media[index] ? { media: media[index], } : [])}
                tagName="source"
                srcSet={getSources(props, index, false)}
                {...(img.sourceOptions.sizes
                  ? { sizes: img.sourceOptions.sizes, }
                  : {})}
              />
            </Fragment>
          ) : (
            <ImgSource
                // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...(media[index] ? { media: media[index], } : [])}
              tagName="source"
              {...(img.mimeType ? { type: img.mimeType, } : {})}
              srcSet={getSources(props, index, false)}
              {...(img.sourceOptions.sizes
                ? { sizes: img.sourceOptions.sizes, }
                : {})}
            />
          ))
          )}
          <ImgSource
            alt={alt || accessibility}
            src={imgSrc}
            hasWrapper={hasWrapper}
            {...(imgSrcSet ? { srcSet: imgSrcSet, } : {})}
            {...(defaultSizes ? { sizes: defaultSizes, } : {})}
            title={`${title || ''}${title && credit ? ', ' : ''}${
              credit
                ? `${theme.creditPrefixI18n.imageCreditPrefix}: ${credit}`
                : ''
            }`}
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
      )}
    />
  );
  if (lazyLoad) {
    return hasWrapper ? (
      <StyledPictureWrapper
        miscStyles={miscStyles}
        sources={sources}
        defaultImg={defaultImg}
        bgc={bgcolor}
      >
        <Observer
          triggerOnce
          rootMargin="500px"
        >
          {inView => (inView ? Element : null)}
        </Observer>
      </StyledPictureWrapper>
    ) : (
      <Observer
        triggerOnce
        rootMargin="500px"
      >
        {inView => (inView ? Element : null)}
      </Observer>
    );
  }
  return hasWrapper ? (
    <StyledPictureWrapper
      miscStyles={miscStyles}
      sources={sources}
      defaultImg={defaultImg}
      bgc={bgcolor}
    >
      {Element}
    </StyledPictureWrapper>
  ) : (
    Element
  );
}

export default withTheme(Picture);

// //////////////////////////////////////////////////////////////////////
//                          Helper Functions                          //
// //////////////////////////////////////////////////////////////////////

function getSources({ sources, }, imgPosition = 0, isAnimatedGif) {
  const { data, sourceOptions, } = sources[imgPosition];
  const { contentId, imgArray, isExternal, } = data;
  const imgCore = imgArray[0];
  const { transforms, } = sourceOptions;
  const transformsArray = Array.isArray(transforms) ? transforms : [ transforms, ];

  const imageNameFromData = imgCore.imgName;
  const imgVersion = imgCore.version;
  const imgName = isAnimatedGif
    ? `${imageNameFromData.split('.')[0]}.webp`
    : imageNameFromData;

  const imgData = { imgName, version: imgVersion, aspects: imgCore.aspects, };

  return !isExternal ? buildURLs(contentId, imgData, transformsArray) : [ imgData.imgName, ];
}

function getImgSources({
  defaultImg: {
    data: { contentId, imgArray, isExternal, },
    sourceOptions: { transforms, },
  },
}) {
  const { imgName, version, aspects, } = imgArray[0];
  const transformsArray = Array.isArray(transforms) ? transforms : [ transforms, ];

  // const imageNameFromData = imgName.split('/')[1];
  const imgData = {
    imgName,
    version,
    aspects,
  };

  const src = !isExternal ? buildUrl(contentId, imgData, transformsArray[0]) : imgData.imgName;
  const srcSet = !isExternal ? buildURLs(contentId, imgData, transformsArray, false) : [];

  return [ src, ...srcSet, ];
}

function getMedia({ sources, theme, }) {
  const finalMedia = sources.map((img, index) => {
    const { from, until, misc, type, } = img;
    const imgHasMedia = [ from, until, misc, type, ]
      // eslint-disable-next-line eqeqeq
      .some(item => item != undefined);
    return imgHasMedia
      ? theme.getMqString({ from, until, misc, type, }, true, true)
      : undefined;
  });
  return finalMedia;
}
