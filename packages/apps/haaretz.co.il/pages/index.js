import React from 'react';
import withData from '../lib/withData';
import MainLayout from '../layouts/MainLayout';
import Slot from '../components/Slot/Slot';

export function HomePage(props) {
  return (
    <MainLayout>
      <Slot name="header" />
      <Slot name="topwide" />
      <Slot name="topwidesecondary" />
      <Slot name="aside" />
      <Slot name="main" />
      <Slot name="bottom" />
      <Slot name="footer" />
    </MainLayout>
  );
}

export default withData(HomePage);
