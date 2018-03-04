import React from 'react';
import getComponent from '../../../utils/componentFromInputTemplate';

function Header({ content, }) {
  return (
    <div>
      <h4>Header</h4>
      {content &&
        content.map(element => {
          const Element = getComponent(element.inputTemplate);
          return <Element key={element.contentId} {...element} />;
        })}
    </div>
  );
}

export default Header;
