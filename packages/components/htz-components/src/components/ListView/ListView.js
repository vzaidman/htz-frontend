// @flow

import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import * as React from 'react';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import Grid from '../Grid/Grid';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import Section from '../AutoLevels/Section';
import isArray from '../../utils/isArray';
import isResponsiveOptions from '../../utils/isResponsiveOptions';

type PaddingTuple =
  | [number, ]
  | [number, number, ]
  | [number, number, number, ]
  | [number, number, number, number, ];

type PaddingValueType = number | PaddingTuple;

type PaddingType =
  | PaddingValueType
  | Array<ComponentPropResponsiveObject<PaddingValueType>>;

type RowSpacingOpts = { amount: number, nUp?: number, };
type RowSpacingProp =
  | RowSpacingOpts
  | ComponentPropResponsiveObject<RowSpacingOpts>[];

type SectionComponenType = {
  attrs: ?attrFlowType,
  children: ?React.Node,
  disableWrapper: boolean,
  /** The padding applied to the LayoutContainer */
  padding: ?PaddingType,
  sectionMiscStyles: ?StyleProps,
};

type ListViewWrapperPropTypes = SectionComponenType & {
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
};

type ListViewPropTypes = ListViewWrapperPropTypes & {
  rowSpacing: ?RowSpacingProp,
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

const sectionDefaultProps = {
  attrs: null,
  children: null,
  disableWrapper: false,
  padding: null,
  sectionMiscStyles: null,
};

const defaultProps = {
  ...sectionDefaultProps,
  innerBackgroundColor: 'transparent',
  outerBackgroundColor: null,
  marginTop: [ { until: 's', value: 4, }, { from: 's', value: 8, }, ],
  miscStyles: null,
  padding: null,
};

ListView.defaultProps = {
  ...defaultProps,
  rowSpacing: null,
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
  padding,
  rowSpacing,
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
        padding,
        sectionMiscStyles,
      }}
    >
      <Grid gutter={gutter} rowSpacing={rowSpacing} miscStyles={gridMiscStyles}>
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
  padding,
  sectionMiscStyles,
}: ListViewWrapperPropTypes): React.Node {
  return disableWrapper ? (
    <SectionComponent
      sectionMiscStyles={{
        ...(marginTop != null ? { marginTop, } : {}),
        ...(padding != null ? setPadding(padding) : {}),
        ...(sectionMiscStyles || {}),
      }}
      disableWrapper={disableWrapper}
      attrs={attrs}
    >
      {children}
    </SectionComponent>
  ) : (
    <SectionComponent disableWrapper={disableWrapper} attrs={attrs}>
      <LayoutRow
        attrs={attrs}
        tagName="section"
        namedBgc={outerBackgroundColor}
        miscStyles={{
          ...(marginTop != null ? { marginTop, } : {}),
          ...(!disableWrapper && sectionMiscStyles ? sectionMiscStyles : {}),
        }}
      >
        <LayoutContainer
          namedBgc={innerBackgroundColor}
          miscStyles={{
            ...(padding != null ? setPadding(padding) : {}),
            ...miscStyles,
          }}
        >
          {children}
        </LayoutContainer>
      </LayoutRow>
    </SectionComponent>
  );
}

SectionComponent.defaultProps = sectionDefaultProps;
function SectionComponent({
  children,
  sectionMiscStyles,
  disableWrapper,
  attrs,
}: SectionComponenType): React.Node {
  return disableWrapper && sectionMiscStyles ? (
    <FelaComponent
      rule={({ theme, }) => ({
        extend: [
          ...(sectionMiscStyles
            ? parseStyleProps(sectionMiscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, }) => (
        <Section isFragment={false} className={className} {...attrs}>
          {children}
        </Section>
      )}
    />
  ) : (
    <Section isFragment {...attrs}>
      {children}
    </Section>
  );
}

// /////////////////////////////////////////////////////////////////////
//                               UTILS                                //
// /////////////////////////////////////////////////////////////////////

type PaddingSideValue = string | Array<ComponentPropResponsiveObject<string>>;

type PaddingBpsObj = {
  paddingTop: Array<ComponentPropResponsiveObject<string>>,
  paddingInlineStart: Array<ComponentPropResponsiveObject<string>>,
  paddingBottom: Array<ComponentPropResponsiveObject<string>>,
  paddingInlineEnd: Array<ComponentPropResponsiveObject<string>>,
};

type PaddingCssObj = {
  paddingTop: PaddingSideValue,
  paddingInlineStart: PaddingSideValue,
  paddingBottom: PaddingSideValue,
  paddingInlineEnd: PaddingSideValue,
};

type PaddingValuesTuple = [
  string, // paddingTop
  string, // paddingInlineStart
  string, // paddingBottom
  string, // paddingInlineEnd
];

function getPaddingArray(paddingValues: PaddingValueType): PaddingTuple {
  return Array.isArray(paddingValues) ? paddingValues : [ paddingValues, ];
}

function getPaddingSideValue(
  paddingValues: PaddingTuple,
  pos: 0 | 1 | 2 | 3
): string {
  // $FlowFixMe
  const valueAtCurrentPos = paddingValues[pos];
  if (valueAtCurrentPos !== undefined) return `${valueAtCurrentPos}rem`;
  // $FlowFixMe
  const correspondingPos = Math.min(paddingValues.length, pos === 3 ? 1 : 0);
  // $FlowFixMe
  return getPaddingSideValue(paddingValues, correspondingPos);
}

function getPaddingValues(paddingOpts: PaddingValueType): PaddingValuesTuple {
  const paddingArray = getPaddingArray(paddingOpts);

  // Flow treats this as an array of indefinite items, that therefore cannot
  // be varified to fit `PaddingValuesTuple`.
  // $FlowFixMe
  return [ 0, 1, 2, 3, ].map(pos => getPaddingSideValue(paddingArray, pos));
}

function paddingOptionsReducer(
  initialValue: ?PaddingBpsObj,
  bp: ComponentPropResponsiveObject<PaddingValueType>
): PaddingCssObj {
  const { from, until, value, } = bp;
  const [
    newPaddingTop,
    newPaddingInlineStart,
    newPaddingBottom,
    newPaddingInlineEnd,
  ] = getPaddingValues(value).map(sideValue => ({
    from,
    until,
    value: sideValue,
  }));

  if (initialValue != null) {
    const {
      paddingBottom,
      paddingInlineEnd,
      paddingInlineStart,
      paddingTop,
    } = initialValue;

    return {
      paddingBottom: [ ...paddingBottom, newPaddingBottom, ],
      paddingInlineEnd: [ ...paddingInlineEnd, newPaddingInlineEnd, ],
      paddingInlineStart: [ ...paddingInlineStart, newPaddingInlineStart, ],
      paddingTop: [ ...paddingTop, newPaddingTop, ],
    };
  }

  return {
    paddingBottom: [ newPaddingBottom, ],
    paddingInlineEnd: [ newPaddingInlineEnd, ],
    paddingInlineStart: [ newPaddingInlineStart, ],
    paddingTop: [ newPaddingTop, ],
  };
}

function setPadding(paddingOptions: PaddingType): ?PaddingCssObj {
  if (isArray(paddingOptions) && isResponsiveOptions(paddingOptions)) {
    const length = paddingOptions.length;
    if (length === 0) return null;
    // Flow does not understand the refinement in `isResponsiveOptions`
    // $FlowFixMe
    return paddingOptions.reduce(paddingOptionsReducer, null);
  }

  const [
    paddingTop,
    paddingInlineStart,
    paddingBottom,
    paddingInlineEnd,
    // flow doesn't understand the refinement done by the
    // `isResponsiveOptions` predicate, and therefore
    // cannot varify that `paddingOptions` is a `PaddingValueType`.
    // by this stage
    // $FlowFixMe
  ] = getPaddingValues(paddingOptions);
  return { paddingTop, paddingInlineStart, paddingBottom, paddingInlineEnd, };
}
