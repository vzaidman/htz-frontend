import React from 'react';
import type { StatelessFunctionalComponent, Node, ChildrenArray, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { H, } from '@haaretz/htz-components';

type Props = {
  title: string,
  miscStyles? : Object,
  children: ChildrenArray<Node> | Node,
};

const Card: StatelessFunctionalComponent<Props> = ({ title, children, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      extend: [
        ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
  >
    <FelaComponent
      style={theme => ({
        ...theme.type(1),
        color: theme.color('neutral', '-1'),
        extend: [
          borderBottom('3px', 1, 'solid', theme.color('neutral', '-1')),
        ],
      })}
      render={({ className, }) => (
        <H className={className}>{title}</H>
      )}
    />
    {children}
  </FelaComponent>
);

export default Card;
