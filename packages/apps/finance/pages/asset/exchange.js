// @flow
import React from 'react';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';

type Props = {
  url: {
    pathname: string,
    query: {
      assetId: string,
      section: string,
    },
  },
};

function exchange({ url: { query: { assetId, section, }, }, }: Props): Node {
  return (
    <MainLayout>
      {
        section === 'crypto'
        ? <h1>Crypto in Exchange Quote</h1>
        : <h1>Exchange Quote</h1>
      }
    </MainLayout>
  );
}

export default exchange;
