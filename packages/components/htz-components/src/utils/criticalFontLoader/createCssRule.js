// TODO: create jsdoc
const createCssRule = (className, selector, fontFamily, fallbackFont) => {
  const fontSelector = `.${className} ${selector}`;
  const fontRule = `font-family: ${fontFamily}, ${fallbackFont};`;
  return `${fontSelector} { ${fontRule} }`;
};

export default createCssRule;
