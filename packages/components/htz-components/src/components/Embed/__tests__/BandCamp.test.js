import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import BandCamp from '../elements/BandCamp';

it('BandCamp album ', () => {
  const snapshot = felaSnapshotter(
    <BandCamp
      content="<iframe style=\&quot;border: 0; width: 100%; height: 470px;\&quot; src=\&quot;https://bandcamp.com/EmbeddedPlayer/album=3087453349/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/\&quot; seamless><a href=\&quot;http://kidsinsane.bandcamp.com/album/cluster\&quot;>Cluster by Kids Insane</a></iframe>"
      caption="bandCamp - track"
      credit="bandCamp - track"
      embedType="album"
      kind="embed"
      settings={{
        tracklist: 'false',
        artworkSize: 'large',
        album: '3087453349',
        linkcol: '0687f5',
        link:
          '<a href="http://kidsinsane.bandcamp.com/album/cluster">Cluster by Kids Insane</a>',
        bgcol: 'ffffff',
        transparent: 'true',
        showTrackList: 'true',
        layout: 'artworkOnly',
        slimShowArt: 'true',
        size: 'large',
        width: '100%',
        standardShowArt: 'true',
        theme: 'ffffff',
        height: '470px',
      }}
      inputTemplate="com.polobase.BandCampEmbed"
      contentId="7.5141"
      contentName="bandCamp - track"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
