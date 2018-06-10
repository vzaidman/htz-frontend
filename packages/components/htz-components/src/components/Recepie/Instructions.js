import React from 'react';
// import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Paragraph from '../Paragraph/Paragraph';

const propTypes = {};
const defaultProps = {};

const instructionList = [
  {
    richText: {
      attributes: [],
      tag: 'p',
      content: [
        {
          attributes: [
            {
              key: 'text',
              value:
                'ראשי שראאש לתח שילחידשלח יכשדלחכ ישדלכח ישלחדכי לשחדיכ לחיכשל',
            },
          ],
          tag: '#text',
        },
      ],
    },
  },
  {
    header: 'לבצק',
    richText: {
      attributes: [],
      tag: 'p',
      content: [
        {
          attributes: [
            {
              key: 'text',
              value:
                'בדיקות מכונה חדיקות מכוהוה חדשהבדיקוות מכונה לבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצקלבצק מכונה חדשה',
            },
          ],
          tag: '#text',
        },
      ],
    },
  },
];
function Instructions() {
  return (
    <FelaComponent
      render={({ theme, }) => (
        <div>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '2rem',
              maxWidth: '41rem',
              extend: [
                theme.type('2'),
                borderBottom('2px', 1, 'solid', theme.color('primary')),
              ],
            }}
            render="h3"
          >
            הוראות הכנה
          </FelaComponent>
          <div>
            {instructionList.map(instructions => (
              <div>
                {instructions.header && (
                  <FelaComponent
                    style={{
                      fontWeight: 'bold',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                    render="h4"
                  >
                    {instructions.header}
                  </FelaComponent>
                )}
                {instructions.richText && (
                  <Paragraph {...instructions.richText} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
}

Instructions.propTypes = propTypes;
Instructions.defaultProps = defaultProps;

export default Instructions;
