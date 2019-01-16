// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import Section from '../AutoLevels/Section';

type Props = {
  newsItems: [
    {
      href: string,
      toolTip: string,
      inputTemplate: string,
      contentId: string,
      contentName: string,
    },
  ],
  contentName: string,
};

function TopNews({ newsItems, contentName, }: Props): React.Node {
  const topBottomPadding = 1;
  return (
    <LayoutRow>
      <LayoutContainer
        tagname="section"
        namedBgc="white"
        miscStyles={{ paddingBottom: '2rem', }}
      >
        <FelaComponent
          style={theme => ({
            paddingInlineEnd: '4rem',
            paddingTop: `${topBottomPadding}rem`,
            paddingInlineStart: '4rem',
            extend: [
              theme.mq({ until: 'l', }, { display: 'none', }),
              theme.type(-1, { until: 'xl', }),
              theme.type(-2, { from: 'xl', }),
              borderBottom('2px', topBottomPadding, 'solid', theme.color('bg')),
            ],
          })}
          render={({ theme, className, }) => (
            <Section tagName="div" className={className}>
              <FelaComponent
                style={{
                  color: theme.color('tertiary'),
                  display: 'inline',
                  fontWeight: '700',
                  paddingInlineEnd: '1rem',
                }}
                render={({ className: headerClassName, }) => (
                  <H className={headerClassName} offset={2}>
                    {contentName}
                  </H>
                )}
              />
              {newsItems
                && newsItems.map((link, idx) => {
                  const isLast = idx === newsItems.length - 1;
                  const hoverFocusStyle = {
                    textDecoration: 'underline',
                    textDecorationColor: theme.color('primary', '-2'),
                  };
                  return (
                    <HtzLink href={link.href}>
                      <FelaComponent
                        key={link.contentName}
                        style={{
                          fontWeight: '700',
                          color: theme.color(
                            ...(isLast ? [ 'primary', '+1', ] : [ 'neutral', ])
                          ),
                          '&:hover': hoverFocusStyle,
                          '&:focus': hoverFocusStyle,
                        }}
                        render="span"
                      >
                        {link.contentName}
                      </FelaComponent>
                      {isLast ? null : ' | '}
                    </HtzLink>
                  );
                })}
            </Section>
          )}
        />
      </LayoutContainer>
    </LayoutRow>
  );
}

export default TopNews;
