import React from 'react';
import withData, { pagePropTypes, } from '../lib/withData';
import MainLayout from '../layouts/MainLayout';

export function HomePage({ url, }) {
  return (
    <MainLayout
      url={url}
      slots={[
        'header',
        'topwide',
        'topwidesecondary',
        'aside',
        'main',
        'bottom',
        'footer',
      ]}
    />
  );
}

HomePage.propTypes = pagePropTypes;

export default withData(HomePage);
