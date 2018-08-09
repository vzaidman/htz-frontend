import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import MobileQuickRegistration from './MobileQuickRegistration';

it.skip('MobileQuickRegistration ', () => {
  const snapshot = felaSnapshotter(
    <MobileQuickRegistration
      teaserBody="הירשמו עכשיו להמלצות הקריאה של הארץ"
      doubleOptIn="doptint"
      mailto="subscribe-1338625@newsletters.haaretz.co.il"
      mailSubject="הרשמה להמלצות הקריאה של הארץ"
      mailBody="להרשמה מהירה שילחו מייל זה מבלי לשנות את כתובת הנמען"
      teaserButton="הרשמה בקליק"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
