import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Paragraph from '../Paragraph';

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
