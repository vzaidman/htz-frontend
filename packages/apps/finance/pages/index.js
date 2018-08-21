// @flow
import React from 'react';
import { H, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import MainLayout from '../layouts/MainLayout';

type Props = {
  url: string,
};

function index({ url, }: Props): Node {
  return (
    <MainLayout path={url}>
      <H>Index</H>
    </MainLayout>
  );
}

export default index;
