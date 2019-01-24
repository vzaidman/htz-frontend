// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, link, } from '@haaretz/app-utils';
import SpawnView from './SpawnView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const SpawnQuery = gql`
  query SpawnQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      commercialLinks {
        ...Link
      }
      extraLinks {
        ...Link
      }
      marketingTeaser {
        title
        href
        subtitle
        cta
      }
      items {
        ... on TeaserInList {
          firstParagraph
          commentsCounts
          contentId
          representedContent
          title
          titleMobile
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          publishDate
          lastUpdate
          authors {
            contentName
          }
          authorImage {
            ...Image
          }
          image {
            ...Image
          }
        }
      }
    }
  }
  ${image}
  ${link}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Spawn(props: Props): React.Node {
  return (
    <ListDataGetter query={SpawnQuery} view="Spawn" {...props}>
      {dataProps => <SpawnView {...dataProps} />}
    </ListDataGetter>
  );
}
