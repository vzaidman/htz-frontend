import React from 'react';
import withData from '../lib/withData';
import MainLayout from '../layouts/MainLayout';
import Slot from '../components/Slot/Slot';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

export function ArticlePage(props) {
  return (
    <MainLayout>
      <Breadcrumbs />
      <Slot name="header" />
      <Slot name="topwidesecondary" />
      <Slot name="aside" />
      <Slot name="main" />
      <Slot name="bottom" />
      <Slot name="footer" />
    </MainLayout>
  );
}

export default withData(ArticlePage);
