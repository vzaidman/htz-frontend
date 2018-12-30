// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';

type Props = {
  contentLists: [
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

function TopNews({ contentLists, contentName, }: Props): React.Node {
  return (
    <FelaComponent
      style={theme => ({
        paddingRight: '4rem',
        paddingLeft: '4rem',
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
          {contentLists
            && contentLists.map((link, idx) => {
              const isLast = idx === contentLists.length - 1;
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

export default TopNews;
