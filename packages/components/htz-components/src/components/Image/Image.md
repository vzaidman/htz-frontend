<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Features](#features)
  - [**Basic use**](#basic-use)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A component for rendering responsive images with
built-in support for lazy-loading

### Features

- Img/source tag wrapped with responsive and styled div.
- Can render any type of image.
- Gif type will transform to webp type (for performance issues) and will be placed in a source tag.
- Comes handy when dealing with 1 image data or same image option aspects (e.g: not intended to treat info-graphic image)

#### **Basic use**

```jsx
<Image
  // hasWrapper={false}
  data={{
    isAnimatedGif: false,
    imgArray: [
      {
        imgName: "image/2092337187.jpg",
        version: "1516524320",
        aspects: {
          full: { width: "1680", height: "1260", x: "0", y: "0" }
        }
      }
    ],
    credit: "this is title/credit",
    alt: "this alt from data",
    contentId: "1.5748461"
  }}
  imgOptions={{
    transforms: { width: "1200", aspect: "square" }
  }}
  bgcolor={"black"}
  lazyLoad={"600px"}
/>
```

```jsx
<div>
  <Image
    data={{
      isAnimatedGif: false,
      imgArray: [
        {
          imgName: "image/922278056.jpg",
          version: "1514197183",
          aspects: {
            landscape: { width: "2220", height: "800", x: "10", y: "0" },
            full: { width: "500", height: "400", x: "0", y: "0" }
          }
        }
      ],
      credit: "this is title/credit",
      caption: "this caption from data",
      alt: "this alt from data",
      contentId: "1.4921360"
    }}
    imgOptions={{
      sizes: "(min-width:1420px) 610px,(min-width:1320px) 500px, 280px",
      transforms: [
        {
          width: "145",
          height: "100",
          aspect: "landscape",
          quality: "auto:best"
        },
        { width: "245", height: "159", aspect: "landscape" },
        { width: "445", aspect: "landscape" }
      ]
    }}
    lazyLoad={"500px"}
    isPresentational
    bgcolor={"black"}
  />
</div>
```

```jsx
<div>
  <Image
    data={{
      isAnimatedGif: true,
      imgArray: [
        {
          imgName: "image/4030303706.gif",
          version: "1515097953",
          aspects: {
            landscape: { width: "394", height: "200", x: "33", y: "0" },
            full: { width: "400", height: "400", x: "0", y: "0" }
          }
        }
      ],
      credit: "this is title/credit",
      caption: "this caption from data",
      alt: "this alt from data",
      aspects: {
        landscape: { width: "394", height: "200", x: "33", y: "0" },
        full: { width: "400", height: "400", x: "0", y: "0" }
      },
      contentId: "1.5599867"
    }}
    imgOptions={{
      sizes: "(min-width:1420px) 610px,(min-width:1320px) 500px, 280px",
      transforms: [
        {
          width: "145",
          height: "100",
          aspect: "landscape",
          quality: "auto:best"
        },
        { width: "245", height: "159", aspect: "landscape" },
        { width: "445", aspect: "landscape" }
      ]
    }}
    lazyLoad={"900px"}
    attr={{ "aria-hidden": true, role: "group" }}
  />
</div>
```

```jsx
<div>
  <Image
    data={{
      isAnimatedGif: false,
      imgArray: [
        {
          imgName: "image/918473823.jpg",
          version: "1516894981",
          aspects: {
            regular: { width: "2069", height: "1551", x: "59", y: "4" },
            landscape: { width: "2174", height: "1263", x: "0", y: "107" }
          }
        }
      ],
      credit: "טראמפ ונתניהו בדאבוס, היום - צילום: CARLOS BARRIA/רויטרס",
      alt: "טראמפ ונתניהו בדאבוס, היום",
      contentId: "1.5766455"
    }}
    imgOptions={{
      transforms: [
        {
          width: "565",
          height: "320",
          aspect: "landscape",
          quality: "auto"
        },
        {
          width: "1040",
          height: "550",
          aspect: "landscape",
          quality: "auto:best"
        }
      ]
    }}
    lazyLoad={"900px"}
  />
</div>
```
