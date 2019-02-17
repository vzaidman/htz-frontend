// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, link, } from '@haaretz/app-utils';
import CalculonView from './CalculonView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const CalculonQuery = gql`
  query CalculonQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      lazyloadDistance
      commercialLinks {
        ...Link
      }
      extraLinks {
        ...Link
      }
      # marketingTeaser
      title
      url
      items {
        ... on TeaserInList {
          commentsCounts
          contentId
          exclusive
          exclusiveMobile
          inputTemplate
          lastUpdate
          path
          publishDate
          title
          titleMobile
          rank
          representedContent
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
  ${link}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Calculon(props: Props): React.Node {
  return (
    <ListDataGetter query={CalculonQuery} view="Calculon" {...props}>
      {dataProps => <CalculonView {...dataProps} />}
    </ListDataGetter>
  );
}
