// @flow

import * as React from 'react';
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import CardContent from '../CardContent/CardContent';
import CardFooter from '../CardFooter/CardFooter';
import GridItem from '../Grid/GridItem';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';
import type {
  ColorType,
  PaddingType,
  CardContentSeperator,
} from '../CardContent/cardContentStyle';

type TeaserContentType = {
  data: TeaserDataType,
  // main content block props
  attrs: attrFlowType,
  backgroundColor: ColorType,
  color: ColorType,
  padding: PaddingType,
  /**
   * The width of the underlying `<TeaserContent />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <TeaserContent /> spans 25% (3 of 12 columns)
   * <TeaserContent width={3 / 12} />
   *
   * // responsive settings:
   * <TeaserContent
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: number | ComponentPropResponsiveObject<number>[],
  miscStyles: StyleProps,
  // footer block props
  footerAttrs: attrFlowType,
  footerBackgroundColor: ColorType,
  footerColor: ColorType,
  footerPadding: PaddingType,
  footerSeperator: CardContentSeperator,
  footerMiscStyles: StyleProps,
  // render props
  renderContent: (data: TeaserDataType) => React.Node,
  renderFooter: (data: TeaserDataType) => React.Node,
};

TeaserContent.defaultProps = {
  attrs: null,
  backgroundColor: null,
  color: null,
  padding: null,
  width: null,
  miscStyles: null,
  // footer block props
  footerAttrs: null,
  footerBackgroundColor: null,
  footerColor: null,
  footerPadding: null,
  footerSeperator: null,
  footerMiscStyles: null,
  // render props
  renderContent: null,
  renderFooter: null,
};

export default function TeaserContent({
  data,
  // main content block props
  attrs,
  backgroundColor,
  color,
  padding,
  width,
  miscStyles,
  // footer block props
  footerAttrs,
  footerBackgroundColor,
  footerColor,
  footerPadding,
  footerSeperator,
  footerMiscStyles,
  // render props
  renderContent,
  renderFooter,
}: TeaserContentType): React.Node {
  return (
    (renderContent || renderFooter) && (
      <GridItem width={width} stretchContent>
        <CardContent
          {...{ attrs, backgroundColor, color, padding, miscStyles, }}
        >
          {renderContent && renderContent(data)}
        </CardContent>

        {renderFooter && (
          <CardFooter
            tagName="footer"
            attrs={footerAttrs}
            backgroundColor={footerBackgroundColor}
            color={footerColor}
            padding={footerPadding}
            seperator={footerSeperator}
            miscStyles={footerMiscStyles}
          >
            {renderFooter(data)}
          </CardFooter>
        )}
      </GridItem>
    )
  );
}
