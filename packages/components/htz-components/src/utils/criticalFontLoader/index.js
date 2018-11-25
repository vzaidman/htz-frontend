import createFontPreload from './createFontPreload';
import createFontScript from './createFontScript';
import fontLoaderScript from './fontLoaderScript';
import createFontFaceData from './createFontFaceData';
import createCssRule from './createCssRule';
import createFontFaceString from './createFontFaceString';
import InlineStyle from './InlineStyle';

const classNames = Object.freeze({
  subset: 'subset-font-loaded',
  full: 'full-font-loaded',
});

const fontLoader = (criticalFont, fallbackFont) => {
  const fullFontName = criticalFont.name;
  const subsetFontName = criticalFont.name.replace(/([\w\s]+)/, '$1 Subset'); // fix for font-names wrapped with <">
  const fontFaceData = createFontFaceData(fullFontName, subsetFontName, criticalFont.subset, criticalFont.variations);
  console.log('fontFaceData:', JSON.stringify(fontFaceData));
  const cssRules = {
    subset: createCssRule(classNames.subset, criticalFont.applyToSelector, subsetFontName, fallbackFont),
    full: createCssRule(classNames.full, criticalFont.applyToSelector, fullFontName, fallbackFont),
  };
  const cssString = [
    ...fontFaceData.map(createFontFaceString),
    cssRules.subset,
    cssRules.full,
  ].join('\n');

  return Object.freeze({
    preload: createFontPreload(criticalFont.subset),
    script: createFontScript(fontLoaderScript, {
      criticalFont,
      classNames,
      storageKey: `isFontLoaded[${criticalFont.name}]`,
      subsetFontName,
    }),
    style: InlineStyle({ __html: cssString, }),
  });
};

export default fontLoader;
