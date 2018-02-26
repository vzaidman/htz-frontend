import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Subtitle from '../_Subtitle'; // eslint-disable-line import/no-named-as-default

describe('Kicker component', () => {
  it("renders correctly a 'p' tag", () => {
    const snapshot = felaSnapshotter(
      <Subtitle>ישראלים בצפון, אם נתניהו יחליט שאלה פעולות נדרשות</Subtitle>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
