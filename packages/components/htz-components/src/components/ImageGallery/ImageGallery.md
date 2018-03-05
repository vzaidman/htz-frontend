<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [ImageGallery examples](#articleimage-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### ImageGallery examples

```jsx
<div style={{ maxWidth: '700px', }}>
  <ImageGallery
    name="תמונות טבע יפות"
    showTitle="true"
    accessibility="תמונות טבע יפות"
    images={[
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "זאב",
        credit: "אלברטו דנקברג",
        title: "כיתוב תמונה כיתוב תמונה דכחלנ כיתוב תמונה כיתוב תמונה כיתוב תמונה דכחלנ כיתוב תמונה כיתוב תמונה",
        aspects: {
          full: {
          width: 1024,
          height: 768
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/776547798.jpg",
            version: "1520238032"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2224",
        contentName: "זאב"
      },
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "fgh",
        title: "חיידק הקפה נדבק בו בגיל מבוגר יחסית, פאולו פנרו בבוטגה שלו בעיר ברה נדבק בו בגיל מבוגר",
        credit: "קרדיט",
        aspects: {
          full: {
            width: 1024,
              height: 768
          }
        },
        isAnimated: "false",
        imgArray: [
          {
            imgName: "image/3169121816.jpg",
            version: "1519208155"
          },
          {
            imgName: "image/509020086.jpg",
            version: "1519208157"
          }
        ],
        imageType: "infographic",
        inputTemplate: "com.tm.Image",
        contentId: "1.5804",
        contentName: "ghf",
      },
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "טיגריס",
        title: "טיגריס רעב",
        aspects: {
          full: {
            width: 1024,
            height: 768
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/637324720.jpg",
            version: "1520238044"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2223",
        contentName: "טיגריס"
      },
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "חיות מחמד",
        title: "חיות מחמד ביחד",
        aspects: {
          full: {
            width: 1000,
            height: 835
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/3346654085.jpg",
            version: "1520238057"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2222",
        contentName: "חיות מחמד"
      },
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "חתלתול",
        title: "חתלתול חמוד",
        aspects: {
          full: {
            width: 1024,
            height: 768
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/1921618656.jpg",
            version: "1520238075"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2221",
        contentName: "חתלתול"
      },
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "דובי פנדה",
        title: "דובי פנדה נחים",
        aspects: {
          full: {
            width: 1504,
            height: 1001
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/521226401.jpg",
            version: "1520238089"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2220",
        contentName: "דובי פנדה"
      },
      {
        viewMode: "FullColumnWithVerticalImage",
        accessibility: "אריה",
        title: "אריה נח",
        aspects: {
          full: {
            width: 1920,
            height: 1080
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/3668708606.jpg",
            version: "1520238101"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2219",
        contentName: "אריה"
      },
      {
        viewMode: "regularModeBigImage",
        accessibility: "צבאים",
        aspects: {
          full: {
            width: 1280,
            height: 960
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/2233377027.JPG",
            version: "1520238115"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2063",
        contentName: "צבאים"
        },
      {
      viewMode: "regularModeBigImage",
        accessibility: "mhpur hpv",
        credit: "מושיקו הצלם",
        title: "ציפור הנפש",
        aspects: {
          full: {
            width: 800,
            height: 533
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/1410963801.jpg",
            version: "1520238127"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2064",
        contentName: "mhpur hpv"
      },
      {
        viewMode: "regularModeBigImage",
        accessibility: "משפחת דובים",
        title: "דובים בשדה",
        aspects: {
          full: {
            width: 800,
            height: 500
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/786025017.jpg",
            version: "1520238138"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2062",
        contentName: "משפחת דובים"
      },
      {
        viewMode: "regularModeBigImage",
        accessibility: "zebra",
        title: "זברות מפוספסות",
        aspects: {
          full: {
            width: 2309,
            height: 1732
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/2633569833.jpg",
            version: "1520238152"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2061",
        contentName: "zebra"
      },
      {
        viewMode: "regularModeBigImage",
        accessibility: "girls in the forest",
        title: "נערות ביער",
        aspects: {
          full: {
            width: 1920,
            height: 1200
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/2711175065.jpg",
            version: "1520238167"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2060",
        contentName: "girls in the forest"
      },
      {
        viewMode: "regularModeBigImage",
        accessibility: "bench",
        title: "היו היה ספסל בודד",
        aspects: {
          full: {
            width: 1280,
            height: 800
          }
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: "image/3862512969.jpg",
            version: "1520238176"
          }
        ],
        imageType: "image",
        inputTemplate: "com.tm.Image",
        contentId: "1.2059",
        contentName: "bench"
      }
    ]}
    inputTemplate="com.tm.ImageGalleryElement"
    contentId="1.2057"
    contentName="תמונות טבע יפות"
  />
</div>
```
