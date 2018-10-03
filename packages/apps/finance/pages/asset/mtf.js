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

function mtf({ url: { query: { id, }, }, }: Props): Node {
  return (
    <MainLayout>
      <h1>Mutual Funds Quote</h1>
    </MainLayout>
  );
}

export default mtf;
