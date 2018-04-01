import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import PlayBuzz from '../elements/PlayBuzz';

it('PlayBuzz ', () => {
  const snapshot = felaSnapshotter(
    <PlayBuzz
      content="<div class=\&quot;pb_feed\&quot; data-shares=\&quot;false\&quot; data-comments=\&quot;false\&quot; data-game-info=\&quot;false\&quot; data-item=\&quot;df25b0eb-1402-435d-a4f2-83ff06cf7b36\&quot; data-embed-by=\&quot;5d056e35-f42e-456c-aa99-d57c2371e11f\&quot; data-version=\&quot;2\&quot; ></div>"
      caption="playBuzz1"
      credit="playBuzz1"
      embedType="playBuzz"
      elementType="embedElement"
      settings={{
        'data-item': 'data-item="df25b0eb-1402-435d-a4f2-83ff06cf7b36"',
        facebook: false,
        share: false,
        recommendations: false,
        'data-embed-by': 'data-embed-by="5d056e35-f42e-456c-aa99-d57c2371e11f"',
        'data-version': 'data-version="2"',
        info: false,
      }}
      inputTemplate="com.polobase.PlayBuzzEmbed"
      contentId="7.4706"
      contentName="playBuzz"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
