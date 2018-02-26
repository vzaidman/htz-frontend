import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Paragraph from '../Paragraph';

it('An example for a Question paragraph, and a second one who hosts a Marker decoration. ', () => {
  const snapshot = felaSnapshotter(
    <div>
      <Paragraph
        {...{
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
        }}
      />
      <Paragraph
        {...{
          attributes: [],
          tag: 'p',
          content: [
            {
              attributes: [
                {
                  key: 'text',
                  value:
                    'הכל מתחיל בעצם מאיך שהגעתי לישראל מלכתחילה. את בעלי הישראלי פגשתי בצרפת כששנינו למדנו שם, וב-2012 עברתי איתו לארץ בעקבות האהבה. לחברה הגעתי דרך אחד העובדים הוותיקים בחברה שהוא חבר טוב של בעלי (בינתיים ״גנבתי״ אותו והוא חבר טוב גם שלי), והוא הכיר אותי לחברה ',
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
                  value:
                    ' אחרי שנתיים בחברה, ממש לפני שילדתי את בתי הבכורה, קודמתי לתפקיד ראש הצוות שלי. אני בתפקיד כבר שנה, ואוטוטו יוצאת לחופשת לידה כדי ללדת את בני השני. ',
                },
              ],
              tag: '#text',
            },
          ],
        }}
      />
    </div>
  );
  expect(snapshot).toMatchSnapshot();
});
