### The List Side bar component

A reusable component for list sidebars


with marketing teaser
```jsx
<div style={{ direction: 'rtl', height: '70rem' }}>
  <ListViewMeta
    title="תרבות"
    miscStyles={{
      paddingRight: [{ until: 's', value: '1rem' }, { from: 's', until: 'l' }],
    }}
    extraLinks={[
      {
        href: '2.7666',
        toolTip: 'קצרי רוח',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2790808',
        contentName: 'קצרי רוח',
        linkText: 'קצרי רוח',
      },
      {
        href: '2.2490',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2497760',
        contentName: 'טבלת המבקרים',
        linkText: 'קצרי רוח',
      },
      {
        href: '2.470',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2487028',
        contentName: 'אופנה',
        linkText: 'קצרי רוח',
      },
      {
        href: '1.628',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2489096',
        contentName: 'בן שלו',
        linkText: 'קצרי רוח',
      },
      {
        href: '2.8286',
        inputTemplate: 'com.tm.Link',
        contentId: '1.3857559',
        contentName: 'סודוקו',
        linkText: 'קצרי רוח',
      },
    ]}
    marketingTeaser={{
      title: 'כל התכנים בכל מכשיר',
      subtitle: 'הארץ בדיגיטל החל מ-4.90 ₪ בחודש הראשון',
      href: 'https://www.haaretz.co.il/1.2222222222',
      cta: 'לרכישה',
    }}
  />
</div>
```

With a commercial links

```jsx
<div style={{ direction: 'rtl', height: '70rem' }}>
  <ListViewMeta
    title="תרבות"
    miscStyles={{
      paddingRight: [{ until: 's', value: '1rem' }, { from: 's', until: 'l' }],
    }}
    extraLinks={[
      {
        href: '2.7666',
        toolTip: 'קצרי רוח',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2790808',
        contentName: 'קצרי רוח',
        linkText: 'קצרי רוח',
      },
      {
        href: '2.2490',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2497760',
        contentName: 'טבלת המבקרים',
        linkText: 'קצרי רוח',
      },
      {
        href: '2.470',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2487028',
        contentName: 'אופנה',
        linkText: 'קצרי רוח',
      },
      {
        href: '1.628',
        inputTemplate: 'com.tm.Link',
        contentId: '1.2489096',
        contentName: 'בן שלו',
        linkText: 'קצרי רוח',
      },
      {
        href: '2.8286',
        inputTemplate: 'com.tm.Link',
        contentId: '1.3857559',
        contentName: 'סודוקו',
        linkText: 'קצרי רוח',
      },
    ]}
    commercialLinks={[
      {
        contentId: '123331412415235235',
        contentName: 'dsgsdg',
        href: 'https://www.haaretz.co.il/1.1111111111',
        inputTemplate: 'dummy',
        linkText: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
        toolTip: 'afafs',
      },
      {
        contentId: '123sdfg235235',
        contentName: 'dsgsdg',
        href: 'https://www.haaretz.co.il/1.1111111111',
        inputTemplate: 'dummy',
        linkText: 'sdgsdgsdgsdgאטרון אורנה פורת',
        toolTip: 'afafs',
      },
    ]}
  />
</div>
```
