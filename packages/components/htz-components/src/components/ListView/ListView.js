// @flow

import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  parseStyleProps,
} from '@haaretz/htz-css-tools';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import Grid from '../Grid/Grid';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import Section from '../AutoLevels/Section';

type ListViewWrapperPropTypes = {
  attrs: ?attrFlowType,
  children: ?React.Node,
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
  marginTop: number | ComponentPropResponsiveObject<number>[],
  miscStyles: ?StyleProps,
  sectionMiscStyles: ?StyleProps,
};

type ListViewPropTypes = {
  ...ListViewWrapperPropTypes,
  gridMiscStyles: ?StyleProps,
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
  disableWrapper: false,
  innerBackgroundColor: 'transparent',
  outerBackgroundColor: null,
  marginTop: [ { until: 's', value: 4, }, { from: 's', value: 8, }, ],
  miscStyles: null,
  sectionMiscStyles: null,
};

ListView.defaultProps = {
  ...defaultProps,
  gridMiscStyles: null,
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
  sectionMiscStyles,
  gridMiscStyles,
}: ListViewPropTypes): React.Node {
  return (
    <ListViewWrapper
      {...{
        attrs,
        disableWrapper,
        innerBackgroundColor,
        outerBackgroundColor,
        marginTop,
        miscStyles,
        sectionMiscStyles,
      }}
    >
      <Grid gutter={gutter} miscStyles={gridMiscStyles}>
        {children}
      </Grid>
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
  sectionMiscStyles,
}: ListViewWrapperPropTypes): React.Node {
  return disableWrapper ? (
    <SectionComponent
      sectionMiscStyles={sectionMiscStyles}
      disableWrapper={disableWrapper}
      attrs={attrs}
    >
      {children}
    </SectionComponent>
  ) : (
    <SectionComponent
      sectionMiscStyles={sectionMiscStyles}
      disableWrapper={disableWrapper}
      attrs={attrs}
    >
      <LayoutRow
        attrs={attrs}
        tagName="section"
        namedBgc={outerBackgroundColor}
        miscStyles={{ marginTop, }}
      >
        <LayoutContainer
          namedBgc={innerBackgroundColor}
          miscStyles={miscStyles}
        >
          {children}
        </LayoutContainer>
      </LayoutRow>
    </SectionComponent>
  );
}

function SectionComponent({
  children,
  sectionMiscStyles,
  disableWrapper,
  attrs,
}) {
  return sectionMiscStyles ? (
    <FelaComponent
      rule={({ theme, }) => ({
        extend: [
          ...(sectionMiscStyles
            ? parseStyleProps(sectionMiscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, }) => (
        <Section isFragment={!disableWrapper} className={className} {...attrs}>
          {children}
        </Section>
      )}
    />
  ) : (
    <Section isFragment={!disableWrapper} {...attrs}>
      {children}
    </Section>
  );
}
