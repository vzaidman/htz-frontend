import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Tline from '../elements/Tline';

it('Tline ', () => {
  const snapshot = felaSnapshotter(
    <Tline
      content="<figure data-alias=\&quot;donald-trumps-path-to-the-white-house\&quot; data-version=\&quot;0.1.1\&quot; class=\&quot;tline-embed op-interactive\&quot; style=\&quot;text-align: center; margin: 0 auto\&quot;><embed class=\&quot;tline-embed-nojs\&quot; src=\&quot;https://view.tline.io/embed/donald-trumps-path-to-the-white-house/?noJS=1&v=0.1.1\&quot; height=\&quot;500\&quot; width=\&quot;500\&quot; scrolling=\&quot;yes\&quot; frameborder=\&quot;0\&quot;></embed></figure>"
      caption="tline"
      credit="tline"
      embedType="tline"
      elementType="embedElement"
      settings={{
        src:
          'https://view.tline.io/embed/donald-trumps-path-to-the-white-house/?noJS=1&v=0.1.1',
        'data-alias': 'donald-trumps-path-to-the-white-house',
        'data-version': '0.1.1',
      }}
      inputTemplate="com.polobase.TlineEmbed"
      contentId="7.5196"
      contentName="tline"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
