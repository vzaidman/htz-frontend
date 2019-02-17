// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, dfpBanner, } from '@haaretz/app-utils';
import SlugsView from './SlugsView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const SlugsQuery = gql`
  query SlugsQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      isLazyloadImages
      lazyloadDistance
      items {
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
      dfp {
        ...DfpBanner
      }
    }
  }
  ${image}
  ${dfpBanner}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Slugs(props: Props): React.Node {
  return (
    <ListDataGetter
      query={SlugsQuery}
      view="Slugs"
      {...props}
    >
      {dataProps => <SlugsView {...dataProps} />}
    </ListDataGetter>
  );
}
