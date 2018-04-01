module.exports = views => `
/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the Embed's elements map, it is generated
 * from the \`embedTypesFileTemplate.js\` file is this directory.
 * *************************************************************** */
import React from 'react';
import dynamic from 'next/dynamic';

const embeds = {
  ${Object.keys(views)
    .map(view => `'${view}': () => import('${views[view]}')`)
    .join(',\n  ')},
};

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, }) => (
  <p>{\`There is no template for \${inputTemplate} yet\`}</p>
);

const getEmbed = embedType => {
  const embedPath = embeds[embedType] || null;

  if (embedPath) {
    return new Promise((resolve, reject) => {
      dynamic(
        embedPath()
          .then(Embed => resolve(Embed))
          .catch(err => reject(err))
      );
    });
  }
  return new Promise(resolve => resolve(DefaultComponent));
};

export default embedType => getEmbed(embedType);
`;
