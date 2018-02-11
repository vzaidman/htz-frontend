import React from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import MainLayout from '../layouts/MainLayout';

export function Page({ url, }) {
  return <MainLayout url={url} />;
}

Page.propTypes = pagePropTypes;

export default withData(Page);
