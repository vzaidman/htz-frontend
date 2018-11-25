/* eslint-disable */

function fontsLoaderScript(fontRules) {

  /* Declarations */

  function enableFont(idx, classPostfix) {
    console.log('[fontsLoaderScript] enabling font ', idx + 1, classPostfix || '');
    const className = 'fontsLoaded' + (idx + 1) + (classPostfix || '');
    document.documentElement.className += (' ' + className);
  }

  function isCached(key) {
    try {
      if (JSON.parse(localStorage.getItem(key))) {
        return true;
      }
    }
    catch (err) {
      console.warn('[fontsLoaderScript] unable to access localStorage\nDetails:', err);
    }
    return false;
  }

  function cache(key) {
    try {
      console.log('[fontsLoaderScript] caching key:', key);
      localStorage.setItem(key, true);
    }
    catch (err) {
      console.warn('[fontsLoaderScript] unable to access localStorage\nDetails:', err);
    }
  }

  function loadVariation(fontFamily) {
    return function loadVariationInner(variation) {
      console.log('[fontsLoaderScript] loading variation %o of %o', variation, fontFamily);
      const fontOptions = variation[1];
      const weight = (fontOptions && fontOptions.fontWeight) || '';
      const style = (fontOptions && fontOptions.fontStyle) || '';
      const loadString = [weight, style, '1em', fontFamily]
        .filter(function isNotBlank(elem) { return !!elem; })
        .join(' ');
      return document.fonts.load(loadString);
    }
  }

  function loadAllVariations(font) {
    console.log('[fontsLoaderScript] loadAllVariations font:', font);
    return Promise.all(font.variations.map(loadVariation(font.name)));
  }

  function finalizeFontLoad(font, idx, key) {
    console.log('[fontsLoaderScript] finalizing font load', font.name);
    loadAllVariations(font)
      .then(function onVariationsLoaded() {
        enableFont(idx);
        cache(key);
      });
  }

  /* Script */

  try {
    console.log('[fontsLoaderScript] data is: %o', fontRules);

    if (typeof window === 'undefined' || document === 'undefined') {
      return undefined;
    }
    if ((fontRules instanceof Array) === false) {
      console.warn('[fontsLoaderScript] fontRules should be an array');
      return undefined;
    }
    
    fontRules.forEach(function processFont(font, idx) {
      const key = `fontLoaded-${font.name.replace(/\s+/, '-')}`; // replace whitespaces with '-'
      if (isCached(key)) {
        console.log('[fontsLoaderScript] font family %o is already cached', font.name);
        enableFont(idx);
      }
      else if ('fonts' in document) {
        if (font.subset) {
          console.log('[fontsLoaderScript] loading subset of ', font.name);
          document.fonts.load('1em ' + font.name + 'Subset')
            .then(function onSubsetLoaded() {
              enableFont(idx, 'Subset');
              finalizeFontLoad(font, idx, key);
            });
        }
        else {
          finalizeFontLoad(font, idx, key);
        }
      }
    });
  }
  catch (err) {
    console.error('[fontsLoaderScript] Error occurred during font loading script\n', err);
  }
}

export default fontsLoaderScript;
