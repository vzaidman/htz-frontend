// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { dfpBanner, imagesInTeaser, } from '@haaretz/app-utils';
import ZombieView from './ZombieView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const ZombieQuery = gql`
  query ZombieQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      extraLinks {
        contentId
        contentName
        href
        inputTemplate
        linkText
        toolTip
      }
      commercialLinks {
        contentId
        contentName
        href
        inputTemplate
        linkText
        toolTip
      }
      items {
        ...ImagesInTeaser
        contentId
        representedContent
        exclusive
        exclusiveMobile
        title
        path
        titleMobile
        commentsCounts
        publishDate
        inputTemplate
        authors {
          ... on Author {
            contentName
          }
        }
      }
      dfp {
        ...DfpBanner
      }
    }
  }
  ${imagesInTeaser}
  ${dfpBanner}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Zombie(props: Props): React.Node {
  return (
    <ListDataGetter query={ZombieQuery} view="Zombie" {...props}>
      {dataProps => <ZombieView {...dataProps} />}
    </ListDataGetter>
  );
}
