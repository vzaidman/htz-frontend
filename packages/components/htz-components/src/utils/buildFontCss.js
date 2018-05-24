export function buildFontCss(fonts, defaultFontStack) {
  const fontFamilies = Object.keys(fonts);
  return fontFamilies.reduce(
    (rules, fontFamily, i) =>
      `${rules}${
        // Only render a subset class if a subset is defined.
        fonts[fontFamily].subset
          ? buildRuleString(
            fontFamily,
            i,
            true,
            defaultFontStack,
            fonts[fontFamily].applyTo
          )
          : ''
      }${buildRuleString(
        fontFamily,
        i,
        false,
        defaultFontStack,
        fonts[fontFamily].applyTo
      )}`,
    ''
  );
}

function buildRuleString(name, i, isSubset, defaultStack, applyTo) {
  return `${buildSelector(i, isSubset, applyTo)}font-family:${name}${
    isSubset ? 'Subset' : ''
  }${defaultStack ? `,${defaultStack}` : ''};}`;
}

function buildSelector(i, isSubset, applyTo) {
  return `${applyTo
    .map(
      selectorItem =>
        `.fontsLoaded${i + 1}${isSubset ? 'Subset' : ''} ${selectorItem}`
    )
    .join(',')}{`;
}
