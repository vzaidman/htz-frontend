import React, { Fragment, } from 'react';
import type { StatelessFunctionalComponent, Node, ChildrenArray, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { H, } from '@haaretz/htz-components';

type Props = {
  title: string,
  miscStyles? : Object,
  children: ChildrenArray<Node> | Node,
};

// eslint-disable-next-line react/prop-types
const RowItem: StatelessFunctionalComponent<Props> = ({ title, children, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      ...theme.type(1),
      color: theme.color('neutral', '-1'),
      extend: [
        borderBottom('2px', 1, 'solid', theme.color('neutral', '-1')),
        ...(miscStyles
          ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
    render={({ className, }) => (
      <Fragment>
        <H className={className}>{title}</H>
        {children}
      </Fragment>
    )}
  />
);

export default RowItem;
