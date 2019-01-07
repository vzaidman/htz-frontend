// @flow
import React, { Fragment, } from 'react';
import type { ChildrenArray, Element, Node, } from 'react';
import Head from 'next/head';
import config from 'config';
import { FelaComponent, } from 'react-fela';
// import dynamic from 'next/dynamic';
import {
  AriaLive,
  DeviceTypeInjector,
  LayoutContainer,
  RouteChangeListener,
  ScrollListener,
  UserInjector,
} from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { tmTheme, } from '@haaretz/tm-theme';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics';
/*
const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});
*/

type Props = {
  children: ChildrenArray<Element<any>>,
  section: ?string,
  assetId: ?string,
  title: string,
  description: string,
  path: string,
};

MainLayout.defaultProps = {
  section: null,
  assetId: null,
};

function MainLayout({ children, section, assetId, title, description, path, }: Props): Node {
  const useSSL: boolean = config.get('useSSL');
  const hostname: string = config.get('hostname');
  const domain: string = config.get('domain');
  const port: ?string = config.get('port');
  const canonicalUrl: string = `http${useSSL ? 's' : ''}://${hostname}.${domain}${port ? `:${port}` : ''}${path}`;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <link
          rel="canonical"
          href={canonicalUrl}
        />
      </Head>
      <ScrollListener />
      <RouteChangeListener />
      <GoogleAnalytics />
      <UserInjector />
      <StyleProvider renderer={styleRenderer} theme={tmTheme}>
        <Fragment>
          <AriaLive />
          <DeviceTypeInjector />
          {/* <Masthead /> */}
          <FelaComponent
            style={theme => ({
              backgroundColor: theme.color('neutral', '-6'),
            })}
          >
            <LayoutContainer bgc="transparent">
              <NavigationBar section={section} assetId={assetId} />
              {children}
            </LayoutContainer>
          </FelaComponent>
        </Fragment>
      </StyleProvider>
    </Fragment>
  );
}

export default MainLayout;
