export const buildFontFamilyArray = fonts =>
  Object.keys(fonts).reduce((rules, fontFamily) => {
    const subset = fonts[fontFamily].subset;
    return [
      ...rules,
      ...setFontFamily(
        [ ...(subset ? [ subset, ] : []), ...fonts[fontFamily].variations, ],
        fontFamily,
        !!subset
      ),
    ];
  }, []);

function setFontFamily(variations, fontFamily, hasSubset) {
  return variations.reduce((rules, variation, i) => {
    const [ srcs, fontOptions, ] = variation;
    return [
      ...rules,
      [
        fontFamily + (hasSubset && i < 1 ? 'Subset' : ''),
        srcs,
        hasSubset && i < 1
          ? fontOptions
          : { ...fontOptions, fontDisplay: 'swap', },
      ],
    ];
  }, []);
}
