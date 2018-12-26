// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';

import H from '../AutoLevels/H';
import HtzLink from '../HtzLink/HtzLink';
import Time from '../Time/Time';

export type BreakingNewsItemType = {
  title: string,
  creationDateTime: number,
  // eslint-disable-next-line react/no-unused-prop-types
  url: ?string,
};

type BreakingNewsItemProps = BreakingNewsItemType & {
  isVisible: boolean,
  animationDuration: number,
};

BreakingNewsItem.defaultProps = {
  url: null,
};

export default function BreakingNewsItem({
  isVisible,
  animationDuration,
  title,
  creationDateTime,
  url,
}: BreakingNewsItemProps): React.Node {
  return (
    <FelaComponent
      render="li"
      style={theme => ({
        position: 'absolute',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        zIndex: isVisible ? 1 : 0,
        transitionProperty: 'opacity, visibility',
        ...theme.getDuration('transition', animationDuration),
        ...theme.getTimingFunction('transition', 'swiftOut'),
      })}
    >
      <FelaComponent style={theme => ({ ...theme.type(-1, { lines: 3, }), })} render="article">
        {url ? (
          <HtzLink href={url}>
            <BreakingNewsContent title={title} creationDateTime={creationDateTime} />
          </HtzLink>
        ) : (
          <BreakingNewsContent title={title} creationDateTime={creationDateTime} />
        )}
      </FelaComponent>
    </FelaComponent>
  );
}

/* ****************************************
  Breaking news content component
 ****************************************** */
type BreakingNewsContentType = {
  title: string,
  creationDateTime: number,
}
function BreakingNewsContent({ title, creationDateTime, }: BreakingNewsContentType): React.Node {
  return (
    <React.Fragment>
      <FelaComponent
        style={{
          fontWeight: 700,
          marginInlineEnd: '1rem',
        }}
        render={({ className, }) => (
          <Time time={creationDateTime} format="HH:mm" className={className} />
        )}
      />
      <FelaComponent
        style={{ display: 'inline', fontWeight: 400, }}
        render={({ className, }) => <H className={className}>{title}</H>}
      />
    </React.Fragment>
  );
}
