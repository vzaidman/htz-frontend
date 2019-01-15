// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';

import type { Node, } from 'react';

import HtzLink from '../HtzLink/HtzLink';
import ListView from '../ListView/ListView';
import GridItem from '../Grid/GridItem';

type TopNewsProps = {
  newsItems: [
    {
      href: string,
      toolTip: string,
      inputTemplate: string,
      contentId: string,
      contentName: string,
    },
  ],
  // contentId: string,
  contentName: string,
};

function TopNews({ newsItems, contentName, }: TopNewsProps): Node {
  return (
    <FelaComponent
      style={theme => ({
        // paddingRight: '4rem',
        // paddingLeft: '4rem',
        extend: [ theme.mq({ until: 'l', }, { display: 'none', }), ],
      })}
      render={({ theme, className, }) => (
        <div className={className}>
          <FelaComponent
            style={{ color: theme.color('tertiary'), fontWeight: 700, extend: [ theme.type(-1), ], }}
            render="span"
          >
            {contentName}
            {' '}
          </FelaComponent>
          {newsItems
            && newsItems.map((link, idx) => {
              const isLast = idx === newsItems.length - 1;
              return (
                <FelaComponent
                  key={link.contentName}
                  style={{
                    fontWeight: '700',
                    color: theme.color(...(isLast ? [ 'primary', '+1', ] : [ 'neutral', ])),
                    extend: [ theme.type(-1), ],
                  }}
                  render={({ className: linkClass, }) => (
                    <HtzLink className={linkClass} href={link.href}>
                      {link.contentName}
                      {isLast ? null : ' | '}
                    </HtzLink>
                  )}
                />
              );
            })}
        </div>
      )}
    />
  );
}

type Props = TopNewsProps & {
  withoutWrapper?: boolean,
}

export default function ({ withoutWrapper = false, ...props }: Props): Node {
  return (
    withoutWrapper
      ? (
        <TopNews {...props} />
      )
      : (
        <ListView
          padding={[ 0, 4, ]}
          gutter={4}
          innerBackgroundColor={[ 'neutral', '-10', ]}
        >
          <GridItem width={1}>
            <TopNews {...props} />
          </GridItem>
        </ListView>
      )
  );
}
