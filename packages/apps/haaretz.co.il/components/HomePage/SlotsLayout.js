// @flow
import * as React from 'react';
import gql from 'graphql-tag';

import {
  LayoutRow,
  LayoutContainer,
  componentFromInputTemplate,
  GoogleAnalytics,
  GaDimensions,
  HeaderSlot,
  MarketingNotificationProvider,
  BIRequest,
  IconHaaretzHomepageMasthead,
  Query,
} from '@haaretz/htz-components';

import MainSlot from './MainSlot';

const GET_USER_TYPE = gql`
  query GetUserId {
    user @client {
      type
    }
  }
`;

type Props = {
  slots: {
    preHeader: {
      inputTemplate: string,
      contentId: string,
      properties: {},
    }[],
    header: { inputTemplate: string, contentId: string, properties: {}, }[],
    postHeader: { inputTemplate: string, contentId: string, properties: {}, }[],
    postMain: { inputTemplate: string, contentId: string, properties: {}, }[],
    footer: { inputTemplate: string, contentId: string, properties: {}, }[],
    main: { inputTemplate: string, contentId: string, properties: {}, }[],
  },
};

function HomePageSlotsLayout({
  slots: { preHeader, header, postHeader, postMain, footer, main, },
}: Props): React.Node {
  const getElements = slot => slot.map(element => {
    const Element = componentFromInputTemplate(element.inputTemplate);
    const { properties, ...elementWithoutProperties } = element;
    if (element.inputTemplate === 'com.tm.FooterElement') {
      return <Element {...elementWithoutProperties} {...properties} shouldRenderScripts />;
    }
    return <Element {...elementWithoutProperties} {...properties} />;
  });

  return (
    <React.Fragment>
      <MarketingNotificationProvider />
      <BIRequest />
      {preHeader ? <LayoutRow>{getElements(preHeader)}</LayoutRow> : null}
      {/* Layout row is inside HeaderSlot Component because its miscStyles depend on state */}
      <HeaderSlot
        pageType="homepage"
        rowBgc="transparent"
        content={header}
        logo={IconHaaretzHomepageMasthead}
      />
      {postHeader ? (
        <LayoutRow>
          <LayoutContainer>{getElements(postHeader)}</LayoutContainer>
        </LayoutRow>
      ) : null}
      <LayoutRow tagName="main" id="pageRoot" miscStyles={{ flexGrow: 1, }}>
        <MainSlot main={main} />
      </LayoutRow>
      {postMain ? (
        <LayoutRow miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}>
          <React.Fragment>{getElements(postMain)}</React.Fragment>
        </LayoutRow>
      ) : null}
      {footer ? <LayoutRow>{getElements(footer)}</LayoutRow> : null}
      <LayoutRow idName="modalsRoot" />
      <Query query={GET_USER_TYPE} ssr={false}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) return null;
          return (
            <React.Fragment>
              <GoogleAnalytics withEC />
              <GaDimensions pageType="HomePage" userType={data.user.type} />
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
}

export default HomePageSlotsLayout;
