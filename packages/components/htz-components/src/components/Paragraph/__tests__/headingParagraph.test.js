import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Paragraph from '../Paragraph';

it('Render paragraph as heading correctly ', () => {
  const snapshot = felaSnapshotter(
    <Paragraph
      {...{
        attributes: [],
        tag: 'h4',
        content: [
          {
            attributes: [
              {
                key: 'text',
                value:
                  'צבא אסד מעמיק את המתקפה לכיבוש כפרי המורדים סמוך לגבול עם ישראל.',
              },
            ],
            tag: '#text',
          },
        ],
      }}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
