// @flow
import * as React from 'react';
import type { ChildrenArray, Node, } from 'react';
import { FelaComponent, } from 'react-fela';

type HeaderProps = {
  headers: Array<string>,
}
type HeaderTabProps = {
  children: ChildrenArray<Node> | Node,
  index: number,
}

const SingleTabStyle: Object => Object = (
  { theme, minWidth, borderWidth, textAlign, mediaPaddingRight, mediaMinWidth, smallMediaPadding, }
) => ({
  minWidth,
  height: '100%',
  minHeight: '36px',
  backgroundColor: theme.color('primary', -6),
  padding: '1rem',
  fontFamily: 'inherit',
  fontWeight: 500,
  position: 'relative',
  textAlign,
  color: theme.color('neutral', -3),
  ':not(:last-child)': {
    ':after': {
      content: '""',
      width: '1px',
      height: '80%',
      background: '#ccc',
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  extend: [
    theme.type(-1),
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
        minWidth: mediaMinWidth || '30px',
        padding: smallMediaPadding,
      }),
  ],
});

const HeadersStyle: Object = {
  minWidth: '100%',
  minHeight: '37px',
  boxShadow: '0 1px 1px 0 rgba(162, 162, 162, 0.5)',
};


function TableHeaderTab({ children, index, }: HeaderTabProps): Node {
  return index === 0 ? (
    <FelaComponent
      rule={SingleTabStyle}
      borderWidth="1px"
      minWidth="26rem"
      textAlign="right"
      mediaPaddingRight="1.5rem"
      mediaMinWidth="22rem"
      render={({ className, }) => <th className={className}>{children}</th>}
    />) : (
      <FelaComponent
        rule={SingleTabStyle}
        borderWidth="1px"
        minWidth="60px"
        textAlign="center"
        smallMediaPadding="1rem 1rem 1rem 0.5rem"
        render={({ className, }) => <th className={className}>{children}</th>}
      />);
}


function Header(props: HeaderProps): Node {
  const { headers, } = props;

  return (
    <thead style={HeadersStyle}>
      <tr>
        {
      headers.map((title, index) => (
        <TableHeaderTab index={index} key={title}>
          {title}
        </TableHeaderTab>
      ))
    }
      </tr>
    </thead>
  );
}

export default Header;
