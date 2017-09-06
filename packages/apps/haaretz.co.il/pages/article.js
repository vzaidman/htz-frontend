import React from 'react';
import withData, { pagePropTypes, } from '../lib/withData';
import MainLayout from '../layouts/MainLayout';

export function ArticlePage({ url, }) {
  return (
    <MainLayout
      url={url}
      slots={[
        'header',
        'topwidesecondary',
        'aside',
        'main',
        'bottom',
        'footer',
      ]}
    />
  );
}

ArticlePage.propTypes = pagePropTypes;

export default withData(ArticlePage);
