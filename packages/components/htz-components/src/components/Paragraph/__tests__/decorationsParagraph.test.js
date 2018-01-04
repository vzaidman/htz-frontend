import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Paragraph from '../Paragraph';

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
