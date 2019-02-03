// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';

import type { Node, } from 'react';
import type { DfpBannerType, } from '../../flowTypes/DfpBannerType';

import AdSlotBase from './AdSlotBase';


function BillboardAdSlot(props: DfpBannerType): Node {
  return (
    <FelaComponent
      style={theme => ({
        extend: [
          theme.mq(
            { from: 's', },
            { '&>:first-child :not(:empty)': { minHeight: '150px', }, },
          ),
          theme.mq(
            { from: 'l', },
            { '&:not(:empty)': { paddingTop: '5rem', paddingBottom: '5rem', }, },
          ),
        ],
      })}
    >
      <AdSlotBase {...props} />
    </FelaComponent>
  );
}

export default BillboardAdSlot;
