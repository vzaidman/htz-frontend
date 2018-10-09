// @flow
import React from 'react';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';

type Props = {
  url: {
    pathname: string,
    query: {
      crypto?: boolean,
      section: string,
    },
  },
};

function exchange({ url: { query: { crypto, }, }, }: Props): Node {
  return (
    <MainLayout>
      {
        crypto
          ? <h1>Crypto in Exchange Page</h1>
          : <h1>Exchange Page</h1>
      }
    </MainLayout>
  );
}

export default exchange;
