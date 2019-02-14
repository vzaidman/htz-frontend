// @flow
import * as React from 'react';

import {
  LayoutRow,
  LayoutContainer,
  componentFromInputTemplate,
  HeaderSlot,
  MarketingNotificationProvider,
  BIRequest,
  IconHaaretzHomepageMasthead,
} from '@haaretz/htz-components';

import MainSlot from './MainSlot';

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
      return (
        <Element
          key={elementWithoutProperties.contentId}
          {...elementWithoutProperties}
          {...properties}
          shouldRenderScripts
        />
      );
    }
    return (
      <Element
        key={elementWithoutProperties.contentId}
        {...elementWithoutProperties}
        {...properties}
      />
    );
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
    </React.Fragment>
  );
}

export default HomePageSlotsLayout;
