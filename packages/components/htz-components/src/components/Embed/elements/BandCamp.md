<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [BandCamp component](#bandcamp-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### BandCamp component

An example for BandCamp Album.

```jsx static
<BandCamp
  embedType = 'album'
  settings = {{
    tracklist: 'false',
    artworkSize: 'large',
    album: '3087453349',
    linkcol: '0687f5',
    link: `
      <a href="http://kidsinsane.bandcamp.com/album/cluster">
        Cluster by Kids Insane
      </a>`,
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
  caption = 'Kids Insane'
  credit = 'BandCamp'
/>
```
