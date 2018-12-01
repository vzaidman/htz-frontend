import React from 'react';
import fontStacks from '../../consts/fontStacks';

const pangram = 'איך נטוס? עם גד כץ. הזקן שמחלף בצרפת!';

export default function FontStacks() {
  return (
    <div style={{ fontSize: '1.2em', }}>
      {Object.keys(fontStacks).map(name => (
        <p
          key={name}
          style={{ fontFamily: fontStacks[name], margin: '0 0 1rem', }}
        >
          <strong>
            {name}
:
          </strong>
          {' '}
          <code>
font-familty:
            {fontStacks[name]}
          </code>
          <br />
          <strong>Sample:</strong>
          {' '}
          <bdo dir="rtl">{pangram}</bdo>
        </p>
      ))}
    </div>
  );
}
