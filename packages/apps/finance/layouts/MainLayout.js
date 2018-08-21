// @flow
import React, { Fragment, } from 'react';
import type { ChildrenArray, Element, Node, } from 'react';
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import {
  AriaLive,
  DeviceTypeInjector,
  GoogleAnalytics,
  RouteChangeListener,
  ScrollListener,
  UserInjector,
} from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { tmTheme, } from '@haaretz/tm-theme';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import Masthead from '../components/Masthead/Masthead';
/*
const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});
*/

type Props = {
  path: string,
  children: ChildrenArray<Element<any>>,
};

function MainLayout({ children, path, }: Props): Node {
  return (
    <Fragment>
      <Head>
        {/* TODO: Make dynamic when we'll have routing */}
        <title>Finance</title>
      </Head>
      <ScrollListener />
      <RouteChangeListener />
      {/* <DfpInjector path={path} /> */}
      <GoogleAnalytics withEC />
      <UserInjector />
      <StyleProvider renderer={styleRenderer} theme={tmTheme}>
        <Fragment>
          <AriaLive />
          <DeviceTypeInjector />
          <Masthead />
          {children}
        </Fragment>
      </StyleProvider>
    </Fragment>
  );
}

export default MainLayout;
