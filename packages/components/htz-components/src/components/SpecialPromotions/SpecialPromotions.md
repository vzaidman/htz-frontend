### Special promotions

Special promotions element meant to receive an auther/article promotion data and display it in the new promotions style and behavior .

```jsx
<div dir="rtl">
  <SpecialPromotions
    data={{
      title: 'מרוני בר-און ועד נוני מוזס: כל פרשות נתניהו',
      url: 'https://www.haaretz.co.il/news/politics/.premium-1.6014424',
      urlText: 'לכתבה',
    }}
    miscStyles={{ maxWidth: '80rem' }}
  />
</div>
```

### **Variant**

SpecialPromotion's variant is set using the `variant` prop, which defaults to 'primary'.
Each variant sets:

* Base `<SpecialPromotions />` background color.
* button's text and border and background color of a button.
* icon's fill color and render dynamic icon component.

```jsx
<div dir="rtl">
  <SpecialPromotions
    data={{
      title: 'החלום האמריקאי על בית מחזיר את הרעל לשווקים',
      url: 'https://www.themarker.com/wallstreet/1.6026381',
      urlText: 'לכתבה',
    }}
    miscStyles={{ maxWidth: '80rem' }}
    variant="primaryInverse"
  />
</div>
```
