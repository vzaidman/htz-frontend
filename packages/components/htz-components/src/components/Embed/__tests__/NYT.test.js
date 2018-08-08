import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import NYT from '../elements/NYT';

it('New-York times ', () => {
  const snapshot = felaSnapshotter(
    <NYT
      source="https://graphics8.nytimes.com/video/players/offsite/index.html?videoId=100000005256748"
      caption="New York Times"
      credit="New York Times"
      embedType="NYTvideo"
      elementType="embedElement"
      inputTemplate="com.polobase.NYTEmbed"
      contentId="7.4028"
      contentName="New York Times"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
