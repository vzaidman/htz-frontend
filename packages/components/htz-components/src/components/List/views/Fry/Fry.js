// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';
import FryView from './FryView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

const FryQuery = gql`
  query FryQuery($listId: String!, $history: [ID]) {
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

export default function Fry({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={FryQuery}
      view="Fry"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <FryView {...props} />}
    </ListDataGetter>
  );
}
