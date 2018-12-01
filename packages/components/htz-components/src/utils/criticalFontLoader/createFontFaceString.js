
/**
 * converts camelCase to dash-case
 * @param {String} camelCaseStr - string in camelCase
 * @returns {String} string in dash-case
 * @example camelCaseToDashCase('alphaBravoCharlieDeltaEcho') => alpha-bravo-charlie-delta-echo
 */
const camelCaseToDashCase = camelCaseStr => camelCaseStr
  .replace(/(\w)([A-Z])/g, '$1-$2')
  .toLowerCase();


// TODO: jsdoc
const propToString = ([ name, value, ]) => `${camelCaseToDashCase(name)}: ${value}`;


// TODO: jsdoc
const propListToString = propList => propList
  .map(propToString)
  .map(propStr => `\n\t${propStr};`)
  .join('');


// TODO: jsdoc
const getFileFormat = fileName => fileName.replace(/.*\.(\w+)$/, '$1');


/**
 *
 * @param {String} family
 * @param {Array<String>} files
 * @param {Object} properties
 */
const createFontFaceString = ({ family, files, properties, }) => {
  const filesString = files.map(file => `url('${file}') format('${getFileFormat(file)}')`);
  const fontFaceData = {
    ...properties,
    fontFamily: family,
    src: filesString.join(', '),
  };
  return `@font-face {${propListToString(Object.entries(fontFaceData))}\n}`;
};

export default createFontFaceString;
