// @flow
import React from 'react';
import { LayoutContainer, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';

function exchange(): Node {
  return (
    <MainLayout>
      <LayoutContainer
        bgc="transparent"
      >
        <h1>Exchange Page</h1>
      </LayoutContainer>
    </MainLayout>
  );
}

export default exchange;
