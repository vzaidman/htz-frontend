import React from 'react';
import { createComponent, } from 'react-fela';
import getComponent from '../../../utils/componentFromInputTemplate';

function PostMain ({ content, }) {
  return (
    <div>
      <h4>Post-Main</h4>
      {content && content.map(element => {
        const Element = getComponent(element.inputTemplate);
        return <Element key={element.contentId} {...element}/>;
      })}
    </div>
  )
}

export default PostMain;
