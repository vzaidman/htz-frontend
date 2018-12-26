// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import ZappView from './ZappView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const ZappQuery = gql`
  query ZappQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          inputTemplate
          commentsCounts
          contentId
          title
          titleMobile
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          publishDate
          lastUpdate
          rank
          authors {
            contentName
          }
          image {
            ...Image
          }
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${image}
  ${clickTrackerBannersWrapper}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Zapp(props: Props): React.Node {
  return (
    <ListDataGetter query={ZappQuery} view="Zapp" {...props}>
      {dataProps => <ZappView {...dataProps} />}
    </ListDataGetter>
  );
}
