import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import HeaderText from '../HeaderText';

describe('HeaderText component', () => {
  it('correctly renders with minimum required props', () => {
    const snapshot = felaSnapshotter(
      <HeaderText title="ישראל שומרת על ריסון בעזה ומאמצת גישה תקיפה בגבול הצפון" />
    );
    expect(snapshot).toMatchSnapshot();
  });
  it('correctly renders with all possible props', () => {
    const snapshot = felaSnapshotter(
      <HeaderText
        kicker="פרשנות"
        title="ישראל שומרת על ריסון בעזה ומאמצת גישה תקיפה בגבול הצפון"
        subtitle="ההודעה הישראלית על החזרת אספקת החשמל לעזה היא חלק מהצורך לנהל כמה משברים במקביל. קשה לראות את וושינגטון מתערבת כדי להגביל מהלכים ישראלים בצפון, אם נתניהו יחליט שאלה פעולות נדרשות"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
