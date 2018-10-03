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

function exchange({ url: { query: { assetId, }, }, }: Props): Node {
  return (
    <MainLayout>
      <h1>Exchange Quote</h1>
    </MainLayout>
  );
}

export default exchange;
