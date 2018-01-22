import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Quote from '../Quote';

it('Border Quote ', () => {
  const snapshot = felaSnapshotter(
    <Quote
      text = "בין השישה שלוש דמויות בולטות בפרשת הצוללות. דמויות אלו כוללות אישיות בכירה לשעבר  הביטחון"
      imagesList = {[]}
      position = "midCenterPosition"
      afterParagraph = "2"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
