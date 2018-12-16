import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import Instagram from '../elements/Instagram';

it('Instagram ', () => {
  const snapshot = felaSnapshotter(
    <Instagram
      source="<blockquote class=\&quot;instagram-media\&quot; data-instgrm-captioned data-instgrm-version=\&quot;7\&quot; style=\&quot; background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\&quot;><div style=\&quot;padding:8px;\&quot;> <div style=\&quot; background:#F8F8F8; line-height:0; margin-top:40px; padding:33.33333333333333% 0; text-align:center; width:100%;\&quot;> <div style=\&quot; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\&quot;></div></div> <p style=\&quot; margin:8px 0 0 0; padding:0 4px;\&quot;> <a href=\&quot;https://www.instagram.com/p/BW-gRJSAoHd/\&quot; style=\&quot; color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\&quot; target=\&quot;_blank\&quot;>Meet our champion doggy paddling #Doogler, Skylos, who can spend hours on end in the water. Although he is over 145 pounds, Skylos loves befriending little dogs. A true gentle giant.</a></p> <p style=\&quot; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\&quot;>A post shared by Google (@google) on <time style=\&quot; font-family:Arial,sans-serif; font-size:14px; line-height:17px;\&quot; datetime=\&quot;2017-07-25T16:41:47+00:00\&quot;>Jul 25, 2017 at 9:41am PDT</time></p></div></blockquote>"
      caption="instagram"
      credit="instagram"
      embedType="instagram"
      kind="embed"
      inputTemplate="com.polobase.InstagramEmbed"
      contentId="7.3910"
      contentName="instagram"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Instagram video ', () => {
  const snapshot = felaSnapshotter(
    <Instagram
      source="<blockquote class=\&quot;instagram-media\&quot; data-instgrm-version=\&quot;7\&quot; style=\&quot; background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\&quot;><div style=\&quot;padding:8px;\&quot;> <div style=\&quot; background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;\&quot;> <div style=\&quot; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\&quot;></div></div><p style=\&quot; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\&quot;><a href=\&quot;https://www.instagram.com/p/BWiUVfxAhlZ/\&quot; style=\&quot; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;\&quot; target=\&quot;_blank\&quot;>A post shared by Google (@google)</a> on <time style=\&quot; font-family:Arial,sans-serif; font-size:14px; line-height:17px;\&quot; datetime=\&quot;2017-07-14T17:58:47+00:00\&quot;>Jul 14, 2017 at 10:58am PDT</time></p></div></blockquote>"
      caption="ins video"
      credit="ins video"
      embedType="instagram"
      kind="embed"
      inputTemplate="com.polobase.InstagramEmbed"
      contentId="7.4353"
      contentName="ins video"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
