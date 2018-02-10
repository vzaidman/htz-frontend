import React from 'react';
import { createComponent, } from 'react-fela';
import getComponent from '../../../utils/componentFromInputTemplate';

function PreHeader ({ content, }) {
  return (
    <div>
      <h4>Pre-Header</h4>
      {content && content.map(element => {
        const Element = getComponent(element.inputTemplate);
        return <Element key={element.contentId} {...element}/>;
      })}
    </div>
  )
}

export default PreHeader;
