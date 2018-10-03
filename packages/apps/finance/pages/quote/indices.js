// @flow
import React from 'react';
import { LayoutContainer, } from '@haaretz/htz-components';

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

function indices({ url: { query: { id, }, }, }: Props): Node {
  return (
    <MainLayout>
      <LayoutContainer
        bgc="transparent"
      >
        <h1>Indices Quote</h1>
      </LayoutContainer>
    </MainLayout>
  );
}

export default indices;
