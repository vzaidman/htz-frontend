import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Quote from '../Quote';

it('Border Quote ', () => {
  const snapshot = felaSnapshotter(
    <Quote
      text="בין השישה שלוש דמויות בולטות בפרשת הצוללות. דמויות אלו כוללות אישיות בכירה לשעבר  הביטחון"
      credit="מישהו"
      position="midCenterPosition"
      afterParagraph="2"
      imagesList={[
        {
          alt: 'Nils02',
          caption: 'me',
          credit: 'me',
          image: 'image/3984584833.jpg',
          inputTemplate: 'com.tm.Image',
          contentId: '1.5580',
          contentName: 'Nils02',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
