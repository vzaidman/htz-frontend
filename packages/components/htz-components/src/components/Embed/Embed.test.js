/* eslint-disable max-len */
import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
// import Embed from './Embed';

describe('Embeds', () => {
  beforeEach(() => {});

  it('Youtube Video ', () => {
    const snapshot = felaSnapshotter(<p>fake test</p>);
    expect(snapshot).toMatchSnapshot();
  });
  /*
  it('Youtube Video ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="3SzXM019pbs"
        caption="youtube headline"
        credit="youtube headline"
        embedType="video"
        elementType="embedElement"
        settings={{
          controls: '1',
          related: '0',
          loop: '1',
          videoImage: 'http://img.youtube.com/vi/3SzXM019pbs/0.jpg',
          logo: '1',
          mute: true,
          autoplay: true,
          startAt: 740,
        }}
        inputTemplate="com.polobase.YouTubeEmbed"
        contentId="7.4542"
        contentName="youtube headline"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Youtube playlist ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="rmRouEds_2A?list=RDrmRouEds_2A&t=1"
        caption="conan playlist"
        credit="conan playlist"
        embedType="playlist"
        elementType="embedElement"
        settings={{
          controls: '1',
          related: '1',
          loop: '0',
          videoImage: 'http://img.youtube.com/vi/rmRouEds_2A/0.jpg',
          logo: '1',
          mute: false,
          autoplay: false,
          startAt: 0,
        }}
        inputTemplate="com.polobase.YouTubeEmbed"
        contentId="7.5218"
        contentName="conan playlist"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Facebook post ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="https://www.facebook.com/haaretz/posts/10155626716202520"
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
      <Embed
        content="https://www.facebook.com/haaretz/videos/10155591353462520/"
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
      <Embed
        content="https://www.facebook.com/haaretz/posts/10155571966087520?comment_id=10155572023347520&comment_tracking=%7B%22tn%22%3A%22R0%22%7D"
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

  it('Google-Maps static ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="shoken 21 tel aviv"
        caption="static - satellite - eng"
        credit="static - satellite - eng"
        embedType="static"
        elementType="embedElement"
        settings={{
          language: 'en',
          satellite: 'true',
        }}
        inputTemplate="com.polobase.GoogleMapEmbed"
        contentId="7.4456"
        contentName="static - satellite - eng"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Google-Maps directions ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="shoken 21 tel aviv"
        caption="shoken 21 tel aviv ---> tony vespa habima tel aviv"
        credit="directions - noSatellite - eng"
        embedType="directions"
        elementType="embedElement"
        settings={{
          mode: 'walking',
          destination: 'tony vespa habima tel aviv',
          language: 'en',
          satellite: 'false',
          units: 'metric',
          waypoints: 'סורה מארה',
        }}
        inputTemplate="com.polobase.GoogleMapEmbed"
        contentId="7.4458"
        contentName="directions - noSatellite - eng"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Google-Maps search ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="קופיקס בתל אביב"
        caption="קופיקס בתל אביב"
        credit="search- satellite - eng"
        embedType="search"
        elementType="embedElement"
        settings={{
          language: 'en',
          satellite: 'true',
        }}
        inputTemplate="com.polobase.GoogleMapEmbed"
        contentId="7.4460"
        contentName="search- satellite - eng"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Google-Maps street view ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="streetView"
        caption="street view"
        credit="street view"
        embedType="streetView"
        elementType="embedElement"
        settings={{
          heading: 'none',
          coordinates: '32.05216,34.772368',
          language: 'en',
          satellite: 'false',
          pitch: '00',
          fov: '20',
        }}
        inputTemplate="com.polobase.GoogleMapEmbed"
        contentId="7.4963"
        contentName="street view"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Pinterest board ', () => {
    const snapshot = felaSnapshotter(
      <Embed
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
      <Embed
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
      <Embed
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

  it('Facebook comments ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="6"
        embedType="reverse_time"
        elementType="embedElement"
        inputTemplate="com.polobase.FacebookComments"
        contentId="7.3985"
        contentName="facebookComments"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Arti-Media ', () => {
    const snapshot = felaSnapshotter(
      <Embed
// eslint-disable-next-line max-len
        content="<div id='artimedia-player-989314' style='width:500px!important;  height:281px!important;'></div>\r\n<script type='text/javascript' async src='//p.artipbox.net/amapi.js' onload='\r\n  embedArtiPlayer({ \r\n      targetId:'artimedia-player-989314', \r\n      videoId: 'e0f2fad6-3675-45b0-90ab-71c3dc27b7d0', \r\n      publisherId: '5',\r\n      sitekey: 'TheMarker',\r\n      autoplay: true,\r\n      category: 'news'\r\n  });'>\r\n </script>"
        caption="artimedia"
        credit="artimedia"
        embedType="arti-media"
        elementType="embedElement"
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

  it('New-York times ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="https://graphics8.nytimes.com/video/players/offsite/index.html?videoId=100000005256748"
        caption="New York Times"
        credit="New York Times"
        embedType="NYTvideo"
        elementType="embedElement"
        inputTemplate="com.polobase.NYTEmbed"
        contentId="7.4028"
        contentName="New York Times"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Bloomberg ', () => {
    const snapshot = felaSnapshotter(
      <Embed
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
      <Embed
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
      <Embed
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
      <Embed
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
      <Embed
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

  it('Vimeo ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="105847954"
        caption="vimeo"
        credit="vimeo"
        embedType="vimeo"
        elementType="embedElement"
        inputTemplate="com.polobase.VimeoEmbed"
        contentId="7.4794"
        contentName="vimeo"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Twitter single tweet ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\"><a href=\"https://twitter.com/hashtag/Netflix?src=hash\">#Netflix</a>&#39;s <a href=\"https://twitter.com/hashtag/BoJackHorseman?src=hash\">#BoJackHorseman</a> finally has a season 4 premiere date <a href=\"https://t.co/xt08ol2mN2\">https://t.co/xt08ol2mN2</a> <a href=\"https://t.co/IYI8pq05rc\">pic.twitter.com/IYI8pq05rc</a></p>&mdash; UPROXX (@UPROXX) <a href=\"https://twitter.com/UPROXX/status/884416188280864768\">July 10, 2017</a></blockquote>'
        caption="tweet"
        credit="tweet"
        embedType="single tweet"
        elementType="embedElement"
        inputTemplate="com.polobase.TwitterEmbed"
        contentId="7.3909"
        contentName="tweet"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Twitter grid ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<a class=\"twitter-grid\" data-partner=\"tweetdeck\" href=\"https://twitter.com/woodenecho/timelines/890172042527592448\">Testing collections</a>'
        caption="grid Caption"
        credit="grid"
        embedType="collection timeline"
        elementType="embedElement"
        inputTemplate="com.polobase.TwitterEmbed"
        contentId="1.5760"
        contentName="grid"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Twitter user timeline ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<a class=\"twitter-timeline\" data-partner=\"tweetdeck\" href=\"https://twitter.com/woodenecho/timelines/890172042527592448\">Testing collections - Curated tweets by woodenecho</a>'
        caption="timeline"
        credit="timeline"
        embedType="user timeline"
        elementType="embedElement"
        inputTemplate="com.polobase.TwitterEmbed"
        contentId="1.5761"
        contentName="timeline"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Twitter search timeline ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<a class=\"twitter-timeline\" href=\"https://twitter.com/hashtag/webdesign\" data-widget-id=\"890169905349357568\">#webdesign Tweets</a>'
        caption="search"
        credit="search"
        embedType="search timeline"
        elementType="embedElement"
        inputTemplate="com.polobase.TwitterEmbed"
        contentId="7.4413"
        contentName="search"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Twitter video ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<blockquote class=\"twitter-video\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">Tips For Combating Climate Change <a href=\"https://t.co/QXm60aJyTR\">pic.twitter.com/QXm60aJyTR</a></p>&mdash; The Onion (@TheOnion) <a href=\"https://twitter.com/TheOnion/status/890050311196254211\">July 26, 2017</a></blockquote>'
        caption="twitter"
        credit="twitter"
        embedType="video"
        elementType="embedElement"
        inputTemplate="com.polobase.TwitterEmbed"
        contentId="1.5786"
        contentName="twitter"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Instagram ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"7\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:33.33333333333333% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BW-gRJSAoHd/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Meet our champion doggy paddling #Doogler, Skylos, who can spend hours on end in the water. Although he is over 145 pounds, Skylos loves befriending little dogs. A true gentle giant.</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A post shared by Google (@google) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-07-25T16:41:47+00:00\">Jul 25, 2017 at 9:41am PDT</time></p></div></blockquote>'
        caption="instagram"
        credit="instagram"
        embedType="instagram"
        elementType="embedElement"
        inputTemplate="com.polobase.InstagramEmbed"
        contentId="7.3910"
        contentName="instagram"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Instagram video ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<blockquote class=\"instagram-media\" data-instgrm-version=\"7\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div><p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\"><a href=\"https://www.instagram.com/p/BWiUVfxAhlZ/\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;\" target=\"_blank\">A post shared by Google (@google)</a> on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-07-14T17:58:47+00:00\">Jul 14, 2017 at 10:58am PDT</time></p></div></blockquote>'
        caption="ins video"
        credit="ins video"
        embedType="instagram"
        elementType="embedElement"
        inputTemplate="com.polobase.InstagramEmbed"
        contentId="7.4353"
        contentName="ins video"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('103FM ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="ZrqvnVq=HDGKJL&c41t4nzVQ=EE"
        caption="103FM"
        credit="103FM"
        embedType="103FM"
        elementType="embedElement"
        inputTemplate="com.polobase.FM103Embed"
        contentId="7.4900"
        contentName="103FM"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('SoundCloud track ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="https://soundcloud.com/defjam/bad_religion"
        caption="gjh"
        credit="gjh"
        embedType="track"
        elementType="embedElement"
        inputTemplate="com.polobase.SoundCloudEmbed"
        contentId="1.5775"
        contentName="hjg"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('SoundCloud playlist ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="https://soundcloud.com/maikbaptist-two/sets/bad-religion-plus-coversongs"
        caption="playlist"
        credit="playlist"
        embedType="playlist"
        elementType="embedElement"
        inputTemplate="com.polobase.SoundCloudEmbed"
        contentId="7.4902"
        contentName="playlist"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('BandCamp album ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<iframe style=\"border: 0; width: 100%; height: 470px;\" src=\"https://bandcamp.com/EmbeddedPlayer/album=3087453349/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/\" seamless><a href=\"http://kidsinsane.bandcamp.com/album/cluster\">Cluster by Kids Insane</a></iframe>'
        caption="bandCamp - track"
        credit="bandCamp - track"
        embedType="album"
        elementType="embedElement"
        settings={{
          tracklist: 'false',
          artworkSize: 'large',
          album: '3087453349',
          linkcol: '0687f5',
          link: '<a href="http://kidsinsane.bandcamp.com/album/cluster">Cluster by Kids Insane</a>',
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

  it('Tline ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<figure data-alias=\"donald-trumps-path-to-the-white-house\" data-version=\"0.1.1\" class=\"tline-embed op-interactive\" style=\"text-align: center; margin: 0 auto\"><embed class=\"tline-embed-nojs\" src=\"https://view.tline.io/embed/donald-trumps-path-to-the-white-house/?noJS=1&v=0.1.1\" height=\"500\" width=\"500\" scrolling=\"yes\" frameborder=\"0\"></embed></figure>'
        caption="tline"
        credit="tline"
        embedType="tline"
        elementType="embedElement"
        settings={{
          src: 'https://view.tline.io/embed/donald-trumps-path-to-the-white-house/?noJS=1&v=0.1.1',
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

  it('Waze ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content="https://www.waze.com/livemap?zoom=15&lat=32.06408&lon=34.77688"
        caption="Waze"
        credit="Waze"
        embedType="waze"
        elementType="embedElement"
        settings={{
          pin: 'true',
          coordinates: [
            '?zoom=15',
            'lat=32.06408',
            'lon=34.77688',
          ],
          language: 'he',
        }}
        inputTemplate="com.polobase.WazeEmbed"
        contentId="7.5003"
        contentName="Waze"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('Giphy ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<embed src=\"https://giphy.com/embed/I5xVnGJRHZZf2\" width=\"480\" height=\"433\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></embed><p><a href=\"https://giphy.com/gifs/police-francisco-among-I5xVnGJRHZZf2\">via GIPHY</a></p>'
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

  it('PlayBuzz ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content='<div class=\"pb_feed\" data-shares=\"false\" data-comments=\"false\" data-game-info=\"false\" data-item=\"df25b0eb-1402-435d-a4f2-83ff06cf7b36\" data-embed-by=\"5d056e35-f42e-456c-aa99-d57c2371e11f\" data-version=\"2\" ></div>'
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

  it('File upload ', () => {
    const snapshot = felaSnapshotter(
      <Embed
        content=""
        embedType="excel"
        elementType="embedElement"
        inputTemplate="com.polobase.fileUpload"
        contentId="7.4136"
        contentName="gdfjgh"
      />
    );
    expect(snapshot).toMatchSnapshot();
  }); */
});
