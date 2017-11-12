import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import CommentList from './CommentList';

test('should correctly render a empty CommentList without any props', () => {
  const snapshot = felaSnapshotter(<CommentList />);
  expect(snapshot).toMatchSnapshot();
});
test('should correctly render a CommentList with 2 simple comments(no sub-comments and likes)', () => {
  const snapshot = felaSnapshotter(
    <CommentList
      comments={[
        {
          author: 'אורי ויסלר',
          articleId: '1.4476373',
          parentCommentId: '0',
          relatedComments: null,
          title: 'התמונה בכתבה היא בסבירות גבוהה לא מבאבי יאר',
          commentText: 'dsavsvas',
          publishingDateForDisplay: '08:57',
          commentId: '19.9522183',
          reviewState: 'nr',
          isEditorPick: 'false',
        },
        {
          author: 'שגכלעצגכ',
          articleId: '1.4476373',
          parentCommentId: '0',
          title: 'השדגעשדגעשר',
          commentText: 'ragbrgbarb',
          publishingDateForDisplay: '08:57',
          commentId: '19.9522183',
          reviewState: 'nr',
          isEditorPick: 'false',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});

test('should correctly render a CommentList with 2 comments with sub-comments', () => {
  const snapshot = felaSnapshotter(
    <CommentList
      comments={[
        {
          author: 'אורי ויסלר',
          title: 'התמונה בכתבה היא בסבירות גבוהה לא מבאבי יאר',
          commentText: '',
          publishingDateForDisplay: '08:57',
          commentId: '19.9522183',
          reviewState: 'nr',
          isEditorPick: 'false',
        },
        {
          subComments: [
            {
              author: 'רן',
              title: '@הורנר@',
              commentText:
                'לגרמניה יש אובססיה להציג את ישראל של היום כגרמניה הנאצית והם לא חוסכים באמצעים. יש הרבה מאוד אנשים שמתפרנסים משיתוף הפעולה. הסיבה לאובססיה היא לא אנטישמיות קלסית זה אינטרס גרמני ברור',
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
          commentText:
            'גרמניה חינכה נגד השואה , בנתה אנדרטה ושילמה פיצויים . עד כאן ! היא מעולם (תחת כל ההנהגות ) לא עשתה דין ולא אסרה את הפושעים הנאצים . זכור לי ביקור של איזה פרופסור גרמני מהידלברג שמשה צימרמן הביא לאוניברסיטה להרצות לנו .. וורוד הלחיים הזה עומד מולי (ישבתי שורה ראשונה) ומבלבל לי את המוח כל כמה גרמניה אחרת ומה נעשה וטופח למדינתו על השכם ... טוב נו , באתי מוכן עם טבלת אקסל . שם / דרגה / תיאור מעלליו בשואה / עיסוקו וקורותיו ב״גרמניה האחרת״ . צימרמן ניסה להשתיק אותי אחרי השם הראשון אבל אני לא מהמושתקים ...זה לא סיפור חדש , גרמניה מגנה והגנה לכל אורך הדרך על הנאצים שלה . היא לא חשבה שיש להעניש אותם . גם כל סמולן טוב חושב שזה בסדר אכה ושדין מריך לכשות רק עם יהודים שלא מבצעים נוהל מעצר חשוד ... זה למה אני שונא בדם : 1. גרמנים . 2. סמולנים . זה למה אני אומר : יחי האביב הערבי !!! צדק קוסמי !!!',
          publishingDateForDisplay: '07:18',
          commentId: '19.9521831',
          reviewState: 'nr',
          isEditorPick: 'false',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});

test('should correctly render relavent style if EditorPick is true , or normal style if false', () => {
  const snapshot = felaSnapshotter(
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
              commentText:
                'לגרמניה יש אובססיה להציג את ישראל של היום כגרמניה הנאצית והם לא חוסכים באמצעים. יש הרבה מאוד אנשים שמתפרנסים משיתוף הפעולה. הסיבה לאובססיה היא לא אנטישמיות קלסית זה אינטרס גרמני ברור',
              publishingDateForDisplay: '09:36',
              commentId: '19.9522362',
              reviewState: 'nr',
              isEditorPick: 'true',
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
          commentText:
            'גרמניה חינכה נגד השואה , בנתה אנדרטה ושילמה פיצויים . עד כאן ! היא מעולם (תחת כל ההנהגות ) לא עשתה דין ולא אסרה את הפושעים הנאצים . זכור לי ביקור של איזה פרופסור גרמני מהידלברג שמשה צימרמן הביא לאוניברסיטה להרצות לנו .. וורוד הלחיים הזה עומד מולי (ישבתי שורה ראשונה) ומבלבל לי את המוח כל כמה גרמניה אחרת ומה נעשה וטופח למדינתו על השכם ... טוב נו , באתי מוכן עם טבלת אקסל . שם / דרגה / תיאור מעלליו בשואה / עיסוקו וקורותיו ב״גרמניה האחרת״ . צימרמן ניסה להשתיק אותי אחרי השם הראשון אבל אני לא מהמושתקים ...זה לא סיפור חדש , גרמניה מגנה והגנה לכל אורך הדרך על הנאצים שלה . היא לא חשבה שיש להעניש אותם . גם כל סמולן טוב חושב שזה בסדר אכה ושדין מריך לכשות רק עם יהודים שלא מבצעים נוהל מעצר חשוד ... זה למה אני שונא בדם : 1. גרמנים . 2. סמולנים . זה למה אני אומר : יחי האביב הערבי !!! צדק קוסמי !!!',
          publishingDateForDisplay: '07:18',
          commentId: '19.9521831',
          reviewState: 'nr',
          isEditorPick: 'false',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});

test('should correctly render CommentList with correct like count for each comment', () => {
  const snapshot = felaSnapshotter(
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
              commentText:
                'לגרמניה יש אובססיה להציג את ישראל של היום כגרמניה הנאצית והם לא חוסכים באמצעים. יש הרבה מאוד אנשים שמתפרנסים משיתוף הפעולה. הסיבה לאובססיה היא לא אנטישמיות קלסית זה אינטרס גרמני ברור',
              publishingDateForDisplay: '09:36',
              commentId: '19.9522362',
              reviewState: 'nr',
              isEditorPick: 'true',
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
          commentText:
            'גרמניה חינכה נגד השואה , בנתה אנדרטה ושילמה פיצויים . עד כאן ! היא מעולם (תחת כל ההנהגות ) לא עשתה דין ולא אסרה את הפושעים הנאצים . זכור לי ביקור של איזה פרופסור גרמני מהידלברג שמשה צימרמן הביא לאוניברסיטה להרצות לנו .. וורוד הלחיים הזה עומד מולי (ישבתי שורה ראשונה) ומבלבל לי את המוח כל כמה גרמניה אחרת ומה נעשה וטופח למדינתו על השכם ... טוב נו , באתי מוכן עם טבלת אקסל . שם / דרגה / תיאור מעלליו בשואה / עיסוקו וקורותיו ב״גרמניה האחרת״ . צימרמן ניסה להשתיק אותי אחרי השם הראשון אבל אני לא מהמושתקים ...זה לא סיפור חדש , גרמניה מגנה והגנה לכל אורך הדרך על הנאצים שלה . היא לא חשבה שיש להעניש אותם . גם כל סמולן טוב חושב שזה בסדר אכה ושדין מריך לכשות רק עם יהודים שלא מבצעים נוהל מעצר חשוד ... זה למה אני שונא בדם : 1. גרמנים . 2. סמולנים . זה למה אני אומר : יחי האביב הערבי !!! צדק קוסמי !!!',
          publishingDateForDisplay: '07:18',
          commentId: '19.9521831',
          reviewState: 'nr',
          isEditorPick: 'false',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
