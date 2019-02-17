// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';
import FarnsworthView from './FarnsworthView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const FarnsworthQuery = gql`
  query FarnsworthQuery($listId: String!, $history: [ID], $section: String) {
    list(listId: $listId, history: $history, section: $section) {
      isLazyloadImages
      lazyloadDistance
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
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Farnsworth(props: Props): React.Node {
  return (
    <ListDataGetter query={FarnsworthQuery} view="Farnsworth" {...props}>
      {dataProps => <FarnsworthView {...dataProps} />}
    </ListDataGetter>
  );
}
