import React from 'react';

const createFontPreload = font => (
  font
    ? (
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href={font.files[0]}
      />
    )
    : null
);

export default createFontPreload;
