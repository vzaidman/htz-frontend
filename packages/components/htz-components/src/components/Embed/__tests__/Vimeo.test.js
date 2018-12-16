import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Vimeo from '../elements/Vimeo';

it('Vimeo ', () => {
  const snapshot = felaSnapshotter(
    <Vimeo
      source="105847954"
      caption="vimeo"
      credit="vimeo"
      embedType="vimeo"
      kind="embed"
      inputTemplate="com.polobase.VimeoEmbed"
      contentId="7.4794"
      contentName="vimeo"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
