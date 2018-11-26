/* eslint-disable */

/*
  (!) *** Important: read this before modifying this file *** (!)
  ---------------------------------------------------------------
  The code in the following function will be included inside a script tag
  without any interpolation, so check your modifications
  are supported on less-up-to-date browsers.

  This means no deconstructions, arrow-functions, string-templates etc...
  Also do not define any functions/variables outside this function as they
  will be unaccessible to it.
*/
function fontLoaderScript(params) {
  // based on https://github.com/zachleat/web-font-loading-recipes/blob/master/critical-foft-preload-fallback-optional.html
  "use strict"

  function placeClassOnDocument(className) {
    document.documentElement.className += (' ' + className);
  }

  function loadAllVariations(font) {
    function loadFontVariation(variation) {
      const variationString = [
        variation.fontWeight || '',
        variation.fontStyle || '',
        '1em',
        font.name,
        ]
        .filter(function isNotBlank(str) { return !!str; })
        .join(' ');
      return document.fonts.load(variationString);
    }

    return Promise.all(font.variations.map(loadFontVariation));
  }

  function finalizeFontLoad(font, fullFontClass, storageKey) {
    loadAllVariations(font)
      .then(function onAllVariationsLoaded() {
        placeClassOnDocument(fullFontClass);
        localStorage.setItem(storageKey, true);
      });
  }

  try {
    // console.log('[fontsLoaderScript] data is: %o', params);
    if (typeof window === 'undefined') {
      return;
    }
    const criticalFont = params.criticalFont;
    const classNames = params.classNames;
    const storageKey = params.storageKey;
    const subsetFontName = params.subsetFontName;
    if (localStorage.getItem(storageKey)) {
      placeClassOnDocument(classNames.full); // enable font fully
      return;
    }
    else if( 'fonts' in document ) {
      if (criticalFont.subset) {
        document.fonts.load('1em ' + subsetFontName)
          .then(function onSubsetLoaded() {
            placeClassOnDocument(classNames.subset) // enable subset
            finalizeFontLoad(criticalFont, classNames.full, storageKey);
          });
      } else {
        finalizeFontLoad(criticalFont, classNames.full);
      }
    }
  }
  catch (err) {
    console.error('[fontsLoaderScript] Error occurred during font loading script\n', err);
  }
}

export default fontLoaderScript;
