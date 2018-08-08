import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Facebook from '../elements/Facebook';

it('Facebook post ', () => {
  const snapshot = felaSnapshotter(
    <Facebook
      source="https://www.facebook.com/haaretz/posts/10155626716202520"
      caption="hkj"
      credit="hjk"
      embedType="post"
      elementType="embedElement"
      settings={{
        showText: 'false',
        width: '0',
        height: '0',
      }}
      inputTemplate="com.polobase.FacebookEmbed"
      contentId="7.4695"
      contentName="hjk"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Facebook video ', () => {
  const snapshot = felaSnapshotter(
    <Facebook
      source="https://www.facebook.com/haaretz/videos/10155591353462520/"
      caption="aa"
      credit="aa"
      embedType="video"
      elementType="embedElement"
      settings={{
        showText: 'false',
        width: '560',
        height: '315',
      }}
      inputTemplate="com.polobase.FacebookEmbed"
      contentId="7.4430"
      contentName="aa"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Facebook comment ', () => {
  const snapshot = felaSnapshotter(
    <Facebook
      source="https://www.facebook.com/haaretz/posts/10155571966087520?comment_id=10155572023347520&comment_tracking=%7B%22tn%22%3A%22R0%22%7D"
      caption="comment"
      credit="comment"
      embedType="comments"
      elementType="embedElement"
      settings={{
        showText: 'false',
        width: '0',
        height: '0',
      }}
      inputTemplate="com.polobase.FacebookEmbed"
      contentId="7.4495"
      contentName="comment"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
