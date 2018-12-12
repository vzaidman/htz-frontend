// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';

type Props = {
  className: ?string,
  links: [
    {
      contentId: string,
      contentName: string,
      inputTemplate: string,
      href: string,
      toolTip: string,
    },
  ],
};

TopNews.defaultProps = {
  className: null,
};

function TopNews({ links, className, }: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <div className={className}>
          <FelaComponent
            style={{ color: theme.color('tertiary'), fontWeight: 700, extend: [ theme.type(-1), ], }}
            render="span"
          >
            {theme.topNewsI18n.title}
            {' '}
          </FelaComponent>
          {links
            && links.map((link, idx) => {
              const isLast = idx === links.length - 1;
              return (
                <FelaComponent
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
