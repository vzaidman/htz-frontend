// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';
import FarnsworthView from './FarnsworthView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

const FarnsworthQuery = gql`
  query FarnsworthQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
        }
      }
    }
  }
  ${teaserForLeftElement}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Farnsworth({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={FarnsworthQuery}
      view="Farnsworth"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <FarnsworthView {...props} />}
    </ListDataGetter>
  );
}
