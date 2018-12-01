// @flow
import type { Node, ElementType, } from 'react';
import React from 'react';
import { FelaComponent, } from 'react-fela';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import type { CardContentStyleOptions, } from './cardContentStyle.js';
import cardContentStyle from './cardContentStyle.js';

export type CardContentProps = {
  ...CardContentStyleOptions,
  attrs: attrFlowType,
  children: Node,
  tagName: ElementType,
};

CardContent.defaultProps = {
  // Disabling eslint here, because it doesn't understand how
  // flow wroks with default props and required props
  /* eslint-disable react/default-props-match-prop-types */
  backgroundColor: null,
  color: null,
  padding: null,
  seperator: null,
  miscStyles: null,
  attrs: null,
  children: null,
  tagName: 'div',
  /* eslint-enable react/default-props-match-prop-types */
};

export default function CardContent({
  backgroundColor,
  color,
  padding,
  seperator,
  miscStyles,
  attrs,
  children,
  tagName,
}: CardContentProps): Node {
  const Component = tagName;
  return (
    <FelaComponent
      {...{
        backgroundColor,
        color,
        padding,
        seperator,
        miscStyles,
      }}
      rule={cardContentStyle}
      render={({ className, }) => (
        <Component className={className} {...attrs}>
          {children}
        </Component>
      )}
    />
  );
}
