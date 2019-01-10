// @flow
import * as React from 'react';

import {
  LayoutRow,
  LayoutContainer,
  componentFromInputTemplate,
  HeaderSlot,
} from '@haaretz/htz-components';

type Slot = { inputTemplate: string, contentId: string, properties: {}, };

type Props = {
  render: Slot[] => React.Node,
  rowBgc: ?string,
  slots: {
    preHeader: {
      inputTemplate: string,
      contentId: string,
      properties: {},
    }[],
    header: Slot[],
    postHeader: Slot[],
    postMain: Slot[],
    footer: Slot[],
    main: Slot[],
  },
};

HomePageSlotsLayout.defaultProps = {
  rowBgc: null,
};

function HomePageSlotsLayout({
  slots: { preHeader, header, postHeader, postMain, footer, main, },
  render,
  rowBgc,
}: Props): React.Node {
  const getElements = slot => slot.map(element => {
    const Element = componentFromInputTemplate(element.inputTemplate);
    const { properties, ...elementWithoutProperties } = element;
    return <Element {...elementWithoutProperties} {...properties} />;
  });

  return (
    <React.Fragment>
      {preHeader ? <LayoutRow bgc={rowBgc}>{getElements(preHeader)}</LayoutRow> : null}
      {/* Layout row is inside HeaderSlot Component because its miscStyles depend on state */}
      <HeaderSlot rowBgc={rowBgc} content={header} includeMadorimNavigation />
      {postHeader ? (
        <LayoutRow bgc={rowBgc}>
          <LayoutContainer>{getElements(postHeader)}</LayoutContainer>
        </LayoutRow>
      ) : null}
      <LayoutRow bgc={rowBgc} tagName="main" id="pageRoot" miscStyles={{ flexGrow: 1, }}>
        {render(main)}
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
