import React from 'react';
import { FelaComponent, } from 'react-fela';
import AdSlotBase from './AdSlotBase';

const style = ({ theme, }) => ({
  '&:not(:empty)': {
    '&::before': {
      display: 'block',
      content: '"-פרסומת-"',
      paddingTop: '0rem',
      paddingBottom: '0rem',
      ...theme.type(-3),
    },
    '&::after': {
      display: 'block',
      content: '" "',
      paddingBottom: '5rem',
    },
  },
});

const MarkedAdSlot = props => (
  <FelaComponent style={{ textAlign: 'center', }} >
    <AdSlotBase styleRule={style} {...props} />
  </FelaComponent>
);

export default MarkedAdSlot;
