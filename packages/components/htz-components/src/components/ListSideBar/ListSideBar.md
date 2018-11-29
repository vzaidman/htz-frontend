### The List Side bar component

A reusable component for list sidebars

```jsx
<div style={{ direction: 'rtl', height: '70rem' }}>
  <ListSideBar
    title="תרבות"
    miscStyles={{ paddingRight: [{ until: 's', value: '1rem' }, {from: 's', until: 'l', }] }}
    extraLinks={[
      {
        href: '2.7666',
        toolTip: 'קצרי רוח',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2790808',
        contentName: 'קצרי רוח',
      },
      {
        href: '2.2490',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2497760',
        contentName: 'טבלת המבקרים',
      },
      {
        href: '2.470',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2487028',
        contentName: 'אופנה',
      },
      {
        href: '1.628',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2489096',
        contentName: 'בן שלו',
      },
      {
        href: '2.8286',
        inputTemplate: 'com.tm.Link',
        contentId: '1.3857559',
        contentName: 'סודוקו',
      },
    ]}
    commercialLink={{
      text: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
      href: 'https://www.haaretz.co.il/1.1111111111',
      contentId: '1.1111111111',
    }}
    marketingTool={{
      title: 'כל התכנים בכל מכשיר',
      subTitle: 'הארץ בדיגיטל החל מ-4.90 ₪ בחודש הראשון',
      href: 'https://www.haaretz.co.il/1.2222222222',
      buttonText: 'לרכישה',
    }}
  />
</div>
```
