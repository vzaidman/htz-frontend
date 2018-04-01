import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import StandardVideo from '../elements/StandardVideo';

it('Bloomberg ', () => {
  const snapshot = felaSnapshotter(
    <StandardVideo
      content="https://www.bloomberg.com/api/embed/iframe?id=11433877-bb50-4b36-974c-ea3e5b2c3260"
      caption="bloomberg"
      credit="bloomberg"
      embedType="bloomberg"
      elementType="embedElement"
      inputTemplate="com.polobase.BloombergEmbed"
      contentId="7.4895"
      contentName="bloomberg"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Reuters ', () => {
  const snapshot = felaSnapshotter(
    <StandardVideo
      content="https://www.reuters.com/assets/iframe/yovideo?videoId=372329416"
      caption="reuters"
      credit="reuters"
      embedType="reuters"
      elementType="embedElement"
      inputTemplate="com.polobase.ReutersEmbed"
      contentId="7.4894"
      contentName="reuters"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('The Guardian ', () => {
  const snapshot = felaSnapshotter(
    <StandardVideo
      content="https://embed.theguardian.com/embed/video/politics/commentisfree/video/2017/jun/07/britain-transformed-election-what-on-earth-is-going-on-video"
      caption="guardian"
      credit="guardian"
      embedType="guardianVideo"
      elementType="embedElement"
      inputTemplate="com.polobase.GuardianEmbed"
      contentId="7.4030"
      contentName="guardian"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('CNN ', () => {
  const snapshot = felaSnapshotter(
    <StandardVideo
      content="//fave.api.cnn.io/v1/fav/?video=world/2017/01/19/donald-trump-putin-russia-best-prostitutes-moos-pkg.cnn&customer=cnn&edition=international&env=prod"
      caption="cnn"
      credit="cnn"
      embedType="cnn"
      elementType="embedElement"
      inputTemplate="com.polobase.CNNEmbed"
      contentId="7.4896"
      contentName="cnn"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Mako ', () => {
  const snapshot = felaSnapshotter(
    <StandardVideo
      content="https://www.mako.co.il/AjaxPage?jspName=embedHTML5video.jsp&galleryChannelId=5287910d276cd510VgnVCM100000290c10acRCRD&videoChannelId=02a034d102bfc510VgnVCM100000290c10acRCRD&vcmid=5e41465459b6d510VgnVCM100000290c10acRCRD"
      caption="Mako"
      credit="Mako"
      embedType="mako"
      elementType="embedElement"
      inputTemplate="com.polobase.MakoEmbed"
      contentId="7.4793"
      contentName="Mako"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
