import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Twitter from '../elements/Twitter';

it('Twitter single tweet ', () => {
  const snapshot = felaSnapshotter(
    <Twitter
      source="<blockquote class=\&quot;twitter-tweet\&quot; data-lang=\&quot;en\&quot;><p lang=\&quot;en\&quot; dir=\&quot;ltr\&quot;><a href=\&quot;https://twitter.com/hashtag/Netflix?src=hash\&quot;>#Netflix</a>&#39;s <a href=\&quot;https://twitter.com/hashtag/BoJackHorseman?src=hash\&quot;>#BoJackHorseman</a> finally has a season 4 premiere date <a href=\&quot;https://t.co/xt08ol2mN2\&quot;>https://t.co/xt08ol2mN2</a> <a href=\&quot;https://t.co/IYI8pq05rc\&quot;>pic.twitter.com/IYI8pq05rc</a></p>&mdash; UPROXX (@UPROXX) <a href=\&quot;https://twitter.com/UPROXX/status/884416188280864768\&quot;>July 10, 2017</a></blockquote>"
      caption="tweet"
      credit="tweet"
      embedType="single tweet"
      kind="embed"
      inputTemplate="com.polobase.TwitterEmbed"
      contentId="7.3909"
      contentName="tweet"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Twitter grid ', () => {
  const snapshot = felaSnapshotter(
    <Twitter
      source="<a class=\&quot;twitter-grid\&quot; data-partner=\&quot;tweetdeck\&quot; href=\&quot;https://twitter.com/woodenecho/timelines/890172042527592448\&quot;>Testing collections</a>"
      caption="grid Caption"
      credit="grid"
      embedType="collection timeline"
      kind="embed"
      inputTemplate="com.polobase.TwitterEmbed"
      contentId="1.5760"
      contentName="grid"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Twitter user timeline ', () => {
  const snapshot = felaSnapshotter(
    <Twitter
      source="<a class=\&quot;twitter-timeline\&quot; data-partner=\&quot;tweetdeck\&quot; href=\&quot;https://twitter.com/woodenecho/timelines/890172042527592448\&quot;>Testing collections - Curated tweets by woodenecho</a>"
      caption="timeline"
      credit="timeline"
      embedType="user timeline"
      kind="embed"
      inputTemplate="com.polobase.TwitterEmbed"
      contentId="1.5761"
      contentName="timeline"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Twitter search timeline ', () => {
  const snapshot = felaSnapshotter(
    <Twitter
      source="<a class=\&quot;twitter-timeline\&quot; href=\&quot;https://twitter.com/hashtag/webdesign\&quot; data-widget-id=\&quot;890169905349357568\&quot;>#webdesign Tweets</a>"
      caption="search"
      credit="search"
      embedType="search timeline"
      kind="embed"
      inputTemplate="com.polobase.TwitterEmbed"
      contentId="7.4413"
      contentName="search"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Twitter video ', () => {
  const snapshot = felaSnapshotter(
    <Twitter
      source="<blockquote class=\&quot;twitter-video\&quot; data-lang=\&quot;en\&quot;><p lang=\&quot;en\&quot; dir=\&quot;ltr\&quot;>Tips For Combating Climate Change <a href=\&quot;https://t.co/QXm60aJyTR\&quot;>pic.twitter.com/QXm60aJyTR</a></p>&mdash; The Onion (@TheOnion) <a href=\&quot;https://twitter.com/TheOnion/status/890050311196254211\&quot;>July 26, 2017</a></blockquote>"
      caption="twitter"
      credit="twitter"
      embedType="video"
      kind="embed"
      inputTemplate="com.polobase.TwitterEmbed"
      contentId="1.5786"
      contentName="twitter"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
