// @flow
import React, { Fragment, } from 'react';
import type { ChildrenArray, Element, Node, } from 'react';
import Head from 'next/head';
import config from 'config';
import { FelaComponent, } from 'react-fela';
import dynamic from 'next/dynamic';
import {
  AriaLive,
  DeviceTypeInjector,
  LayoutContainer,
  RouteChangeListener,
  ScrollListener,
  UserInjector,
  GeneralAdSlot,
  Grid,
  GridItem,
} from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { tmTheme, } from '@haaretz/tm-theme';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics';
import RowItem from '../components/RowItem/RowItem';
import PageRow from '../components/PageRow/PageRow';

const Dfp = dynamic(import('../components/Dfp/Dfp'), {
  loading: () => null,
  ssr: false,
});


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
  const port: ?string = config.get('appPort');
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
      <Dfp />
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
              <FelaComponent
                style={{
                  marginBottom: '4rem',
                  marginTop: '4rem',
                }}
              >
                <GeneralAdSlot
                  id="Finance.TheMarker.com.Billboard"
                  contentName="Finance.TheMarker.com.Billboard"
                  audianceTarget="all"
                />
              </FelaComponent>
              {children}
              <PageRow>
                <RowItem
                  title="הכתבות הנקראות היום באתר"
                >
                  <Grid gutter={2}>
                    <GridItem width={1 /4}>
                      <GeneralAdSlot
                        id="Finance.TheMarker.com.Native1"
                        contentName="Finance.TheMarker.com.Native1"
                        audianceTarget="all"
                      />
                    </GridItem>
                    <GridItem width={1 /4}>
                      <GeneralAdSlot
                        id="Finance.TheMarker.com.Native2"
                        contentName="Finance.TheMarker.com.Native2"
                        audianceTarget="all"
                      />
                    </GridItem>
                    <GridItem width={1 /4}>
                      <GeneralAdSlot
                        id="Finance.TheMarker.com.Native3"
                        contentName="Finance.TheMarker.com.Native3"
                        audianceTarget="all"
                      />
                    </GridItem>
                    <GridItem width={1 /4}>
                      <GeneralAdSlot
                        id="Finance.TheMarker.com.Native4"
                        contentName="Finance.TheMarker.com.Native4"
                        audianceTarget="all"
                      />
                    </GridItem>
                  </Grid>
                </RowItem>
              </PageRow>
              <FelaComponent
                style={theme => ({
                  extend: [
                    theme.mq({ from: 'l', }, {
                      display: 'none',
                    }),
                  ],
                })}
              >
                <PageRow>
                  <GeneralAdSlot
                    id="Finance.TheMarker.com.StripBottom"
                    contentName="Finance.TheMarker.com.StripBottom"
                    audianceTarget="all"
                  />
                </PageRow>
              </FelaComponent>
            </LayoutContainer>
          </FelaComponent>
        </Fragment>
      </StyleProvider>
    </Fragment>
  );
}

export default MainLayout;
