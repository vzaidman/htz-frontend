import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import StandardAudio from '../elements/StandardAudio';

it('103FM ', () => {
  const snapshot = felaSnapshotter(
    <StandardAudio
      source="ZrqvnVq=HDGKJL&c41t4nzVQ=EE"
      caption="103FM"
      credit="103FM"
      embedType="103FM"
      elementType="embedElement"
      inputTemplate="com.polobase.FM103Embed"
      contentId="7.4900"
      contentName="103FM"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('SoundCloud track ', () => {
  const snapshot = felaSnapshotter(
    <StandardAudio
      source="https://soundcloud.com/defjam/bad_religion"
      caption="gjh"
      credit="gjh"
      embedType="track"
      elementType="embedElement"
      inputTemplate="com.polobase.SoundCloudEmbed"
      contentId="1.5775"
      contentName="hjg"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('SoundCloud playlist ', () => {
  const snapshot = felaSnapshotter(
    <StandardAudio
      source="https://soundcloud.com/maikbaptist-two/sets/bad-religion-plus-coversongs"
      caption="playlist"
      credit="playlist"
      embedType="playlist"
      elementType="embedElement"
      inputTemplate="com.polobase.SoundCloudEmbed"
      contentId="7.4902"
      contentName="playlist"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
