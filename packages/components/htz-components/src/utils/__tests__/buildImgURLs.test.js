import {buildURLs, buildUrl,} from '../buildImgURLs';

const data = [
  {
    alt: 'string',
    description: 'string',
    credit: 'string',
    aspects: {
      belgrade: {width: '100', height: '100', x: '10', y: '10',},
      landscape: {width: '500', height: '200', x: '20', y: '20',},
      headline: {width: '300', height: '150', x: '20', y: '0',},
      regular: {width: '200', height: '100', x: '5', y: '0',},
      square: {width: '200', height: '200', x: '0', y: '0',},
      vertical: {width: '300', height: '100', x: '0', y: '10',},
      full: {width: '300', height: '300', x: '10', y: '0',},
    },
    isAnimated: false,
    imgName: 'sample.jpg',
    version: '0001524022',
    imageType: 'image',
  },
  {
    alt: 'string',
    description: 'string',
    credit: 'string',
    aspects: {
      belgrade: {width: '100', height: '100', x: '10', y: '10',},
      landscape: {width: '500', height: '200', x: '20', y: '20',},
      headline: {width: '300', height: '150', x: '20', y: '0',},
      regular: {width: '200', height: '100', x: '5', y: '0',},
      square: {width: '200', height: '200', x: '0', y: '0',},
      vertical: {width: '300', height: '100', x: '0', y: '10',},
      full: {width: '300', height: '300', x: '10', y: '0',},
    },
    isAnimated: false,
    imgName: 'mobileSample.jpg',
    imageType: 'image',
  },
];

// Newer images are uploaded to Cloudinary and therefore have a 'version' key, this is the default.
const uploadedImageData = data[0];

// Older images have not been uploaded to Cloudinary, so needs to be
// actively fetched by them from our servers, meaning a different URL needs to be built.
// Such images do not have a `version` key.
const fetchedImageData = data[1];

describe('buildUrl()', () => {
  it('process "width" correctly', () => {
    const result = buildUrl('1.44444', data[0], {width: '200',});
    expect(result).toMatch(/image\/upload\/.+w_200/);
  });
  describe('default options, no options from user (however user must always specify width )', () => {
    it('sets default aspect of "full" and quality to "auto" and progressive to none, when no aspect/quality/progressive specified in options', () => {
      const expected =
        'https://images.haarets.co.il/image/upload/w_300,h_300,x_10,y_0,c_crop,g_north_west/q_auto,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v0001524022/1.44444.sample.jpg';
      const result = buildUrl('1.44444', data[0], {width: '200',});
      expect(result).toEqual(expected);
    });
  });
  describe('user defined options', () => {
    it('process "quality" correctly', () => {
      const expected =
        'https://images.haarets.co.il/image/upload/w_300,h_300,x_10,y_0,c_crop,g_north_west/q_auto:best,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v0001524022/1.44444.sample.jpg';
      const result = buildUrl('1.44444', data[0], {
        width: '200',
        quality: 'auto:best',
      });
      expect(result).toEqual(expected);
    });

    it('process "transforms" correctly', () => {
      const expected =
        'https://images.haarets.co.il/image/upload/w_300,h_300,x_10,y_0,c_crop,g_north_west/q_auto,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/c_fit/r_100/v0001524022/1.44444.sample.jpg';
      const result = buildUrl('1.44444', data[0], {
        width: '200',
        transforms: ['c_fit', 'r_100',],
      });
      expect(result).toEqual(expected);
    });

    it('process "flags" correctly', () => {
      const expected =
        'https://images.haarets.co.il/image/upload/w_300,h_300,x_10,y_0,c_crop,g_north_west/q_auto,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/apng.immutable_cache/v0001524022/1.44444.sample.jpg';
      const result = buildUrl('1.44444', data[0], {
        width: '200',
        flags: ['apng', 'immutable_cache',],
      });
      expect(result).toEqual(expected);
    });

    it('process "isProgresive" boolean correctly', () => {
      const expected =
        'https://images.haarets.co.il/image/upload/w_300,h_300,x_10,y_0,c_crop,g_north_west/q_auto,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:steep/v0001524022/1.44444.sample.jpg';
      const result = buildUrl('1.44444', data[0], {
        width: '200',
        isProgresive: true,
      });
      expect(result).toEqual(expected);
    });
  });

  // Images that were uploaded to Cloudinary should have
  // the default URL scheme
  it('builds an "upload" url correctly', () => {
    const result = buildUrl('1.1212', uploadedImageData, {width: '100',});
    expect(result).toMatch(/image\/upload\//);
  });

  // Older images that were not originally uploaded to
  // Cloudinary have different url structure
  it('builds a "fetch" url correctly', () => {
    const result = buildUrl('1.1212', fetchedImageData, {width: '100',});
    expect(result).toMatch(/image\/fetch\/.+\/polopoly_fs\//);
  });

  describe('Error messages', () => {
    it('throw an error when "width" is not defined in "options"', () => {
      const optionNoWidth = {
        transforms: ['c_fit',],
        isProgresive: true,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      };
      expect(() => buildUrl('1.44444', data[0], optionNoWidth)).toThrow(
        'width is a mandatory option property for rendering image urls'
      );
    });
  });
});

describe('buildURLs()', () => {
  it('return multiple url strings for multiple options correctly', () => {
    const multiOptions = [
      {
        width: '200',
        quality: 'auto:best',
        transforms: ['c_fit', 'r_100',],
        isProgresive: false,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      },
      {
        width: '100',
        transforms: ['c_fit',],
        isProgresive: true,
        aspect: 'landscape',
        flags: ['apng', 'immutable_cache',],
      },
    ];
    const expected = [
      'https://images.haarets.co.il/image/upload/w_300,h_150,x_20,y_0,c_crop,g_north_west/q_auto:best,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/c_fit/r_100/apng.immutable_cache/v0001524022/1.44444.sample.jpg 200w',
      'https://images.haarets.co.il/image/upload/w_500,h_200,x_20,y_20,c_crop,g_north_west/q_auto,w_100,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:steep/c_fit/apng.immutable_cache/v0001524022/1.44444.sample.jpg 100w',
    ];
    const result = buildURLs('1.44444', data[0], multiOptions);
    expect(result).toEqual(expected);
  });
  it('return an array of a single item without width descriptor when excludeWidthDescriptor is true ', () => {
    const oneOption = [
      {
        width: '200',
        quality: 'auto:best',
        transforms: ['c_fit', 'r_100',],
        isProgresive: false,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      },
    ];
    const expected =[
      'https://images.haarets.co.il/image/upload/w_300,h_150,x_20,y_0,c_crop,g_north_west/q_auto:best,w_200,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/c_fit/r_100/apng.immutable_cache/v0001524022/1.44444.sample.jpg'
    ];
    const result = buildURLs('1.44444', data[0], oneOption, true);
    expect(result).toEqual(expected);
  });
  it('return an array of a single item when there is only one option', () => {
    const oneOption = [
      {
        width: '200',
        quality: 'auto:best',
        transforms: ['c_fit', 'r_100',],
        isProgresive: false,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      },
    ];
    const buildURLsResult = buildURLs('1.1212', data[0], oneOption);
    expect(buildURLsResult.length).toBe(1);
  });
  it('return an array of urlStrings the length of the "options" array (2 items)', () => {
    const twoOptions = [
      {
        width: '200',
        quality: 'auto:best',
        transforms: ['c_fit', 'r_100',],
        isProgresive: false,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      },
      {
        width: '100',
        transforms: ['c_fit',],
        isProgresive: true,
        aspect: 'landscape',
        flags: ['apng', 'immutable_cache',],
      },
    ];
    const buildURLsResult = buildURLs('1.1212', data[0], twoOptions);
    expect(buildURLsResult.length).toBe(2);
  });
  it('return an array of urlStrings the length of the "options" array (3 items)', () => {
    const threeOptions = [
      {
        width: '200',
        quality: 'auto:best',
        transforms: ['c_fit', 'r_100',],
        isProgresive: false,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      },
      {
        width: '100',
        transforms: ['c_fit',],
        isProgresive: true,
        aspect: 'landscape',
        flags: ['apng', 'immutable_cache',],
      },
      {
        width: '200',
        quality: 'auto:best',
        transforms: ['c_fit', 'r_100',],
        isProgresive: false,
        aspect: 'headline',
        flags: ['apng', 'immutable_cache',],
      },
    ];
    const buildURLsResult = buildURLs('1.1212', data[0], threeOptions);
    expect(buildURLsResult.length).toBe(3);
  });
});
