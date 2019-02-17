// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, embed, imageGallery, } from '@haaretz/app-utils';
import BoxyView from './BoxyView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
// eslint-disable-next-line import/no-extraneous-dependencies


const BoxyQuery = gql`
  query BoxyQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      lazyloadDistance
      title
      items {
        contentId
        title
        titleMobile
        path
        media {
          ... on Image {
            ...Image
          }
          ... on Embed {
            ...Embed
          }
          ... on ImageGallery {
              ...ImageGallery
          }
        }
      }
    }
  }
  ${embed}
  ${image}
  ${imageGallery}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Boxy(props: Props): React.Node {
  return (
    <ListDataGetter query={BoxyQuery} view="Boxy" {...props}>
      {dataProps => <BoxyView {...dataProps} />}
    </ListDataGetter>
  );
}
