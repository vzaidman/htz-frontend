// @flow
import React from 'react';
import { LayoutContainer, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';

function etf(): Node {
  return (
    <MainLayout>
      <LayoutContainer
        bgc="transparent"
      >
        <h1>Exchange Traded Funds Page</h1>
      </LayoutContainer>
    </MainLayout>
  );
}

export default etf;
