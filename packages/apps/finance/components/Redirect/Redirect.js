// @flow
import React from 'react';
import type { ChildrenArray, StatelessFunctionalComponent, Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { HtzLink, } from '@haaretz/htz-components';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  href: string | {
    pathname: string,
    query: Object,
  },
  as?: string,
  children: ChildrenArray<Node> | Node,
  miscStyles? : Object,
}

const Redirect:StatelessFunctionalComponent<Props> = ({
  href,
  as,
  children,
  miscStyles,
}) => (
  <FelaComponent
    style={theme => ({
      ...theme.type(-2),
      backgroundColor: theme.color('neutral', '-5'),
      color: theme.color('neutral', '-1'),
      display: 'block',
      fontWeight: '700',
      paddingBottom: '1rem',
      paddingTop: '1rem',
      textAlign: 'center',
      extend: [
        ...(miscStyles
          ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
    render={({ className, }) => (
      <HtzLink
        href={href}
        asPath={as}
        className={className}
      >
        {children}
      </HtzLink>
    )}
  />
);

export default Redirect;
