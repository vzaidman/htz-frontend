
```jsx
<div dir="rtl">
  <MarketingNotificationInner
    notificationType="Strip"
    buttonText="לרכישה"
    buttonUrl="https://promotions.haaretz.co.il/promotions-page/product"
    text1="לקרוא ללא הגבלה, רק עם מינוי דיגיטלי של הארץ"
    closeButton={false}
  />
</div>
```

```jsx
<div
  dir="rtl"
  style={{ width: '800px', height: '700px', position: 'relative' }}>
  <MarketingNotificationInner
    notificationType="Popup"
    buttonText="לרכישה"
    buttonUrl="https://promotions.haaretz.co.il/promotions-page/product"
    Icon="IconHourglass"
    text1="זה לא תור עם שיננית"
    text2="רק רצינו להזכיר לך שהינוי שלך לאתר הארץ יסתיים בעוד 4 ימים"
  />
  <div id="modalRoot" /> {/* mandatory to set this div dialog will be shown in a parent div */}
</div>
```

```jsx
<div
  dir="rtl"
  style={{ width: '800px', height: '700px', position: 'relative' }}>
  <MarketingNotificationInner
    notificationType="Popup"
    buttonText="לרכישה"
    buttonUrl="https://promotions.haaretz.co.il/promotions-page/product"
    Icon="IconHourglassRunningOut"
    text1="במקום שתבכה אחרי זה"
    text2="אנחנו מעניקים לך עכשיו הנחה בחידוש המינוי"
  />
  <div id="modalRoot" /> {/* mandatory to set this div dialog will be shown in a parent div */}
</div>
```

```jsx
<div dir="rtl" style={{ width: '100%', height: '700px', position: 'relative' }}>
  <MarketingNotificationInner
    notificationType="Popup2"
    buttonText="לרכישה"
    buttonUrl="https://promotions.haaretz.co.il/promotions-page/product"
    text1="עוד לא מאוחר מידי לחזור לקרוא הארץ ללא הגבלה"
    text2="רכשו מינוי עכשיו וחסכו 30%"
  />
  <div id="modalRoot" /> {/* mandatory to set this div dialog will be shown in a parent div */}
</div>
```

```jsx
<div dir="rtl" style={{ width: '100%', height: '100vh', position: 'relative' }}>
  <MarketingNotificationInner
    notificationType="Weekly"
    buttonText="לפרטים נוספים"
    buttonUrl="https://promotions.haaretz.co.il/promotions-page/product"
    text1="כל תכני הארץ בכל מכשיר בכל זמן"
    text2="פחות פרסומות ובאנרים"
  />
  <div id="modalRoot" />
</div>
```

```jsx
<div dir="rtl" style={{ width: '100%', height: '100vh', position: 'relative' }}>
  
      <MarketingNotificationInner
        notificationType="EmailConfirmation"
        buttonUrl="https://promotions.haaretz.co.il/promotions-page/product"
        buttonText="לחצו כאן"
        text1="זה באמת אתם?"
        text2="כדי לקרוא בחינם 6 כתבות בחודש יש לבצע אימות"
        Icon="Astronaut"
      />  
  <div id="modalRoot" />
</div>
```