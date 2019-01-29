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
import Query from '../ApolloBoundary/Query';
import type { ListExtraLinkType, } from '../../flowTypes/ListExtraLinkType';
import type { ListMarketingTeaserType, } from '../../flowTypes/ListMarketingTeaserType';
import type { ListBiActionType, } from '../../flowTypes/ListBiActionType';

import Button from '../Button/Button';
import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import IconAlefLogoTransparent from '../Icon/icons/IconAlefLogoTransparent';
import IconBack from '../Icon/icons/IconBack';
import Section from '../AutoLevels/Section';
import setColor from '../../utils/setColor';
import { getUser, } from './getUser';

type BackgroundColorType =
  | string
  | [string, ]
  | [string, string, ]
  | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[];

type Props = {
  /** is the list header horizontal on large viewports */
  isHorizontal: boolean,
  /** Is the list's title padded at its inline start across breakpoints */
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
  /** A list of links to display. */
  extraLinks: ?(ListExtraLinkType[]),
  /** A commercial link and text. */
  commercialLinks: ?(ListExtraLinkType[]),
  /** A marketing tool, title and subTitle. */
  marketingTeaser: ?ListMarketingTeaserType,
  /** The List Title. */
  title: ?string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: ?StyleProps,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values of the tile. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  titleMiscStyles: ?StyleProps,
  /** URL that leads to section of list. */
  url: ?string,
  /** Is it vertical list. */
  isVertical: boolean,
  isCommercial: boolean,
  /**
   * Useful for bi actions and events
   *
   * Should also be passed to underlying links, e.g.,
   * around the title and image
   */
  biAction: ?ListBiActionType,
};

ListViewHeader.defaultProps = {
  isCommercial: false,
  isHorizontal: false,
  hasTitlePadding: false,
  backgroundColor: [ { until: 's', value: [ 'neutral', '-10', ], }, ],
  isVertical: false,
  commercialLinks: null,
  marketingTeaser: null,
  extraLinks: null,
  miscStyles: null,
  titleMiscStyles: null,
  title: null,
  url: null,
  biAction: null,
};

export default function ListViewHeader({
  isCommercial,
  isHorizontal,
  isVertical,
  hasTitlePadding,
  backgroundColor,
  commercialLinks,
  extraLinks,
  marketingTeaser,
  miscStyles,
  titleMiscStyles,
  title,
  url,
  biAction,
}: Props): React.Node {
  return (
    <FelaComponent
      backgroundColor={backgroundColor}
      isHorizontal={isHorizontal}
      isVertical={isVertical}
      hasTitlePadding={hasTitlePadding}
      miscStyles={miscStyles}
      isCommercial={isCommercial}
      rule={listViewHeaderStyle}
      render={({ className, theme, }) => (
        <header className={className}>
          {title && (
            <FelaComponent
              style={{
                ...(isCommercial
                  ? {
                    color: theme.color('commercial'),
                    fontFamily: theme.fontStacks.commercial,
                  }
                  : { color: theme.color('primary'), }),
                fontWeight: 700,
                extend: [
                  isHorizontal && hasTitlePadding
                    ? { paddingInlineStart: '1rem', }
                    : theme.mq({ until: 's', }, { paddingInlineStart: '1rem', }),
                  theme.mq(
                    { until: 's', },
                    {
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                    }
                  ),
                  // Trump all other styles with those defined in `miscStyles`
                  ...(titleMiscStyles
                    ? parseStyleProps(titleMiscStyles, theme.mq, theme.type)
                    : []),
                ],
              }}
              render={({ className: headerClass, }) => (url ? (
                <FelaComponent
                  style={{
                    extend: [ theme.mq({ until: 's', }, { display: 'flex', width: '100%', }), ],
                  }}
                  render={({ className: linkClassName, }) => (
                    <HtzLink className={linkClassName} href={url}>
                      <H className={headerClass}>
                        {title}
                        <IconBack
                          size={isVertical ? 6 : 7}
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
                ...(isHorizontal ? { marginInlineStart: 'auto', } : {}),
                extend: [
                  theme.mq({ until: 's', }, { display: 'none', }),
                  theme.mq({ from: 's', until: 'l', }, { direction: 'ltr', paddingStart: '2rem', }),
                  theme.mq({ until: 'l', }, { fontWeight: '700', }),
                  theme.type(-1, { fromBp: 's', untilBp: 'l', }),
                  theme.type(-1, { fromBp: 'l', untilBp: 'xl', lines: 4, }),
                  theme.type(-2, { fromBp: 'xl', lines: 4, }),
                  ...(isHorizontal
                    ? []
                    : [ theme.mq({ until: 'l', }, { marginInlineStart: 'auto', }), ]),
                ],
              }}
              render="ul"
            >
              {extraLinks.map((item, idx) => (
                <FelaComponent
                  style={{
                    extend: [ theme.mq({ until: 'l', }, { display: 'inline-block', }), ],
                  }}
                  render="li"
                  key={item.contentId}
                >
                  <FelaComponent
                    style={{
                      ':hover': {
                        color: theme.color('neutral', -1),
                      },
                    }}
                    render={({ className, }) => (
                      <HtzLink
                        href={item.href}
                        className={className}
                        onClick={
                          biAction
                            ? () => biAction({
                              index: idx,
                              articleId: item.contentId,
                            })
                            : null
                        }
                      >
                        {item.linkText || item.contentName}
                      </HtzLink>
                    )}
                  />
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
                <Query query={getUser}>
                  {({ loading, error, data, }) => {
                    if (loading) return null;
                    if (error) return null;
                    if (data && data.user.type !== 'paying') {
                      return (
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
                      );
                    }
                    return null;
                  }}
                </Query>
              ) : (
                !isHorizontal
                && commercialLinks && (
                  <FelaComponent
                    style={{
                      color: theme.color('commercial'),
                      extend: [ theme.type(-1), ],
                      fontFamily: theme.fontStacks ? theme.fontStacks.commercial : undefined,
                    }}
                    render={({ className: commercialHeaderClassName, }) => (
                      <React.Fragment>
                        <H className={commercialHeaderClassName}>{theme.commercialListI18n.text}</H>

                        <FelaComponent
                          style={{
                            color: theme.color('neutral', '-3'),
                            fontFamily: theme.fontStacks ? theme.fontStacks.commercial : undefined,
                            extend: [
                              theme.mq({ until: 'l', }, { display: 'none', }),
                              theme.type(0, { fromBp: 'l', untilBp: 'xl', lines: 4, }),
                              theme.type(-2, { fromBp: 'xl', lines: 4, }),
                            ],
                          }}
                          render="ul"
                        >
                          {commercialLinks.map((commercialLink, idx) => (
                            <FelaComponent
                              style={theme => ({
                                marginBottom: idx < commercialLinks.length - 1 ? '1rem' : '0',

                                '&:hover': { textDecoration: 'underline', },
                                '&:focus': { textDecoration: 'underline', },
                              })}
                              key={commercialLink.contentId}
                              render="li"
                            >
                              <HtzLink
                                href={commercialLink.href}
                                onClick={
                                  biAction
                                    ? () => biAction({
                                      index: idx,
                                      articleId: commercialLink.contentId,
                                    })
                                    : null
                                }
                              >
                                {commercialLink.contentName}
                              </HtzLink>
                            </FelaComponent>
                          ))}
                        </FelaComponent>
                      </React.Fragment>
                    )}
                  />
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
  isVertical,
  isCommercial,
  backgroundColor,
  isHorizontal,
  miscStyles,
}) {
  return {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    justifyContent: 'flex-start',
    extend: [
      ...(isVertical
        ? [
          theme.type(2, { untilBp: 's', lines: 7, }),
          theme.type(1, { fromBp: 's', untilBp: 'xl', }),
          theme.type(0, { fromBp: 'xl', }),
        ]
        : [ theme.type(2, { untilBp: 's', lines: 7, }), theme.type(2, { fromBp: 's', }), ]),
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
        {
          ...borderTop(
            '1px',
            0,
            'solid',
            isCommercial ? theme.color('commercial') : theme.color('primary')
          ),
          alignItems: 'center',
        }
      ),
      theme.mq(
        { from: 's', until: isHorizontal ? null : 'l', },
        {
          ...borderTop(
            '2px',
            1,
            'solid',
            isCommercial ? theme.color('commercial') : theme.color('primary')
          ),
          paddingBottom: '1rem',
        }
      ),
      ...(isHorizontal
        ? []
        : [
          theme.mq(
            { from: 'l', },
            borderTop(
              '5px',
              2,
              'solid',
              isCommercial ? theme.color('commercial') : theme.color('primary')
            )
          ),
          theme.mq({ from: 'l', }, { flexDirection: 'column', }),
        ]),
      // Trump all other styles with those defined in `miscStyles`
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}
