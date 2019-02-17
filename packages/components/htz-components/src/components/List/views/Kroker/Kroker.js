// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { link, imageInTeaser, dfpBanner, } from '@haaretz/app-utils';

import KrokerView from './KrokerView.js';
import ListDataGetter from '../../ListDataGetter';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const KrokerQuery = gql`
  query KrokerQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      isLazyloadImages
      lazyloadDistance
      commercialLinks {
        ...Link
      }
      extraLinks {
        ...Link
      }
      items {
        ... on TeaserInList {
          inputTemplate
          path
          representedContent
          contentId
          title
          titleMobile
          ...ImageInTeaser
          commentsCounts
        }
      }
      dfp {
        ...DfpBanner
      }
    }
  }
  ${imageInTeaser}
  ${dfpBanner}
  ${link}
  ${dfpBanner}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Kroker(props: Props): React.Node {
  return (
    <ListDataGetter
      query={KrokerQuery}
      view="Kroker"
      {...props}
    >
      {dataProps => <KrokerView {...dataProps} />}
    </ListDataGetter>
  );
}
