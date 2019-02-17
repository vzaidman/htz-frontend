// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';
import ListDataGetter from '../../ListDataGetter';
import VogelView from './VogelView';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const VogelQuery = gql`
  query VogelQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      isLazyloadImages
      lazyloadDistance
      items {
        ... on TeaserInList {
          inputTemplate
          contentId
          title
          titleMobile
          exclusive
          exclusiveMobile
          path
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
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Vogel(props: Props): React.Node {
  return (
    <ListDataGetter query={VogelQuery} view="Vogel" {...props}>
      {dataProps => <VogelView {...dataProps} />}
    </ListDataGetter>
  );
}
