import camelCase from 'lodash/camelCase';

export function buildFontLoadingScript(fonts) {
  const fontFamilies = Object.keys(fonts);

  return `(function loadFonts() {
    if (typeof window === 'undefined') {
      return undefined;
    }
    ${fontFamilies
    .map((fontFamily, i) => {
      const keyName = `fontLoaded${camelCase(fontFamily)}`;
      const font = fonts[fontFamily];

      let string = `if (localStorage && localStorage.${keyName}) {
        document.documentElement.className += ' fontsLoaded${i + 1}';
      }
      else if ('fonts' in document) {`;
      if (fonts[fontFamily].subset) {
        string += `document.fonts.load('1em ${fontFamily}Subset')
          .then(function() {
            document.documentElement.className += ' fontsLoaded${i + 1}Subset';
            ${loadPromiseAddClassAndLocalStorageHandler(
    font,
    fontFamily,
    i,
    keyName
  )}
        });}`;
      }
      else {
        string += `${loadPromiseAddClassAndLocalStorageHandler(
          font,
          fontFamily,
          i,
          keyName
        )}`;
      }
      return string;
    })
    .join(' ')}
    else if (localStorage) {
    // use fallback
    var ref = document.getElementsByTagName( 'script' )[ 0 ];
    var script = document.createElement( 'script' );
    script.src = '/static/critical-foft-preload-fallback-optional.js';
    script.async = true;
    ref.parentNode.insertBefore( script, ref );

    function loadFontsUsingFallback() {
      ${addFontFaceObserverToScript(fonts)}
    }

    if (window['__fontObserverLoaded__']) { loadFontsUsingFallback(); }
    else { window.addEventListener('__fontObserverReady__', loadFontsUsingFallback); }
  }
})()`;
}

function loadPromiseAddClassAndLocalStorageHandler(
  font,
  fontFamily,
  i,
  keyName
) {
  return `Promise.all([ ${font.variations.map(variation => {
    const fontOptions = variation[1];
    const weight = (fontOptions && fontOptions.fontWeight) || '';
    const style = (fontOptions && fontOptions.fontStyle) || '';
    const loadString = `'${weight}${weight ? ' ' : ''}${style}${
      style ? ' ' : ''
    }1em ${fontFamily}'`;
    return `document.fonts.load(${loadString})`;
  })} ])
    .then(function() {
      document.documentElement.className += ' fontsLoaded${i + 1}';
      if (localStorage) { localStorage.${keyName} = true; }
    });`;
}

function getFontList(fonts) {
  return Object.keys(fonts).reduce((fontList, fontFamily) => {
    const { variations, } = fonts[fontFamily];
    return [
      ...fontList,
      ...(variations
        ? variations.map(variationData => {
          const originalOptions = variationData[1];
          const weight = originalOptions && originalOptions.fontWeight;
          const style = originalOptions && originalOptions.fontStyle;
          const fontOptions = { name: fontFamily, };
          if (weight || style) {
            fontOptions.options = {};
            if (weight) {
              fontOptions.options.weight = weight;
            }
            if (style) {
              fontOptions.options.style = style;
            }
          }
          return fontOptions;
        })
        : undefined),
    ];
  }, []);
}

function addFontFaceObserverToScript(fonts) {
  const fontList = getFontList(fonts);

  const fontObservers = fontList
    .map((variant, i) => {
      const { name, options = {}, } = variant;
      const { weight, style, } = options;
      return `var font${i + 1} = new FontFaceObserver('${name}'${
        weight || style
          ? `, {${weight ? `weight: ${weight}, ` : ''}${
            style ? `, style: ${style}, ` : ''
          }}`
          : ''
      });`;
    })
    .join('\n');

  const fontPromises =
    `Promise.all([ ${fontList.map((variant, i) => `font${i + 1}.load()`)} ])` +
    `.then(function () {${Object.keys(fonts).map(
      fontFamily => `localStorage.fontLoaded${camelCase(fontFamily)} = true`
    )} });`;

  return `${fontObservers}\n${fontPromises}`;
}
