// @flow
import * as React from 'react';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import TeaserTime from '../../../TeaserTime/TeaserTime';

import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

export type DisplayFlagsType = {
  authors?: boolean,
  commentsCount?: boolean,
  publishDate?: boolean,
}

type Props = {
  data: TeaserDataType,
  displayFlags: DisplayFlagsType,
}

export default function TeaserFooter({ data, displayFlags, }: Props): React.Node {
  return (
    <React.Fragment>
      {displayFlags.authors && data.authors ? (
        <span style={{ marginInlineEnd: '1rem', }}>
          <TeaserAuthors authors={data.authors} miscStyles={{ fontWeight: 'bold', }} />
          {displayFlags.publishDate ? (
            <React.Fragment>
              <span> | </span>
              <TeaserTime {...data} />
            </React.Fragment>
          ) : null}
        </span>
      ) : null}
      {displayFlags.commentsCount ? <CommentsCount commentsCount={data.commentsCounts} /> : null}
    </React.Fragment>
  );
}
