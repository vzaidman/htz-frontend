import React from 'react';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const slotWrapper = ({ miscStyles, theme, }) => ({
  backgroundColor: theme.color('primary', '-6'),
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',

  ...parseComponentProp(
    'maxWidth',
    [
      { until: 'm', value: 320/6 },
      { from: 'm', until: 'l', value: 100 },
      { from: 'l', until: 'xl', value: 1024/6 },
      { from: 'xl', value: 1293/7 },
    ],
    theme.mq,
    mediaQueryCallback
  ),

  ...miscStyles,
})

const Wrapper = createComponent(slotWrapper);

function Slot({ content, miscStyles, }) {
  return(
  <Wrapper miscStyles={miscStyles}>
    {content}
  </Wrapper>
  )
}

export default Slot;
