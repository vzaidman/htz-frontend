// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForBender, } from '@haaretz/app-utils';
import BenderView from './BenderView.js';
import ListDataGetter from '../../ListDataGetter';

const BenderQuery = gql`
  query BenderQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForBender
        }
      }
    }
  }
  ${teaserForBender}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Bender({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={BenderQuery}
      view="Bender"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <BenderView {...props} />}
    </ListDataGetter>
  );
}
