### Hebrew header

The ArticleHeader component composes key information
about the article, including its kiker, title, subtitle
as well as some meta data about the article.

```jsx
<Grid
  miscStyles={{
    marginRight: [{ from: 'l', value: '26rem' }],
    marginLeft: [{ from: 'l', value: '26rem' }],
  }}
  attrs={{ dir: 'rtl' }}>
  <GridItem>
    <ArticleHeader
      kicker="פרשנות"
      title="ישראל שומרת על ריסון בעזה ומאמצת גישה תקיפה בגבול הצפון"
      subtitle="ההודעה הישראלית על החזרת אספקת החשמל לעזה היא חלק מהצורך לנהל כמה משברים במקביל. קשה לראות את וושינגטון מתערבת כדי להגביל מהלכים ישראלים בצפון, אם נתניהו יחליט שאלה פעולות נדרשות"
      publishDateTime={new Date(2018, 0, 23, 16, 0, 0)}
      authors={[
        {
          image: {
            viewMode: 'FullColumnWithVerticalImage',
            accessibility: 'ren & stimpy',
            aspects: {
              regular: {
                x: 19,
                y: 94,
                width: 545,
                height: 409,
              },
              full: {
                width: 600,
                height: 600,
              },
              headline: {
                x: 0,
                y: 174,
                width: 600,
                height: 348,
              },
              belgrade: {
                x: 0,
                y: 212,
                width: 600,
                height: 189,
              },
              landscape: {
                x: 0,
                y: 188,
                width: 600,
                height: 260,
              },
              square: {
                x: 0,
                y: 170,
                width: 360,
                height: 360,
              },
              vertical: {
                x: 0,
                y: 167,
                width: 305,
                height: 358,
              },
            },
            isAnimated: false,
            imgArray: [
              {
                imgName: 'image/1536361643.png',
                version: '1519832762',
              },
            ],
            imageType: 'image',
            inputTemplate: 'com.tm.Image',
            contentId: '1.6738',
            contentName: 'ren & stimpy',
          },
          inputTemplate: 'com.tm.Author',
          contentId: '1.1925',
          contentName: 'אורנה פילץ ',
        },
        {
          image: {
            viewMode: 'FullColumnWithVerticalImage',
            accessibility: 'ren & stimpy',
            aspects: {
              regular: {
                x: 19,
                y: 94,
                width: 545,
                height: 409,
              },
              full: {
                width: 600,
                height: 600,
              },
              headline: {
                x: 0,
                y: 174,
                width: 600,
                height: 348,
              },
              belgrade: {
                x: 0,
                y: 212,
                width: 600,
                height: 189,
              },
              landscape: {
                x: 0,
                y: 188,
                width: 600,
                height: 260,
              },
              square: {
                x: 0,
                y: 170,
                width: 360,
                height: 360,
              },
              vertical: {
                x: 0,
                y: 167,
                width: 305,
                height: 358,
              },
            },
            isAnimated: false,
            imgArray: [
              {
                imgName: 'image/1536361643.png',
                version: '1519832762',
              },
            ],
            imageType: 'image',
            inputTemplate: 'com.tm.Image',
            contentId: '1.6738',
            contentName: 'ren & stimpy',
          },
          inputTemplate: 'com.tm.Author',
          contentId: '1.1967',
          contentName: 'שהם סמיט',
        },
        {
          name: 'מישהו',
        },
      ]}
    />
  </GridItem>
</Grid>
```
