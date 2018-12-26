// @flow

import {
  type ComponentPropResponsiveObject,
  type StyleProps,
  borderTop,
  parseComponentProp,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import * as React from 'react';

import type { ListExtraLinkType, } from '../../flowTypes/ListExtraLinkType';
import type { ListMarketingTeaserType, } from '../../flowTypes/ListMarketingTeaserType';
import Button from '../Button/Button';
import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import IconAlefLogoTransparent from '../Icon/icons/IconAlefLogoTransparent';
import IconBack from '../Icon/icons/IconBack';
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
   * Is the list's title padded at its inline start across breakpoints
   */
  hasTitlePadding: boolean,
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
  backgroundColor: ?BackgroundColorType,
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
  /**
   * URL that leads to section of list.
   */
  url: ?string,
  isCommercial: boolean,
};

ListViewHeader.defaultProps = {
  isCommercial: false,
  isHorizontal: false,
  hasTitlePadding: false,
  backgroundColor: null,
  commercialLinks: null,
  marketingTeaser: null,
  extraLinks: null,
  miscStyles: null,
  title: null,
  url: null,
};

export default function ListViewHeader({
  isCommercial,
  isHorizontal,
  hasTitlePadding,
  backgroundColor,
  commercialLinks,
  extraLinks,
  marketingTeaser,
  miscStyles,
  title,
  url,
}: Props): React.Node {
  return (
    <FelaComponent
      backgroundColor={backgroundColor}
      isHorizontal={isHorizontal}
      hasTitlePadding={hasTitlePadding}
      miscStyles={miscStyles}
      isCommercial={isCommercial}
      rule={listViewHeaderStyle}
      render={({ className, theme, }) => (
        <header className={className}>
          {title && (
            <FelaComponent
              style={{
                color: isCommercial ? theme.color('commercial') : theme.color('primary'),
                fontWeight: 700,
                extend: [
                  theme.type(2),
                  isHorizontal && hasTitlePadding
                    ? { paddingInlineStart: '1rem', }
                    : theme.mq({ until: 's', }, { paddingInlineStart: '1rem', }),
                  theme.mq(
                    { until: 's', },
                    {
                      display: 'flex',
                      width: '100%',
                    }
                  ),
                ],
              }}
              render={({ className: headerClass, }) => (url ? (
                <FelaComponent
                  style={{
                    extend: [ theme.mq({ until: 's', }, { display: 'flex', width: '100%', }), ],
                  }}
                  render={({ clazzName, }) => (
                    <HtzLink className={clazzName} href={url}>
                      <H className={headerClass}>
                        {title}
                        <IconBack
                          size={6}
                          miscStyles={{
                            marginInlineStart: 'auto',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            backgroundColor: theme.color('quaternary'),
                            ...theme.mq({ from: 's', }, { display: 'none', }),
                          }}
                        />
                      </H>
                    </HtzLink>
                  )}
                />
              ) : (
                <H className={headerClass}>{title}</H>
              ))
              }
            />
          )}
          {extraLinks && (
            <FelaComponent
              style={{
                marginTop: '1rem',
                color: theme.color('neutral', '-3'),
                fontWeight: 700,
                ...(isHorizontal ? { marginInlineStart: 'auto', } : {}),
                extend: [
                  theme.mq({ until: 's', }, { display: 'none', }),
                  theme.type(-1, { until: 'xl', }),
                  theme.type(-2, { from: 'xl', }),
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
                    extend: [
                      theme.mq({ until: 'l', }, { display: 'inline-block', }),
                    ],
                  }}
                  render="li"
                  key={item.contentId}
                >
                  <HtzLink href={item.href}>{item.linkText || item.contentName}</HtzLink>
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
              {!isHorizontal && marketingTeaser && marketingTeaser.href ? (
                <Section>
                  <IconAlefLogoTransparent color="secondary" size={3} />
                  <FelaComponent
                    style={{ color: theme.color('secondary'), }}
                    render={({ className: marketingHeaderClassName, }) => (
                      <H className={marketingHeaderClassName}>{marketingTeaser.title}</H>
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
                !isHorizontal
                && commercialLinks && (
                  <ul>
                    {commercialLinks.map((commercialLink, idx) => (
                      <FelaComponent
                        style={theme => ({
                          color: theme.color('commercial'),
                          fontFamily: theme.fontStacks
                            ? theme.fontStacks.commercial
                            : undefined,
                          marginBottom:
                            idx < commercialLinks.length - 1 ? '1rem' : '0',

                          '&:hover': { textDecoration: 'underline', },
                          '&:focus': { textDecoration: 'underline', },

                          extend: [
                            theme.type(-1, { until: 'xl', }),
                            theme.type(-2, { from: 'xl', }),
                          ],
                        })}
                        key={commercialLink.contentId}
                        render="li"
                      >
                        <HtzLink href={commercialLink.href}>
                          {commercialLink.contentName}
                        </HtzLink>
                      </FelaComponent>
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

function listViewHeaderStyle({ theme, isCommercial, backgroundColor, isHorizontal, miscStyles, }) {
  return {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    justifyContent: 'flex-start',
    extend: [
      // eslint-disable-next-line space-infix-ops, no-mixed-operators
      ...(backgroundColor
        ? [
          parseComponentProp<BackgroundColorType>(
            'backgroundColor',
            backgroundColor,
            theme.mq,
            setColor,
            theme.color
          ),
        ]
        : []),
      theme.mq(
        { until: 's', },
        borderTop(
          '1px',
          0,
          'solid',
          isCommercial ? theme.color('commercial') : theme.color('primary')
        )
      ),
      theme.mq(
        { from: 's', until: isHorizontal ? null : 'l', },
        {
          ...borderTop(
            '2px',
            0,
            'solid',
            isCommercial ? theme.color('commercial') : theme.color('primary')
          ),
          paddingBottom: '1rem',
        }
      ),
      ...(isHorizontal
        ? []
        : [
          theme.mq({ from: 'l', }, borderTop('5px', 1, 'solid', theme.color('primary'))),
          theme.mq({ from: 'l', }, { flexDirection: 'column', }),
        ]),
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}
