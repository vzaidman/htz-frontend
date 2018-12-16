import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import ArtiMedia from '../elements/ArtiMedia';

it('Arti-Media ', () => {
  const snapshot = felaSnapshotter(
    <ArtiMedia
      // eslint-disable-next-line max-len
      content="<div id='artimedia-player-989314' style='width:500px!important;  height:281px!important;'></div>\r\n<script type='text/javascript' async src='//p.artipbox.net/amapi.js' onload='\r\n  embedArtiPlayer({ \r\n      targetId:'artimedia-player-989314', \r\n      videoId: 'e0f2fad6-3675-45b0-90ab-71c3dc27b7d0', \r\n      publisherId: '5',\r\n      sitekey: 'TheMarker',\r\n      autoplay: true,\r\n      category: 'news'\r\n  });'>\r\n </script>"
      caption="artimedia"
      credit="artimedia"
      embedType="arti-media"
      kind="embed"
      settings={{
        publisherId: "'5'",
        sitekey: "'TheMarker'",
        videoId: "'e0f2fad6-3675-45b0-90ab-71c3dc27b7d0'",
        category: "'news'",
        playerId: 'artimedia-player-989314',
      }}
      inputTemplate="com.polobase.ArtiMediaEmbed"
      contentId="7.5144"
      contentName="artimedia"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
