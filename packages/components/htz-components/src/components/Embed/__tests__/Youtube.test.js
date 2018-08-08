import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Youtube from '../elements/Youtube';

it('Youtube Video ', () => {
  const snapshot = felaSnapshotter(
    <Youtube
      source="3SzXM019pbs"
      caption="youtube headline"
      credit="youtube headline"
      embedType="video"
      elementType="embedElement"
      settings={{
        controls: '1',
        related: '0',
        loop: '1',
        videoImage: 'http://img.youtube.com/vi/3SzXM019pbs/0.jpg',
        logo: '1',
        mute: true,
        autoplay: true,
        startAt: 740,
      }}
      inputTemplate="com.polobase.YouTubeEmbed"
      contentId="7.4542"
      contentName="youtube headline"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Youtube playlist ', () => {
  const snapshot = felaSnapshotter(
    <Youtube
      source="rmRouEds_2A?list=RDrmRouEds_2A&t=1"
      caption="conan playlist"
      credit="conan playlist"
      embedType="playlist"
      elementType="embedElement"
      settings={{
        controls: '1',
        related: '1',
        loop: '0',
        videoImage: 'http://img.youtube.com/vi/rmRouEds_2A/0.jpg',
        logo: '1',
        mute: false,
        autoplay: false,
        startAt: 0,
      }}
      inputTemplate="com.polobase.YouTubeEmbed"
      contentId="7.5218"
      contentName="conan playlist"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
