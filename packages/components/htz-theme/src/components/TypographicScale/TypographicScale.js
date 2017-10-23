import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import getColor from '../../methods/getColor';
import typesetter from '../../methods/typesetter';

const pangram = 'איך נטוס? עם גד כץ. הזקן שמחלף בצרפת!';

const style = ({ step, }) => ({
  // color: getColor('secondary', 'base'),
  ...(step === 0 ? { color: getColor('tertiary', '+1'), } : undefined),
  ...typesetter(step),
  margin: '0 0 1rem',
  maxWidth: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
});

const ScaleItem = createComponent(style, 'p', props => Object.keys(props));

TypographicScale.propTypes = {
  first: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
};

export default function TypographicScale({ first, last, }) {
  const steps = [];
  let index = first;
  while (index <= last) {
    steps.push(index);
    index += 1;
  }
  return (
    <div dir="rtl">
      {steps.map(step => (
        <ScaleItem key={Math.random()} step={step}>
          <strong>
            <bdo dir="ltr">{step}</bdo>:
          </strong>{' '}
          {pangram}
        </ScaleItem>
      ))}
    </div>
  );
}
