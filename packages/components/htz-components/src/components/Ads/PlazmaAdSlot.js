import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import AdSlotBase from './AdSlotBase';

const style = ({ theme, }) => ({
  '&:not(:empty)': {
    paddingTop: '3rem',
    extend: [ borderBottom('3px', 3, 'solid', theme.color('primary', '-6')), ],
  },
});

const PlazmaAdSlot = props => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <AdSlotBase styleRule={style} {...props} />
  </FelaComponent>
);

export default PlazmaAdSlot;
