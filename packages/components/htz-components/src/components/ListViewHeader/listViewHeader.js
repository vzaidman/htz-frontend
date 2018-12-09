// @flow

import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  borderTop,
  parseComponentProp,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import React, { type Node, } from 'react';

import type { ListExtraLinkType, } from '../../flowTypes/ListExtraLinkType';
import type { ListMarketingTeaserType, } from '../../flowTypes/ListMarketingTeaserType';
import Button from '../Button/Button';
import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import IconAlefLogoTransparent from '../Icon/icons/IconAlefLogoTransparent';
import Section from '../AutoLevels/Section';
import TextLink from '../TextLink/TextLink';
import setColor from '../../utils/setColor';

type BackgroundColorType =
  | string
  | [string, ]
  | [string, string, ]
  | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[];

type Props = {
  /**
   * is the list header horizontal on large viewports
   */
  isHorizontal: boolean,
  /**
   * The background color of the <ListViewHeader />.
   * Can be:
   *   - A `string` representing a named color.
   *   - A `tuple` of two `string`s, the first representing.
   *     a named color, and the second representing a variant
   *     of that named color.
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: string or tuple, as mentioned above,
   *     }
   *     ```
   */
  backgroundColor: ?(BackgroundColorType[]),
  /**
   * A list of links to display.
   */
  extraLinks: ?(ListExtraLinkType[]),
  /**
   * A commercial link and text.
   */
  commercialLinks: ?(ListExtraLinkType[]),
  /**
   * A marketing tool, title and subTitle.
   */
  marketingTeaser: ?ListMarketingTeaserType,

  /**
   * The List Title.
   */
  title: ?string,

  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: ?StyleProps,
};

ListViewHeader.defaultProps = {
  isHorizontal: false,
  backgroundColor: null,
  commercialLinks: null,
  extraLinks: null,
  miscStyles: null,
  title: null,
};

export default function ListViewHeader({
  isHorizontal,
  backgroundColor,
  commercialLinks,
  extraLinks,
  marketingTeaser,
  miscStyles,
  title,
}: Props): Node {
  return (
    <FelaComponent
      backgroundColor={backgroundColor}
      isHorizontal={isHorizontal}
      miscStyles={miscStyles}
      rule={listViewHeaderStyle}
      render={({ className, theme, }) => (
        <header className={className}>
          {title && (
            <FelaComponent
              style={{
                color: theme.color('primary'),
                fontWeight: 700,
                extend: [ theme.type(2), ],
              }}
              render={({ className: headerClass, }) => (
                <H className={headerClass}>{title}</H>
              )}
            />
          )}
          {extraLinks && (
            <FelaComponent
              style={{
                marginTop: '1rem',
                ...(isHorizontal ? { marginInlineStart: 'auto', } : {}),
                extend: [
                  theme.mq({ until: 'm', }, { display: 'none', }),
                  isHorizontal
                    ? undefined
                    : theme.mq({ until: 'l', }, { marginInlineStart: 'auto', }),
                ],
              }}
              render="ul"
            >
              {extraLinks.map((item, idx) => (
                <FelaComponent
                  style={{
                    color: theme.color('neutral', '-3'),
                    fontWeight: 700,
                    extend: [
                      theme.type(-1, { lines: 4, }),
                      theme.mq({ until: 'l', }, { display: 'inline-block', }),
                    ],
                  }}
                  render="li"
                  key={item.contentId}
                >
                  <HtzLink href={item.href}>{item.linkText}</HtzLink>
                  {idx !== extraLinks.length - 1 && (
                    <FelaComponent
                      style={{
                        display: 'inline-block',
                        marginRight: '1rem',
                        marginLeft: '1rem',
                        extend: [ theme.mq({ from: 'l', }, { display: 'none', }), ],
                      }}
                      render="span"
                    >
                      {'|'}
                    </FelaComponent>
                  )}
                </FelaComponent>
              ))}
            </FelaComponent>
          )}
          {(commercialLinks || marketingTeaser) && (
            <FelaComponent
              style={{
                marginTop: 'auto',
                extend: [ theme.mq({ until: 'l', }, { display: 'none', }), ],
              }}
            >
              {marketingTeaser ? (
                <Section>
                  <IconAlefLogoTransparent color="secondary" size={3} />
                  <FelaComponent
                    style={{ color: theme.color('secondary'), }}
                    render={({ className: marketingHeaderClassName, }) => (
                      <H className={marketingHeaderClassName}>
                        {marketingTeaser.title}
                      </H>
                    )}
                  />

                  <FelaComponent
                    style={{
                      color: theme.color('secondary'),
                      extend: [ theme.type(-1), ],
                    }}
                  >
                    {marketingTeaser.subtitle}
                  </FelaComponent>
                  <Button
                    variant="salesOpaque"
                    boxModel={{ hp: 4, vp: 0.5, }}
                    miscStyles={{ marginTop: '2rem', type: -1, }}
                    href={marketingTeaser.href}
                  >
                    {marketingTeaser.cta}
                  </Button>
                </Section>
              ) : (
                commercialLinks && (
                  <ul>
                    {commercialLinks.map(commercialLink => (
                      <li key={commercialLink.contentId}>
                        <TextLink
                          href={commercialLink.href}
                          miscStyles={{
                            type: [ { value: -1, options: { lines: 3.5, }, }, ],
                          }}
                        >
                          {commercialLink.linkText}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </FelaComponent>
          )}
        </header>
      )}
    />
  );
}

function listViewHeaderStyle({
  theme,
  backgroundColor,
  isHorizontal,
  miscStyles,
}) {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    extend: [
      // eslint-disable-next-line space-infix-ops, no-mixed-operators
      parseComponentProp<BackgroundColorType>(
        'backgroundColor',
        backgroundColor || 'bg',
        theme.mq,
        setColor,
        theme.color
      ),
      theme.mq(
        { until: 'l', },
        borderTop('2px', 1, 'solid', theme.color('primary'))
      ),
      theme.mq(
        { from: 'l', },
        borderTop('5px', 1, 'solid', theme.color('primary'))
      ),
      ...[
        !isHorizontal
          ? theme.mq({ from: 'l', }, { flexDirection: 'column', })
          : {},
      ],
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}
