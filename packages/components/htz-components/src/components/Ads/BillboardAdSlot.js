// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';

import type { Node, } from 'react';
import type { DfpBannerType, } from '../../flowTypes/DfpBannerType';

import AdSlotBase from './AdSlotBase';


function BillboardAdSlot(props: DfpBannerType): Node {
  return (
    <FelaComponent style={{ minHeight: '150px', }}>
      <AdSlotBase {...props} />
    </FelaComponent>
  );
}

export default BillboardAdSlot;
