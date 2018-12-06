// @flow

import React from 'react';
import { FelaComponent, } from 'react-fela';
import type { Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import { borderTop, parseStyleProps, } from '@haaretz/htz-css-tools';
import type { ListExtraLinkType, } from '../../flowTypes/ListExtraLinkType';
import Section from '../AutoLevels/Section';
import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import TextLink from '../TextLink/TextLink';
import IconAlefLogoTransparent from '../Icon/icons/IconAlefLogoTransparent';
import Button from '../Button/Button';

type Props = {
  /**
   * The background color of the sideBar.
   */
  backgroundColor: ?string,

  /**
   * A commercial link and text.
   */
  commercialLinks: ?(ListExtraLinkType[]),
  /**
   * A marketing tool, title and subTitle.
   */
  marketingTeaser: ?{
    title: string,
    href: string,
    subtitle?: string,
    cta: string,
  },
  // marketingTool: ?{
  //   title: string,
  //   subTitle: string,
  //   buttonText: string,
  //   href: string,
  // },
  /**
   * A list of links to display.
   */
  extraLinks: ?(ListExtraLinkType[]),

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

ListViewMeta.defaultProps = {
  backgroundColor: null,
  commercialLinks: null,
  extraLinks: null,
  miscStyles: null,
  title: null,
};

export default function ListViewMeta({
  backgroundColor,
  commercialLinks,
  extraLinks,
  marketingTeaser,
  miscStyles,
  title,
}: Props): Node {
  return (
    <FelaComponent
      style={theme => ({
        backgroundColor: backgroundColor || theme.color('bg'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        extend: [
          theme.mq(
            { until: 'l', },
            borderTop('2px', 1, 'solid', theme.color('primary'))
          ),
          theme.mq(
            { from: 'l', },
            borderTop('5px', 1, 'solid', theme.color('primary'))
          ),
          // Trump all other styles with those defined in `miscStyles`
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, theme, }) => (
        <Section className={className}>
          <FelaComponent
            style={{
              extend: [
                theme.mq(
                  { until: 'l', },
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }
                ),
              ],
            }}
          >
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
              <FelaComponent style={{ marginTop: '1rem', }} render="ul">
                {extraLinks.map((item, idx) => (
                  <FelaComponent
                    style={{
                      color: theme.color('neutral', '-3'),
                      fontWeight: 700,
                      extend: [
                        theme.type(-1, { lines: 4, }),
                        theme.mq({ until: 's', }, { display: 'none', }),
                        theme.mq(
                          { from: 's', until: 'l', },
                          { display: 'inline-block', }
                        ),
                      ],
                    }}
                    render="li"
                    key={item.contentId}
                  >
                    <HtzLink href={item.href}>{item.linkText}</HtzLink>
                    {idx !== extraLinks.length - 1 && (
                      <FelaComponent
                        style={{
                          display: 'none',
                          marginRight: '1rem',
                          marginLeft: '1rem',
                          extend: [
                            theme.mq(
                              { from: 's', until: 'l', },
                              { display: 'inline-block', }
                            ),
                          ],
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
          </FelaComponent>
          {(commercialLinks || marketingTeaser) && (
            <FelaComponent
              style={{
                extend: [ theme.mq({ until: 'l', }, { display: 'none', }), ],
              }}
            >
              {marketingTeaser ? (
                <Section>
                  <IconAlefLogoTransparent color="secondary" size={3} />
                  <FelaComponent
                    style={{ color: theme.color('secondary'), }}
                    render={({ className, }) => (
                      <H className={className}>{marketingTeaser.title}</H>
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
        </Section>
      )}
    />
  );
}
