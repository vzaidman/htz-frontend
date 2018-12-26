// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import NibblerView from './NibblerView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const NibblerQuery = gql`
  query NibblerQuery($path: String!) {
    list(path: $path) {
      title
      items {
        authors {
          ... on AuthorObject {
            contentName
            url
          }
          ... on CreditObject {
            name
          }
        }
        commentsCount
        path
        title
        titleMobile
        image {
          viewMode
          aspects
          accessibility
          title
          credit
          contentId
          isAnimated
          imgArray {
            imgName
            version
          }
          imageType
          contentName
        }
      }
    }
  }
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Nibbler(props: Props): React.Node {
  return (
    <ListDataGetter query={NibblerQuery} view="Nibbler" {...props}>
      {dataProps => <NibblerView {...dataProps} />}
    </ListDataGetter>
  );
}
