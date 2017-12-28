import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Paragraph from './Paragraph';

it('Simple Paragraph ', () => {
  const snapshot = felaSnapshotter(
    <Paragraph
      setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
      content={
        {
          attributes: [],
          tag: 'p',
          content: [
            {
              attributes: [
                {
                  key: 'text',
                  value: 'שלושה מחברי הכנסת של המפלגה, עזריה, פולקמן ובן-ארי, השתתפו במוצאי שבת האחרון בהפגנת הימין נגד השחיתות בכיכר ציון בירושלים. כחלון לא מנע מהם להשתתף בה, אך לפי פרסום של ספי עובדיה אמש בערוץ 10 - בישיבת הסיעה אתמול אמר כחלון לחכים: בסוף מתברר שמי שמזיק הכי הרבה למפלגה הם אנשי כולנו. אני מבקש דממת אלחוט. זה לא מוסיף לנו קולות. לא בטוח שתחזרו לכנסת אחרי הבחירות. כחלון הוסיף: אני מבקש שאף אחד לא ידבר בחוץ, לא פייסבוק ולא טוויטר. אנחנו לא מדברים על ההמלצות. חוק ההמלצות יעבור, אני לא מדבר על זה. אני מדבר על ההמלצות שיוגשו נגד ביבי - אני מבקש שלא לעסוק בזה!.',
                },
              ],
              tag: '#text',
            },
          ],
        }
      }
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Headline Paragraph ', () => {
  const snapshot = felaSnapshotter(
    <Paragraph
      setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
      content={
        {
          attributes: [],
          tag: 'h4',
          content: [
            {
              attributes: [
                {
                  key: 'text',
                  value: 'צבא אסד מעמיק את המתקפה לכיבוש כפרי המורדים סמוך לגבול עם ישראל.',
                },
              ],
              tag: '#text',
            },
          ],
        }
      }
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('A Paragraph with bold and nesting ', () => {
  const snapshot = felaSnapshotter(
    <Paragraph
      setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
      content={
        {
          attributes: [],
          tag: 'p',
          content: [
            {
              attributes: [
                {
                  key: 'text',
                  value: 'על פי הערכות בישראל, ',
                },
              ],
              tag: '#text',
            },
            {
              attributes: [],
              tag: 'strong',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'צבא אסד מתכנן לנסות לגרש את המורדים הסונים',
                    },
                  ],
                  tag: '#text',
                },
              ],
            },
            {
              attributes: [
                {
                  key: 'text',
                  value: ' גם ממרכז ודרום רמת הגולן הסורי בגיבוי חיזבאללה והמיליציות. בשנה האחרונה שררה יציבות יחסית באזור. בחלק הצפוני ביותר של הגבול עם ישראל שלט המשטר, שחזר לאייש עמדות בחרמון הסורי ובעיירה קונייטרה החדשה. סמוך לשטח שבשליטתו היו שתי מובלעות: ',
                },
              ],
              tag: '#text',
            },
            {
              attributes: [
                {
                  key: 'href',
                  value: 'https://www.google.com',
                },
              ],
              tag: 'a',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'הכפר חאדר הדרוזי, ',
                    },
                  ],
                  tag: '#text',
                },
                {
                  attributes: [],
                  tag: 'strong',
                  content: [
                    {
                      attributes: [
                        {
                          key: 'text',
                          value: 'שנשלט בידי מיליציה מקומית ששמרה על קשר עם המשטר',
                        },
                      ],
                      tag: '#text',
                    },
                  ],
                },
                {
                  attributes: [
                    {
                      key: 'text',
                      value: ', והשנייה סונית, בכפרים הסמוכים לגבול לבנון.',
                    },
                  ],
                  tag: '#text',
                },
              ],
            },
          ],
        }
      }
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('A Paragraph with italic, underline and link ', () => {
  const snapshot = felaSnapshotter(
    <Paragraph
      setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
      content={
        {
          attributes: [],
          tag: 'p',
          content: [
            {
              attributes: [
                {
                  key: 'text',
                  value: 'זהו תפקידו של הזיכרון האולטימטיבי הזה, וזה גם המחולל שלו, ואת העדות לכך מספק קנאוסגורד בהצהרה כי את אמו, שהוא מכנה ',
                },
              ],
              tag: '#text',
            },
            {
              attributes: [],
              tag: 'u',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'קרקעית הבאר של הילדות',
                    },
                  ],
                  tag: '#text',
                },
              ],
            },
            {
              attributes: [
                {
                  key: 'text',
                  value: ', הנחמה שבביבים של ההשפלה והפחד מהאב, הוא אינו זוכר. היא תמיד היתה שם, הוא מעיד, ',
                },
              ],
              tag: '#text',
            },
            {
              attributes: [],
              tag: 'em',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'אני פשוט לא מצליח לזכור את זה',
                    },
                  ],
                  tag: '#text',
                },
              ],
            },
            {
              attributes: [
                {
                  key: 'text',
                  value: '. כלומר, הזיכרון המושלם שקנאוסגורד מפגין מולנו כבר שלושה כרכים פגום. אבל הוא לא רק פגום, הוא הפגם עצמו. הוא היסוד לכל מה שמושחת, הוא התשוקה לשכוח. המאבק שלי, המאבק של קנאוסגורד, הוא הניסיון לנקז את הנורא מכל שהתגלה במצבור שופע בנפשו במהלך החקירה הזאת. ',
                },
              ],
              tag: '#text',
            },
            {
              attributes: [
                {
                  key: 'href',
                  value: 'https://www.haaretz.co.il/literature/prose/.premium-REVIEW-1.4740317',
                },
                {
                  key: 'target',
                  value: '_blank',
                },
              ],
              tag: 'a',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'קנאוסגורד פולט את הזיכרונות שלו בכפייה',
                    },
                  ],
                  tag: '#text',
                },
              ],
            },
            {
              attributes: [
                {
                  key: 'text',
                  value: ' כדי לא להיות היחיד שנושא בעול הזה: להיות הריאקציה למהפכת השוויון, ריאקציה שחותרת למחנה השמדה.',
                },
              ],
              tag: '#text',
            },
          ],
        }
      }
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('A Paragraph with italic, underline and link ', () => {
  const snapshot = felaSnapshotter(
    <div>
      <Paragraph
        setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
        content={
          {
            attributes: [],
            tag: 'p',
            content: [
              {
                attributes: [
                  {
                    key: 'text',
                    value: '\n ',
                  },
                ],
                tag: '#text',
              },
              {
                attributes: [
                  {
                    key: 'style',
                    value: 'font-weight:700;',
                  },
                ],
                tag: 'question',
                content: [
                  {
                    attributes: [
                      {
                        key: 'text',
                        value: '\n   איך הגעת לתפקיד הנוכחי? \n ',
                      },
                    ],
                    tag: '#text',
                  },
                ],
              },
            ],
          }
        }
      />
      <Paragraph
        setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
        content={
          {
            attributes: [

            ],
            tag: 'p',
            content: [
              {
                attributes: [
                  {
                    key: 'text',
                    value: 'הכל מתחיל בעצם מאיך שהגעתי לישראל מלכתחילה. את בעלי הישראלי פגשתי בצרפת כששנינו למדנו שם, וב-2012 עברתי איתו לארץ בעקבות האהבה. לחברה הגעתי דרך אחד העובדים הוותיקים בחברה שהוא חבר טוב של בעלי (בינתיים ״גנבתי״ אותו והוא חבר טוב גם שלי), והוא הכיר אותי לחברה ',
                  },
                ],
                tag: '#text',
              },
              {
                attributes: [
                  {
                    key: 'class',
                    value: 'bg-brand--d',
                  },
                ],
                tag: 'span',
                content: [
                  {
                    attributes: [
                      {
                        key: 'text',
                        value: 'לפני קצת יותר משלוש שנים.',
                      },
                    ],
                    tag: '#text',
                  },
                ],
              },
              {
                attributes: [
                  {
                    key: 'text',
                    value: ' אחרי שנתיים בחברה, ממש לפני שילדתי את בתי הבכורה, קודמתי לתפקיד ראש הצוות שלי. אני בתפקיד כבר שנה, ואוטוטו יוצאת לחופשת לידה כדי ללדת את בני השני. ',
                  },
                ],
                tag: '#text',
              },
            ],
          }
        }
      />
    </div>
  );
  expect(snapshot).toMatchSnapshot();
});
