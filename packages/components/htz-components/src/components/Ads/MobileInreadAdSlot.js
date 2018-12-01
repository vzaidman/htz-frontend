import React from 'react';
import { FelaComponent, } from 'react-fela';
import AdSlotBase from './AdSlotBase';

const MobileInreadAdSlot = props => (
  <FelaComponent style={{ marginBottom: '3rem', }}>
    <AdSlotBase {...props} />
  </FelaComponent>
);

export default MobileInreadAdSlot;
