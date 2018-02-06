import PropTypes from 'prop-types';

/** The shape of an `<Image />` or `<Picture/>` component's transforms options */
const imageTransformProptype = PropTypes.shape({
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

export const imageOptionsType = PropTypes.shape({
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
    imageTransformProptype,
    PropTypes.arrayOf(imageTransformProptype),
  ]).isRequired,
});
