import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Waze from '../elements/Waze';

it('Waze ', () => {
  const snapshot = felaSnapshotter(
    <Waze
      content="https://www.waze.com/livemap?zoom=15&lat=32.06408&lon=34.77688"
      caption="Waze"
      credit="Waze"
      embedType="waze"
      elementType="embedElement"
      settings={{
        pin: 'true',
        coordinates: [ '?zoom=15', 'lat=32.06408', 'lon=34.77688', ],
        language: 'he',
      }}
      inputTemplate="com.polobase.WazeEmbed"
      contentId="7.5003"
      contentName="Waze"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
