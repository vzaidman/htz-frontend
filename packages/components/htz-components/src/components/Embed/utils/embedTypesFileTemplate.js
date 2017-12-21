module.exports = views => `
/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the Embed's elements map, it is generated
 * from the \`embedTypesFileTemplate.js\` file is this directory.
 * *************************************************************** */
import dynamic from 'next/dynamic';

const views = {
  ${Object.keys(views).map(view => `'${view}': ${views[view]}`).join(',\n  ')},
};

export default views;
`;
