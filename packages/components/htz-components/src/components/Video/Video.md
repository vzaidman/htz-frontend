<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Youtube video<a name="youtube-video"></a>](#youtube-videoa-nameyoutube-videoa)
- [Youtube playlist<a name="youtube-playlist"></a>](#youtube-playlista-nameyoutube-playlista)
- [Video embed<a name="video-embed"></a>](#video-embeda-namevideo-embeda)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Youtube video<a name="youtube-video"></a>

```jsx
<div style={{ maxWidth: '700px', direction: 'rtl' }}>
  <Video
    videoType="videoId"
    videoContent="3SzXM019pbs"
    credit="old video"
    title="old video"
    inputTemplate="com.tm.Video"
  />
</div>
```

### Youtube playlist<a name="youtube-playlist"></a>

```jsx
<div style={{ maxWidth: '700px', direction: 'rtl' }}>
  <Video
    videoType="videoId"
    videoContent="pe7driNrW9k?list=PLJzja_wfYCI3pO9p6FGujWTWVeYz5Q_Dw&t=1"
    credit="you tube"
    inputTemplate="com.tm.Video"
  />
</div>
```

### Video embed<a name="video-embed"></a>

```jsx
<div style={{ maxWidth: '700px', direction: 'rtl' }}>
  <Video
    videoType="embed"
    videoContent={
      '<iframe frameborder="0" width="480" height="270" src="//www.dailymotion.com/embed/video/x3hlqq9" allowfullscreen="" allow="autoplay"></iframe>'
    }
    inputTemplate="com.tm.Video"
  />
</div>
```
