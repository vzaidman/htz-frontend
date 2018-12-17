// @flow
import * as React from 'react';

import {
  LayoutRow,
  LayoutContainer,
  componentFromInputTemplate,
  HeaderSlot,
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
  children: React.Node,
};

function HomePageSlotsLayout({
  slots: { preHeader, header, postHeader, postMain, footer, main, },
  children,
}: Props): React.Node {
  const getElements = slot => slot.map(element => {
    const Element = componentFromInputTemplate(element.inputTemplate);
    const { properties, ...elementWithoutProperties } = element;
    return <Element {...elementWithoutProperties} {...properties} />;
  });
  const rowBgc = 'white';

  return (
    <React.Fragment>
      {preHeader ? <LayoutRow bgc={rowBgc}>{getElements(preHeader)}</LayoutRow> : null}
      {/* Layout row is inside HeaderSlot Component because its miscStyles depend on state */}
      <HeaderSlot rowBgc={rowBgc} content={header} />
      {postHeader ? (
        <LayoutRow bgc={rowBgc}>
          <LayoutContainer>{getElements(postHeader)}</LayoutContainer>
        </LayoutRow>
      ) : null}
      <LayoutRow bgc={rowBgc} tagName="main" id="pageRoot" miscStyles={{ flexGrow: 1, }}>
        <MainSlot main={main} />
      </LayoutRow>
      {postMain ? (
        <LayoutRow bgc={rowBgc} miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}>
          <React.Fragment>{getElements(postMain)}</React.Fragment>
        </LayoutRow>
      ) : null}
      {footer ? <LayoutRow bgc={rowBgc}>{getElements(footer)}</LayoutRow> : null}
      <LayoutRow bgc={rowBgc} idName="modalsRoot" />
    </React.Fragment>
  );
}

export default HomePageSlotsLayout;
