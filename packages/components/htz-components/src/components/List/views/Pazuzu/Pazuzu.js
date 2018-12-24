// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';
import PazuzuView from './PazuzuView.js';
import ListDataGetter from '../../ListDataGetter';

const PazuzuQuery = gql`
  query PazuzuQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          inputTemplate
          rank
          commentsCounts
          contentId
          title
          titleMobile
          path
          publishDate
          lastUpdate
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
  viewProps: Object,
};

export default function Pazuzu({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
  viewProps,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={PazuzuQuery}
      view="Pazuzu"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
        viewProps,
      }}
    >
      {props => <PazuzuView {...props} />}
    </ListDataGetter>
  );
}
