export default (aspect, isFullScreen, viewMode, position) => {
  if (viewMode === 'landscapeView') {
    return {
      sizes: '100vw',
      transforms: [
        {
          width: '1920',
          aspect,
          quality: 'auto',
        },
        {
          width: '1440',
          aspect,
          quality: 'auto',
        },
        {
          width: '1280',
          aspect,
          quality: 'auto',
        },
        {
          width: '1028',
          aspect,
          quality: 'auto',
        },
        {
          width: '768',
          aspect,
          quality: 'auto',
        },
        {
          width: '600',
          aspect,
          quality: 'auto',
        },
        {
          width: '425',
          aspect,
          quality: 'auto',
        },
        {
          width: '375',
          aspect,
          quality: 'auto',
        },
      ],
    };
  }

  if (position === 'left' || position === 'right') {
    return {
      sizes: isFullScreen ? '100vw' : '(min-width:1280px) 300px,(min-width:1024px) 234px, 90vw',
      transforms: [
        {
          width: '1920',
          aspect,
          quality: 'auto',
        },
        {
          width: '1440',
          aspect,
          quality: 'auto',
        },
        {
          width: '1280',
          aspect,
          quality: 'auto',
        },
        {
          width: '1028',
          aspect,
          quality: 'auto',
        },
        {
          width: '768',
          aspect,
          quality: 'auto',
        },
        {
          width: '600',
          aspect,
          quality: 'auto',
        },
        {
          width: '425',
          aspect,
          quality: 'auto',
        },
        {
          width: '375',
          aspect,
          quality: 'auto',
        },
        {
          width: '300',
          aspect,
          quality: 'auto',
        },
        {
          width: '234',
          aspect,
          quality: 'auto',
        },
      ],
    };
  }

  if (position === 'midWide') {
    return {
      sizes: isFullScreen ? '100vw' : '(min-width:1024px) 1232px,(min-width:768px) 95vw, 95vw',
      transforms: [
        {
          width: '1920',
          aspect,
          quality: 'auto',
        },
        {
          width: '1440',
          aspect,
          quality: 'auto',
        },
        {
          width: '1280',
          aspect,
          quality: 'auto',
        },
        {
          width: '1028',
          aspect,
          quality: 'auto',
        },
        {
          width: '768',
          aspect,
          quality: 'auto',
        },
        {
          width: '600',
          aspect,
          quality: 'auto',
        },
        {
          width: '425',
          aspect,
          quality: 'auto',
        },
        {
          width: '375',
          aspect,
          quality: 'auto',
        },
      ],
    };
  }

  if (position === 'midLeftPosition' || position === 'midRightPosition') {
    return {
      sizes: isFullScreen ? '100vw' : '(min-width:1024px) 918px,(min-width:768px) 726px, 95vw',
      transforms: [
        {
          width: '1920',
          aspect,
          quality: 'auto',
        },
        {
          width: '1440',
          aspect,
          quality: 'auto',
        },
        {
          width: '1280',
          aspect,
          quality: 'auto',
        },
        {
          width: '1028',
          aspect,
          quality: 'auto',
        },
        {
          width: '918',
          aspect,
          quality: 'auto',
        },
        {
          width: '726',
          aspect,
          quality: 'auto',
        },
        {
          width: '600',
          aspect,
          quality: 'auto',
        },
        {
          width: '425',
          aspect,
          quality: 'auto',
        },
        {
          width: '375',
          aspect,
          quality: 'auto',
        },
      ],
    };
  }
  return {
    sizes: '100vw',
    transforms: [
      {
        width: '1920',
        aspect,
        quality: 'auto',
      },
      {
        width: '1440',
        aspect,
        quality: 'auto',
      },
      {
        width: '1280',
        aspect,
        quality: 'auto',
      },
      {
        width: '1028',
        aspect,
        quality: 'auto',
      },
      {
        width: '768',
        aspect,
        quality: 'auto',
      },
      {
        width: '600',
        aspect,
        quality: 'auto',
      },
      {
        width: '425',
        aspect,
        quality: 'auto',
      },
      {
        width: '375',
        aspect,
        quality: 'auto',
      },
    ],
  };
};
