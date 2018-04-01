import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Pinterest from '../elements/Pinterest';

it('Pinterest board ', () => {
  const snapshot = felaSnapshotter(
    <Pinterest
      content="https://www.pinterest.com/ItsSequoia/marvel-comics/"
      caption="pinterest - board"
      credit="pinterest - board"
      embedType="board"
      elementType="embedElement"
      settings={{
        showCaption: 'false',
      }}
      inputTemplate="com.polobase.PinterestEmbed"
      contentId="7.4983"
      contentName="pinterest - board"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Pinterest profile ', () => {
  const snapshot = felaSnapshotter(
    <Pinterest
      content="https://www.pinterest.com/marvelcomics/"
      caption="pinterest - profile"
      credit="pinterest - profile"
      embedType="profile"
      elementType="embedElement"
      settings={{
        showCaption: 'false',
      }}
      inputTemplate="com.polobase.PinterestEmbed"
      contentId="7.4984"
      contentName="pinterest - profile"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Pinterest pin ', () => {
  const snapshot = felaSnapshotter(
    <Pinterest
      content="https://www.pinterest.com/pin/372321094177951937/"
      caption="pinterest - pin"
      credit="pinterest - pin"
      embedType="pin"
      elementType="embedElement"
      settings={{
        showCaption: 'false',
      }}
      inputTemplate="com.polobase.PinterestEmbed"
      contentId="7.4982"
      contentName="pinterest - pin"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
