import React from 'react';

const InlineStyle = (content, props) => (
  <style
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={content}
    {...props}
  />
);

export default InlineStyle;
