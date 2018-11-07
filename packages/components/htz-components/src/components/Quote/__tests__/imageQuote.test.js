import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Quote from '../Quote';

it('Image Quote ', () => {
  const snapshot = felaSnapshotter(
    <Quote
      text="בין השישה שלוש דמויות בולטות בפרשת הצוללות. דמויות אלו כוללות אישיות בכירה לשעבר  הביטחון"
      credit="מישהו"
      position="midCenterPosition"
      afterParagraph="2"
      imagesList={[
        {
          alt: 'נתניהו בישיבת הממשלה השבועית, בתחילת השבוע',
          credit: 'אמיל סלמן',
          title: 'נתניהו בישיבת הממשלה השבועית, בתחילת השבוע',
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/2151933599.jpg',
              version: '1518556356',
              aspects: {
                full: {
                  width: 1942,
                  height: 1456,
                  x: 0,
                  y: 0,
                },
                regular: {
                  width: 1942,
                  height: 1456,
                  x: 258,
                  y: 12,
                },
                headline: {
                  width: 2200,
                  height: 1277,
                  x: 0,
                  y: 56,
                },
                belgrade: {
                  width: 2200,
                  height: 690,
                  x: 0,
                  y: 369,
                },
                landscape: {
                  width: 2200,
                  height: 949,
                  x: 0,
                  y: 194,
                },
                square: {
                  width: 1461,
                  height: 1460,
                  x: 592,
                  y: 8,
                },
                vertical: {
                  width: 1227,
                  height: 1440,
                  x: 731,
                  y: 28,
                },
              },
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.5580',
          contentName: 'Nils02',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
