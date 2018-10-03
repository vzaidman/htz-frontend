// @flow
import React from 'react';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';

type Props = {
  url: {
    pathname: string,
    query: {
      id: string,
    },
  },
};

function etf({ url: { query: { id, }, }, }: Props): Node {
  return (
    <MainLayout>
      <h1>Exchange Traded Funds Quote</h1>
    </MainLayout>
  );
}

export default etf;
