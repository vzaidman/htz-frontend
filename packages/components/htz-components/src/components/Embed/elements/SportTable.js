/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.FootballTableEmbed,
    com.polobase.BasketballTableEmbed
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */
// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';

import type { StatelessFunctionalComponent, Node, ChildrenArray, } from 'react';

type Props = {
  settings: {
    src: string,
    width: string,
    height: string,
  },
};

// eslint-disable-next-line react/prop-types
const TableWrapper: StatelessFunctionalComponent<{ children: ChildrenArray<Node> | Node, }> =
  ({ children, }) => ( // eslint-disable-line react/prop-types
    <FelaComponent
      style={{
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      {children}
    </FelaComponent>
  );

// eslint-disable-next-line react/prop-types
const SportsTable: StatelessFunctionalComponent<Props> = ({ settings, }) => (
  <TableWrapper>
    <embed
      {...settings}
    />
  </TableWrapper>
);

export default SportsTable;
