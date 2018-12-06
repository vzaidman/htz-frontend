// @flow

import * as React from 'react';

import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import Grid from '../Grid/Grid';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import Section from '../AutoLevels/Section';

import type { attrFlowType, } from '../../flowTypes/attrTypes';

type ListViewWrapperPropTypes = {
  attrs: attrFlowType,
  children: React.Node,
  disableWrapper: boolean,
  innerBackgroundColor:
    | ?string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  outerBackgroundColor:
    | ?string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  marginTop: ?number | ComponentPropResponsiveObject<number>[],
  miscStyles: ?StyleProps,
};

type ListViewPropTypes = {
  ...ListViewWrapperPropTypes,
  gutter:
    | ?number
    | {
        onServerRender: number,
        queries: {
          from?: ?string,
          until?: ?string,
          misc?: ?string,
          type?: ?string,
          value: number,
        }[],
      },
};

const defaultProps = {
  attrs: null,
  children: null,
  disableWrapper: null,
  innerBackgroundColor: null,
  outerBackgroundColor: null,
  marginTop: [
    {
      until: 's',
      value: 4,
    },
    {
      from: 's',
      value: 8,
    },
  ],
  miscStyles: null,
};

ListView.defaultProps = {
  ...defaultProps,
  gutter: null,
};

export default function ListView({
  attrs,
  children,
  disableWrapper,
  gutter,
  marginTop,
  innerBackgroundColor,
  outerBackgroundColor,
  miscStyles,
}: ListViewPropTypes): React.Node {
  const hasMarginTop = marginTop != null;
  const mergedMiscStyles = miscStyles || hasMarginTop
    ? {
      ...(marginTop ? { marginTop, } : {}),
      ...(miscStyles || {}),
    }
    : null;

  return (
    <ListViewWrapper
      {...{
        attrs,
        disableWrapper,
        innerBackgroundColor,
        outerBackgroundColor,
      }}
      miscStyles={mergedMiscStyles}
    >
      <Grid gutter={gutter}>{children}</Grid>
    </ListViewWrapper>
  );
}

ListViewWrapper.defaultProps = defaultProps;

function ListViewWrapper({
  attrs,
  children,
  disableWrapper,
  marginTop,
  innerBackgroundColor,
  outerBackgroundColor,
  miscStyles,
}: ListViewWrapperPropTypes): React.Node {
  return disableWrapper ? (
    <Section {...attrs}>{children}</Section>
  ) : (
    <Section isFragment>
      <LayoutRow attrs={attrs} tagName="section" bgc={outerBackgroundColor}>
        <LayoutContainer bgc={innerBackgroundColor}>{children}</LayoutContainer>
      </LayoutRow>
    </Section>
  );
}
