// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';
import SlugsView from './SlugsView.js';
import ListDataGetter from '../../ListDataGetter';

const SlugsQuery = gql`
  query SlugsQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          commentsCounts
          contentId
          title
          titleMobile
          exclusive
          exclusiveMobile
          path
          publishDate
          lastUpdate
          rank
          inputTemplate
          authors {
            contentName
          }
          image {
            ...Image
          }
        }
      }
    }
  }
  ${image}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Slugs({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={SlugsQuery}
      view="Slugs"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <SlugsView {...props} />}
    </ListDataGetter>
  );
}
