// @flow

import * as React from 'react';

import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';

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
    | string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  outerBackgroundColor:
    | string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
};

type ListViewPropTypes = {
  ...ListViewWrapperPropTypes,
  gutter:
    | number
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

export default function ListView({
  attrs,
  children,
  disableWrapper,
  gutter,
  innerBackgroundColor,
  outerBackgroundColor,
}: ListViewPropTypes): React.Node {
  return (
    <ListViewWrapper
      {...{
        attrs,
        disableWrapper,
        innerBackgroundColor,
        outerBackgroundColor,
      }}
    >
      <Grid gutter={gutter}>{children}</Grid>
    </ListViewWrapper>
  );
}

function ListViewWrapper({
  attrs,
  children,
  disableWrapper,
  innerBackgroundColor,
  outerBackgroundColor,
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
