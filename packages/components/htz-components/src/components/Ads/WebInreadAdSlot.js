import React from 'react';
import { FelaComponent, } from 'react-fela';
import AdSlotBase from './AdSlotBase';
import WebInreadAdSlotCaption from './WebInreadAdSlotCaption';

const style = ({ theme, }) => ({
  '&:not(:empty)': {
    '&::after': {
      display: 'block',
      content: '" "',
      paddingBottom: '5rem',
    },
  },
});

const WebInreadAdSlot = props => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <WebInreadAdSlotCaption />
    <AdSlotBase styleRule={style} {...props} />
  </FelaComponent>
);

export default WebInreadAdSlot;
