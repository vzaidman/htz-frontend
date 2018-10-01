// @flow

import type { Node, } from 'react';
import React from 'react';
import type { CardContentProps, } from '../CardContent/CardContent';
import CardContent from '../CardContent/CardContent';

// eslint does not understrand imported flow types
/* eslint-disable react/default-props-match-prop-types */
CardFooter.defaultProps = {
  backgroundColor: null,
  color: null,
  padding: null,
  seperator: null,
  miscStyles: null,
  attrs: null,
  children: null,
  tagName: 'div',
};
/* eslint-enable react/default-props-match-prop-types */

export default function CardFooter({
  backgroundColor,
  color,
  padding,
  seperator,
  miscStyles,
  attrs,
  children,
  tagName,
}: CardContentProps): Node {
  const sendToBottom = { marginTop: 'auto', };
  const extendedMiscStyles = miscStyles
    ? Object.assign({}, sendToBottom, miscStyles)
    : sendToBottom;

  return (
    <CardContent
      {...{
        backgroundColor,
        color,
        padding,
        seperator,
        miscStyles: extendedMiscStyles,
        attrs,
        children,
        tagName,
      }}
    >
      {children}
    </CardContent>
  );
}
