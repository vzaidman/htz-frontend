import React from 'react';
import InlineScript from './InlineScript';

const createFontScript = (fontLoaderScript, data) => (
  <InlineScript
    scriptFunc={fontLoaderScript}
    params={data}
  />
);

export default createFontScript;
