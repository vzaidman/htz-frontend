// @flow
import React from 'react';
import { LayoutContainer, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';

function options(): Node {
  return (
    <MainLayout>
      <LayoutContainer
        bgc="transparent"
      >
        <h1>Options Page</h1>
      </LayoutContainer>
    </MainLayout>
  );
}

export default options;
