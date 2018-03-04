import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Quote from '../Quote';

it('Icon Quote ', () => {
  const snapshot = felaSnapshotter(
    <Quote
      text="בין השישה שלוש דמויות בולטות בפרשת הצוללות. דמויות אלו כוללות אישיות בכירה לשעבר  הביטחון"
      credit="מישהו"
      position="midCenterPosition"
      afterParagraph="2"
      imagesList={[]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
