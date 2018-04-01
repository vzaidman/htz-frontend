import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Giphy from '../elements/Giphy';

it('Giphy ', () => {
  const snapshot = felaSnapshotter(
    <Giphy
      content="<embed src=\&quot;https://giphy.com/embed/I5xVnGJRHZZf2\&quot; width=\&quot;480\&quot; height=\&quot;433\&quot; frameBorder=\&quot;0\&quot; class=\&quot;giphy-embed\&quot; allowFullScreen></embed><p><a href=\&quot;https://giphy.com/gifs/police-francisco-among-I5xVnGJRHZZf2\&quot;>via GIPHY</a></p>"
      caption="giphy"
      credit="giphy"
      embedType="giphy"
      elementType="embedElement"
      settings={{
        src: 'https://giphy.com/embed/I5xVnGJRHZZf2',
        width: '480',
        height: '433',
      }}
      inputTemplate="com.polobase.GiphyEmbed"
      contentId="1.5919"
      contentName="giphy"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
