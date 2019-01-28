// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderLeft, } from '@haaretz/htz-css-tools';
import type { ChildrenArray, Node, } from 'react';


type Options = {
  children: ChildrenArray<Node> | Node,
  index: number,
}


const SingleTabStyle: Object => Object = ({ theme, minWidth, borderWidth, textAlign, mediaPaddingRight, mediaMinWidth, }) => ({
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
    theme.mq({ from: '0px', until: 'm', },
      {
        padding: '0.9rem',
        paddingRight: mediaPaddingRight,
        minWidth: mediaMinWidth || '30px',
        fontSize: '10px',

      }),
  ],
});


const HeadersStyle: Object = {
  minWidth: '559px',
  minHeight: '37px',
  boxShadow: '0 1px 1px 0 rgba(162, 162, 162, 0.5)',
};

// Headers data
const headers: Array<string> = [ 'קבוצה', 'מש\'', 'נצ\'', 'הפ\'', 'תי\'', 'הפרש', 'נק\'', ];


function TableHeaderTab({ children, index, }: Options): Node {
  return index === 0 ? (
    <FelaComponent
      rule={SingleTabStyle}
      borderWidth="0"
      minWidth="170px"
      textAlign="right"
      mediaPaddingRight="1.5rem"
      mediaMinWidth="25rem"
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


export default function TableHeader(): Node {
  return (

    <FelaComponent style={HeadersStyle} render="thead">
      <tr>
        {
          headers.map((header, index) => (
            <TableHeaderTab
              index={index}
              key={header}
            >
              {header}
            </TableHeaderTab>))
        }
      </tr>
    </FelaComponent>
  );
}
