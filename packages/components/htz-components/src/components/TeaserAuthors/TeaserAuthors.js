// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

type TeaserAuthorsPropTypes = {
  authors: ?({
    contentName: string,
    url?: ?string,
  }[]),
  limit: number,
  miscStyles?: ?StyleProps,
};

const InlineAddress = ({
  children,
  miscStyles,
}: {
  children: React.Node,
  miscStyles: ?StyleProps,
}): React.Node => (
  <FelaComponent
    style={theme => ({
      display: 'inline',
      extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
    render="address"
  >
    {children}
  </FelaComponent>
);

const TeaserAuthors = ({
  authors,
  limit,
  miscStyles,
}: TeaserAuthorsPropTypes): React.Node => {
  if (!authors || !authors.length) return null;

  const commaMaxIndex = Math.min(authors.length, limit) - 1;
  return (
    <React.Fragment>
      {authors.slice(0, limit).map((author, idx) => (
        <React.Fragment key={author.contentName}>
          <InlineAddress miscStyles={miscStyles}>
            {author.contentName}
          </InlineAddress>
          {idx < commaMaxIndex ? ', ' : ''}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

TeaserAuthors.defaultProps = {
  authors: null,
  limit: 2,
  miscStyles: null,
};

export default TeaserAuthors;
