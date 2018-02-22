<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [ArticleBody examples](#articlebody-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### ArticleBody examples


```jsx
<div style={{ maxWidth: '700px', }}>
  <ArticleImage 
    alt="alternative text"
    viewMode="TwoThirdView"
    accessibility="fgh"
    title="this is the image text"
    aspects={{
      full: {
        width: 1024,
          height: 768
      }
    }}
    isAnimated="false"
    imgArray={[
      {
        imgName: "image/3169121816.jpg",
        version: "1519208155"
      },
      {
        imgName: "image/509020086.jpg",
        version: "1519208157"
      }
    ]}
    imageType="infographic"
    inputTemplate="com.tm.Image"
    contentId="1.5804"
    contentName="ghf"
  />
</div>
```
```jsx
<div style={{ maxWidth: '700px', }}>
  <ArticleImage 
    alt="alternative text"
    viewMode="regularModeBigImage"
    accessibility="cat"
    credit="me"
    title="this is the image text"
    aspects={{
      regular: {
        x: 3,
          y: 4,
          width: 388,
          height: 291
      },
      full: {
        width: 400,
          height: 332
      },
      headline: {
        x: 0,
          y: 32,
          width: 399,
          height: 233
      },
      square: {
        x: 33,
          y: 7,
          width: 318,
          height: 318
      }
    }}
    isAnimated="false"
    imgArray={[
      {
        imgName: "image/4030303706.gif",
        version: "1519208144"
      }
    ]}
    imageType="image"
    inputTemplate="com.tm.Image"
    contentId="1.6651"
    contentName="cat"
  />
</div>
```
