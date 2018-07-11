import React from 'react';

export const buildFontPreloadLink = fonts =>
  Object.keys(fonts).reduce((links, fontFamily) => {
    const { subset, } = fonts[fontFamily];
    const href = subset && subset[0] && subset[0][0];

    return href
      ? [
        ...links,
        <link
          key={fontFamily + href}
          rel="preload"
          href={href}
          as="font"
          type="font/woff2"
          crossOrigin="use-credentials"
        />,
      ]
      : links;
  }, []);
