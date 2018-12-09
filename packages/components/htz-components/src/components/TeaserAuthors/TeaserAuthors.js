// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';

type TeaserAuthorsPropTypes = {
  authors: {
    name: string,
    url?: ?string,
  }[],
  limit: number,
};

const InlineAddress = ({ children, }: { children: React.Node, }): React.Node => (
  <FelaComponent style={{ display: 'inline', }} render="address">
    {children}
  </FelaComponent>
);

const TeaserAuthors = ({
  authors = [],
  limit = 2,
}: TeaserAuthorsPropTypes): React.Node => {
  if (!authors || authors.length === 0) return null;

  const commaMaxIndex = Math.min(authors.length, limit) - 1;
  return (
    <React.Fragment>
      {authors
        .slice(0, limit)
        .map((author, idx) => (
          <React.Fragment key={author.name}>
            <InlineAddress>
              {author.name}
            </InlineAddress>
            {idx < commaMaxIndex ? ', ' : ''}
          </React.Fragment>
        ))
      }
    </React.Fragment>
  );
};

export default TeaserAuthors;
