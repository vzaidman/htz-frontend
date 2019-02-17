// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { imageInTeaser, imageGallery, image, } from '@haaretz/app-utils';
import SlimView from './SlimView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const SlimQuery = gql`
  query SlimQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      lazyloadDistance
      items {
        ... on TeaserInList {
          ...ImageInTeaser
          media {
            ... on ImageGallery {
              ...ImageGallery
            }
          }
          contentId
          title
          path
          titleMobile
          inputTemplate
        }
      }
    }
  }
  ${imageInTeaser}
  ${image}
  ${imageGallery}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Slim(props: Props): React.Node {
  return (
    <ListDataGetter query={SlimQuery} view="Slim" {...props}>
      {dataProps => <SlimView {...dataProps} />}
    </ListDataGetter>
  );
}
