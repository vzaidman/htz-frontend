import React from 'react';
import withData, { pagePropTypes, } from '../lib/withData';
import MainLayout from '../layouts/MainLayout';

export function Page({ url, }) {
  return <MainLayout url={url} />;
}

Page.propTypes = pagePropTypes;

export default withData(Page);
