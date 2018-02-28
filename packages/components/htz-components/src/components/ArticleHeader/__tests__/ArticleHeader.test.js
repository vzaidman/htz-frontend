import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import ArticleHeader from '../ArticleHeader';

describe('ArticleHeader component', () => {
  const { title, author, publishDateTime, } = {
    title:
      'עפרה חזָה (19 בנובמבר 1957 – 23 בפברואר 2000) הייתה זמרת ושחקנית ישראלית בינלאומית. ',
    publishDateTime: new Date('19 Nov 1957'), // Ofra Haza birthday
    author: {
      contentName: 'Avi Kaufman',
      image: {
        viewMode: 'FullColumnWithVerticalImage',
        accessibility: 'ren & stimpy',
        aspects: {
          square: {
            x: 0,
            y: 170,
            width: 360,
            height: 360,
          },
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: 'image/1536361643.png',
            version: '1519832762',
          },
        ],
        imageType: 'image',
        inputTemplate: 'com.tm.Image',
        contentId: '1.6738',
        contentName: 'ren & stimpy',
      },
    },
  };

  it('renders correctly with minimum required props', () => {
    const snapshot = felaSnapshotter(
      <ArticleHeader
        title={title}
        author={author}
        publishDateTime={publishDateTime}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
