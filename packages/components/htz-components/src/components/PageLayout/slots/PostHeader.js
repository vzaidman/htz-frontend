import React from 'react';
import getComponent from '../../../utils/componentFromInputTemplate';

function PostHeader({ content, }) {
  return (
    <div>
      <h4>Post-Header</h4>
      {content &&
        content.map(element => {
          const Element = getComponent(element.inputTemplate);
          return <Element key={element.contentId} {...element} />;
        })}
    </div>
  );
}

export default PostHeader;
