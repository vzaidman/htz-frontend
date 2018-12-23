// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import NibblerView from './NibblerView.js';
import ListDataGetter from '../../ListDataGetter';

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
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Nibbler({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={NibblerQuery}
      view="Nibbler"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <NibblerView {...props} />}
    </ListDataGetter>
  );
}
