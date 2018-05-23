import config from 'config';

const aspectRatios = {
  regular: 4 / 3,
  headline: 16 / 9,
  landscape: 2.31,
  square: 1,
  vertical: 0.85,
  belgrade: 3.18,
};

/**
 * @typedef {Object} Aspect
 *   An object describing an image's basic crop attributes for
 *   a given aspect ratio as defined in the CMS.
 * @prop {string} x
 *   The horizontal coordinate, from the left, from which to start the crop.
 * @prop {string} y
 *   The vertical coordinate, from the top, from which to start the crop.
 * @prop {string} width
 *   The number of pixels to include in the cropped image, starting from `x` to the right.
 * @prop {string} height
 *   The number of pixels to include in the cropped image, starting from `y` to the bottom.
 */

/**
 * An object containing basic data about the image,
 * as obtained from, for example, the Apollo store
 * @typedef {Object} Data
 * @prop {Object} aspects
 *   each aspect is an object has width,height,x and y keys
 * @prop {Aspect} aspects.full
 *   The image's crop information in the `landscape` aspect ratio
 * @prop {Aspect} [aspects.landscape]
 *   The image's crop information in the `landscape` aspect ratio
 * @prop {Aspect} [aspects.regular]
 *   The image's crop information in the `regular` aspect ratio
 * @prop {Aspect} [aspects.headline]
 *   The image's crop information in the `headline` aspect ratio
 * @prop {Aspect} [aspects.square]
 *   The image's crop information in the `square` aspect ratio
 * @prop {Aspect} [aspects.vertical]
 *   The image's crop information in the `vertical` aspect ratio
 * @prop {Aspect} [aspects.belgrade]
 *   The image's crop information in the `belgrade` aspect ratio
 * @prop {string} imgName
 *   the image name
 * @prop {string} version
 *   the image version if exist
 */

/**
 * @typedef {Object} Options
 * @property {string} width
 *   The width, in pixels, of the image the generated url points to.
 *   The is equivalent to the w descriptor in the srcset attribute.
 * @property {string} [height]
 *   The height of the file returned from the url. Automatically
 *   determined by the aspect when not passed.
 * @property {'full'|'landscape'|'regular'|'headline'|'square'|'vertical'|'belgrade'} [aspect=full]
 *   The image's aspect ratio
 * @property {string} [quality='auto'] -  The image quality
 * @property {boolean} [isProgressive=false] - Generate a progressive jpeg
 * @property {string[]} [transforms]
 *   An array of strings with additional transforms to apply to the image url
 * @property {string[]} [flags] - An array of additional flags to apply to the image
 */

/**
 * @typedef {boolean} ExcludeWidthDescriptor -
 *   when excludeWidthDescriptor is true the function
 *   will omit width descriptor and when false or not exist
 *   the function automatically adds the width descriptor at
 *   the end of the url string
 */

/**
 * A function that takes an image's `contentId`, data about the image and usage options.
 * Returns an array of urlStrings (for `srcSet`).
 * @param contentId
 *  the image's Polopoly contentId
 * @param {Data} data - data properties (@link Data)
 * @param {Options[]} options - An array of options properties
 *  an array of image rendering options, each eventually translated into a url-string in the returned array.
 *  Multiple objects are useful for generating values to be used in the srcSet attributes of an img or source
 * @param {ExcludeWidthDescriptor} excludeWidthDescriptor
 * @return {string[]} - an array of img urls
 * @example
 * // Single item in the options array returns an array with a single url-string
 * buildURLS(1.4444, imageData, [ { width: '100', }, ]); // returns [ <urlString>, ]
 *
 * // Multiple items in the `options` array returns
 * // an array with a url-string for each item in `options`
 * buildURLS(
 *   1.4444,
 *   imageData,
 *   [ { width: '100', }, { width: '200', quality: '.6', }, ]
 * ); // returns [ <urlString>, <urlString>, ]
 */
export function buildURLs(contentId, data, options, excludeWidthDescriptor) {
  return options.map(
    imgOption =>
      `${buildUrl(contentId, data, imgOption)}${
        !excludeWidthDescriptor ? ` ${imgOption.width}w` : ''
      }`
  );
}

/**
 * Build an image's url-string based on a contentId, data about the image and usage options.
 * @param contentId
 *  the image's Polopoly contentId
 * @param {Data} data - see properties here (@link Data)
 * @param {Options} options - see properties here (@link Options)
 *  an object of image rendering options, each eventually translated into a url-string .
 * @return  'string' , single url string based on the arguments passed to the function.
 *   @example:
 *   //single url-string
 *   buildUrl(
 *     1.4444,
 *     imageData,
 *     { width: '100', }
 *  );
 * // returns  <urlString>
 */

export function buildUrl(contentId, data, options = {}) {
  const baseUrl = config.has('imgBaseUrl') && config.get('imgBaseUrl');
  const baseHref = config.has('baseHref') && config.get('baseHref');
  const { imgName, version, aspects, } = data;
  const imageNameFromData = imgName.split('/')[1];

  // Fail early when mandatory options aren't present.
  // eslint-disable-next-line eqeqeq
  if (options.width == undefined) {
    throw new Error(
      'width is a mandatory option property for rendering image urls'
    );
  }

  if (!baseUrl) {
    throw new Error(
      'Your app\'s "imgBaseUrl" is not configured.\n' +
        'See https://github.com/Haaretz/htz-frontend/blob/master/docs/Configuration.md'
    );
  }

  if (!version && !baseHref) {
    throw new Error(
      'Your app\'s "baseHref" is not configured.\n' +
        'See https://github.com/Haaretz/htz-frontend/blob/master/docs/Configuration.md'
    );
  }

  // Augment defaults with user-defined options
  const settings = {
    aspect: 'full',
    isProgressive: false,
    quality: 'auto',
    height: computeHeight(options.width, options.aspect || 'full', aspects),
    ...options,
  };

  const transformPrefixes = {
    width: 'w_',
    height: 'h_',
    quality: 'q_',
    x: 'x_',
    y: 'y_',
  };
  const cropData = aspects[settings.aspect] || aspects.full;

  const initialTransforms = `${Object.keys(cropData).reduce(
    (allTransforms, propName) => {
      const transfromString =
        transformPrefixes[propName] + cropData[propName].toString();
      return allTransforms + (allTransforms ? ',' : '/') + transfromString;
    },
    ''
  )},c_crop,g_north_west`;

  const userTransforms = `${Object.keys(settings).reduce(
    (allTransforms, propName) => {
      const prefix = transformPrefixes[propName];
      const transfromString = prefix ? prefix + settings[propName] : '';
      return prefix
        ? allTransforms + (allTransforms ? ',' : '/') + transfromString
        : allTransforms;
    },
    ''
  )},c_fill,f_auto`;

  const { transforms, flags, } = settings;
  const baseFlags = `/fl_any_format.preserve_transparency.progressive:${
    settings.isProgressive ? 'steep' : 'none'
  }`;
  const miscTransforms =
    // eslint-disable-next-line eqeqeq
    transforms != undefined ? `/${transforms.join('/')}` : '';
  // eslint-disable-next-line eqeqeq
  const miscFlags = flags != undefined ? `/${flags.join('.')}` : '';

  // Url suffix based on whether this is an uploaded or fetched image
  const urlSuffix = version
    ? `/v${version}/${contentId}.${imageNameFromData}`
    : `/${baseHref}/polopoly_fs/${contentId}!/${imageNameFromData}`;
  // construct url string from params
  const url =
    baseUrl +
    (version ? '/upload' : '/fetch') +
    initialTransforms +
    userTransforms +
    baseFlags +
    miscTransforms +
    miscFlags +
    urlSuffix;
  return url;
}

function computeHeight(width, aspect, aspects) {
  const aspectsHasAspect = !!aspects[aspect];
  const scaleRatio = (aspectsHasAspect ? aspects[aspect].width : width) / width;
  return Math.round(
    aspectsHasAspect
      ? aspects[aspect].height / scaleRatio
      : width / aspectRatios[aspect]
  );
}
