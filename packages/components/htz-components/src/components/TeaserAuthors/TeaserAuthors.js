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
}: TeaserAuthorsPropTypes): React.Node => (authors && authors.length > 0 ? (
  <React.Fragment>
    {authors
      .slice(0, limit)
      .map((author, idx) => (
        <InlineAddress key={author.name}>
          {author.name}
          {idx < authors.length - 1 ? ', ' : ''}
        </InlineAddress>
      ))
    }
  </React.Fragment>
) : null);

export default TeaserAuthors;
