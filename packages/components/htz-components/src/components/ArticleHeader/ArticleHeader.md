### Hebrew header

The ArticleHeader component composes key information 
about the article, including its kiker, title, subtitle
as well as some meta data about the article.

```jsx 
<Grid 
  miscStyles={{
    marginRight: [{ from: 'l', value: '26rem', }],
    marginLeft: [{ from: 'l', value: '26rem', }],  
  }}
  attrs={{ dir: 'rtl', }}
>
  <GridItem>
    <ArticleHeader 
      kicker="פרשנות"
      title="ישראל שומרת על ריסון בעזה ומאמצת גישה תקיפה בגבול הצפון"
      subtitle="ההודעה הישראלית על החזרת אספקת החשמל לעזה היא חלק מהצורך לנהל כמה משברים במקביל. קשה לראות את וושינגטון מתערבת כדי להגביל מהלכים ישראלים בצפון, אם נתניהו יחליט שאלה פעולות נדרשות"
      publishDateTime={new Date(2018, 0, 23, 16, 0, 0)}
      author={{
        name: 'אורי משגב',
        url: 'https://www.themarker.com/misc/writers/1.3003137',
        email: 'urim@haaretz.com',
        image: 'http://www.beraleberale.co.il/media/k2/items/cache/007f7dcc1de776ae0fbd86ceae8656ad_L.jpg'
    }}/>
  </GridItem>
</Grid>
```
