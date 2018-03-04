import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import ArticleHeader from '../ArticleHeader';

describe('ArticleHeader component', () => {
  const { title, author, publishDateTime, } = {
    title:
      'עפרה חזָה (19 בנובמבר 1957 – 23 בפברואר 2000) הייתה זמרת ושחקנית ישראלית בינלאומית. ',
    publishDateTime: new Date('19 Nov 1957'), // Ofra Haza birthday
    author: {
      name: 'Avi Kaufman',
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
