<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [A CommentList component](#a-commentlist-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### A CommentList component

A Comment List, with comments, subComments, editorsPick and votes
```jsx

<CommentList
  comments={[
      {
        author: 'אורי ויסלר',
        title: 'התמונה בכתבה היא בסבירות גבוהה לא מבאבי יאר',
        commentText: '',
        publishingDateForDisplay: '08:57',
        commentId: '19.9522183',
        reviewState: 'nr',
        isEditorPick: 'true',
      },
      {
        subComments: [
          {
            author: 'רן',
            title: '@הורנר@',
            commentText: 'לגרמניה יש אובססיה להציג את ישראל של היום כגרמניה הנאצית והם לא חוסכים באמצעים. יש הרבה מאוד אנשים שמתפרנסים משיתוף הפעולה. הסיבה לאובססיה היא לא אנטישמיות קלסית זה אינטרס גרמני ברור',
            publishingDateForDisplay: '09:36',
            commentId: '19.9522362',
            reviewState: 'nr',
            isEditorPick: 'false',
          },
          {
            author: 'רן',
            title: '@הורנר@',
            commentText: 'testing',
            publishingDateForDisplay: '09:36',
            commentId: '19.9522999',
            reviewState: 'nr',
            isEditorPick: 'false',
          },
        ],
        author: 'הורנר',
        title: 'אין בזה חדש - גרמניה לא עשתה דין עם הנאצים',
        commentText: 'גרמניה חינכה נגד השואה , בנתה אנדרטה ושילמה פיצויים . עד כאן ! היא מעולם (תחת כל ההנהגות ) לא עשתה דין ולא אסרה את הפושעים הנאצים . זכור לי ביקור של איזה פרופסור גרמני מהידלברג שמשה צימרמן הביא לאוניברסיטה להרצות לנו .. וורוד הלחיים הזה עומד מולי (ישבתי שורה ראשונה) ומבלבל לי את המוח כל כמה גרמניה אחרת ומה נעשה וטופח למדינתו על השכם ... טוב נו , באתי מוכן עם טבלת אקסל . שם / דרגה / תיאור מעלליו בשואה / עיסוקו וקורותיו ב״גרמניה האחרת״ . צימרמן ניסה להשתיק אותי אחרי השם הראשון אבל אני לא מהמושתקים ...זה לא סיפור חדש , גרמניה מגנה והגנה לכל אורך הדרך על הנאצים שלה . היא לא חשבה שיש להעניש אותם . גם כל סמולן טוב חושב שזה בסדר אכה ושדין מריך לכשות רק עם יהודים שלא מבצעים נוהל מעצר חשוד ... זה למה אני שונא בדם : 1. גרמנים . 2. סמולנים . זה למה אני אומר : יחי האביב הערבי !!! צדק קוסמי !!!',
        publishingDateForDisplay: '07:18',
        commentId: '19.9521831',
        reviewState: 'nr',
        isEditorPick: 'false',
      },
      {
        author: 'נצח יהודה?',
        title: 'וטובחי הנערים בכביש 443?',
        commentText: 'נצחיות היודונציזם',
        publishingDateForDisplay: '06:59',
        commentId: '19.9521786',
        reviewState: 'nr',
        isEditorPick: 'false',
      }
    ]}

    commentsPlusRate= {{
      '19.9522362': 1,
      '19.9521831': 4,
      '19.9521786': 1,
      '19.9522183': 1
    }}

    commentsMinusRate= {{
      '19.9522362': 1,
      '19.9521831': 3,
      '19.9521786': 5
    }}


      />

```
