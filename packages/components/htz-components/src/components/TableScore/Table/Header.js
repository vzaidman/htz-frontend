// @flow
import * as React from 'react';
import type { ChildrenArray, Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderLeft, } from '@haaretz/htz-css-tools';

type HeaderProps = {
  headers: Array<string>,
}
type HeaderTabProps = {
  children: ChildrenArray<Node> | Node,
  index: number,
}

const SingleTabStyle: Object => Object = (
  { theme, minWidth, borderWidth, textAlign, mediaPaddingRight, mediaMinWidth, }
) => ({
  minWidth,
  minHeight: '36px',
  backgroundColor: theme.color('primary', -6),
  padding: '1rem 1.5rem',
  fontFamily: 'inherit',
  fontWeight: 500,
  textAlign,
  color: theme.color('neutral', -3),
  extend: [
    theme.type(0),
    borderLeft({
      width: borderWidth,
      lines: 1,
      style: 'solid',
      color: theme.color('neutral', -5),
    }),
    theme.mq({ from: 'm', until: 'l', },
      {
        padding: '1rem',
        paddingRight: mediaPaddingRight,
        minWidth: mediaMinWidth || '30px',
        ...theme.type(-1),
      }),
    theme.mq({ until: 's', },
      {
        ...theme.type(-2),
        minWidth: '3rem',
      }),
  ],
});

const HeadersStyle: Object = {
  minWidth: '559px',
  minHeight: '37px',
  boxShadow: '0 1px 1px 0 rgba(162, 162, 162, 0.5)',
};


function TableHeaderTab({ children, index, }: HeaderTabProps): Node {
  return index === 0 ? (
    <FelaComponent
      rule={SingleTabStyle}
      borderWidth="0"
      minWidth="40px"
      textAlign="right"
      mediaPaddingRight="1.5rem"
      mediaMinWidth="18rem"
      render={({ className, }) => <th className={className}>{children}</th>}
    />) : (
      <FelaComponent
        rule={SingleTabStyle}
        borderWidth="1px"
        minWidth="60px"
        textAlign="center"
        mediaPaddingRight="0.9"
        render={({ className, }) => <th className={className}>{children}</th>}
      />);
}


function Header(props: HeaderProps): Node {
  const { headers, } = props;

  return (
    <thead style={HeadersStyle}>
      {
      headers.map((title, index) => (
        <TableHeaderTab index={index} key={title}>
          {title}
        </TableHeaderTab>
      ))
    }
    </thead>
  );
}

export default Header;
