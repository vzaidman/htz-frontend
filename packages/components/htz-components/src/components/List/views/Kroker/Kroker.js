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
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
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
