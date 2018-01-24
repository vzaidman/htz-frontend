`<CommentList />` is responsible for displaying a list of `<Comment />`'s, that may have.

It can be the main `<Comment />`'s list or a `subComments` list.

The `<Comment />` is responsible for indicating to the `<CommentList />` that it is a `subComment` list.

**A Comment List, with comments, subComments, editorsPick and votes**

```jsx
<div dir="rtl">
  <CommentList
    initVote={(commentId, rate) =>
      console.log(`initVote from MD commentId: ${commentId} rate: ${rate}`)
    }
    reportAbuse={commentId =>
      console.log(`report abuse from MD comment Id: ${commentId}`)
    }
    initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
      console.log(
        `init Comment from CommentList.md commentAuthor: ${commentAuthor}, commentHtml: ${commentHtml} parentCommentId: ${parentCommentId}`
      )
    }
    signUpNotification={email =>
      console.log(
        `sign up comment notifications from CommentList.md email: ${email}`
      )
    }
    comments={[
      {
        author:
          "אורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלר",
        title: "התמונה בכתבה היא בסבירות גבוהה לא מבאבי יאר",
        commentText:
          "long text sdmgalkgmlaskgmaslkg lsdlk jasldk lsdkj lksajg lskdgjaslkdgjmlaskgjmlasdkgjmslkdgmsldk sdlkmg slakgmsdgasdgb;l,sad;lgb,s;adb,b fl;,b ;dflb,df;lb, dsdfagkjerngkjawn vkrj vkrejv erkjv krejgv krj vkrwej vkrjv kjrv krjv erkj vrej  v",
        publishingDateForDisplay: "08:57",
        commentId: "19.9522183",
        reviewState: "nr",
        isEditorPick: "true",
        publishingDateSortable: "20171119002030"
      },
      {
        subComments: [
          {
            author: "רן",
            title: "@הורנר@",
            commentText:
              "לגרמניה יש אובססיה להציג את ישראל של היום כגרמניה הנאצית והם לא חוסכים באמצעים. יש הרבה מאוד אנשים שמתפdfgdfsgsdfgגכדעגכעדגכעגדכעדגכעדגכעגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים מגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתוגדכעדגכעגדכעדגכעגדכעדגכעגדכעדגעדגערנסים משיתושיתוף הפעולה. הסיבה לאובססיה היא לא אנטישמיות קלסית זה אינטרס גרמני ברור",
            publishingDateForDisplay: "09:36",
            commentId: "19.9522362",
            reviewState: "nr",
            isEditorPick: "false",
            publishingDateSortable: "20171119002050"
          },
          {
            author: "רן",
            title: "@הורנר@",
            commentText: "testing",
            publishingDateForDisplay: "09:36",
            commentId: "19.9522999",
            reviewState: "nr",
            isEditorPick: "false",
            publishingDateSortable: "20171119002070"
          }
        ],
        author: "הורנר",
        title: "אין בזה חדש - גרמניה לא עשתה דין עם הנאצים",
        commentText:
          "גרמניה חינכה נגד השואה , בנתה אנדרטה ושילמה פיצויים . עד כאן ! היא מעולם (תחת כל ההנהגות ) לא עשתה דין ולא אסרה את הפושעים הנאצים . זכור לי ביקור של איזה פרופסור גרמני מהידלברג שמשה צימרמן הביא לאוניברסיטה להרצות לנו .. וורוד הלחיים הזה עומד מולי (ישבתי שורה ראשונה) ומבלבל לי את המוח כל כמה גרמניה אחרת ומה נעשה וטופח למדינתו על השכם ... טוב נו , באתי מוכן עם טבלת אקסל . שם / דרגה / תיאור מעלליו בשואה / עיסוקו וקורותיו ב״גרמניה האחרת״ . צימרמן ניסה להשתיק אותי אחרי השם הראשון אבל אני לא מהמושתקים ...זה לא סיפור חדש , גרמניה מגנה והגנה לכל אורך הדרך על הנאצים שלה . היא לא חשבה שיש להעניש אותם . גם כל סמולן טוב חושב שזה בסדר אכה ושדין מריך לכשות רק עם יהודים שלא מבצעים נוהל מעצר חשוד ... זה למה אני שונא בדם : 1. גרמנים . 2. סמולנים . זה למה אני אומר : יחי האביב הערבי !!! צדק קוסמי !!!",
        publishingDateForDisplay: "07:18",
        commentId: "19.9521831",
        reviewState: "nr",
        isEditorPick: "false",
        publishingDateSortable: "20171119002080"
      },
      {
        author: "נצח יהודה?",
        title: "וטובחי הנערים בכביש 443?",
        commentText: "נצחיות היודונציזם",
        publishingDateForDisplay: "06:59",
        commentId: "19.9521786",
        reviewState: "nr",
        isEditorPick: "false",
        publishingDateSortable: "20171119002090"
      }
    ]}
    commentsPlusRate={{
      "19.9522362": 0,
      "19.9521831": 4,
      "19.9521786": 11,
      "19.9522183": 122
    }}
    commentsMinusRate={{
      "19.9522362": 1,
      "19.9521831": 3,
      "19.9521786": 5
    }}
    totalHits={3}
  />
</div>
```
