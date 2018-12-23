// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { dfpBanner, imagesInTeaser, } from '@haaretz/app-utils';
import ZombieView from './ZombieView.js';
import ListDataGetter from '../../ListDataGetter';

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
      items {
        ... on TeaserInList {
          ...ImagesInTeaser
          contentId
          representedContent
          exclusive
          exclusiveMobile
          title
          path
          titleMobile
          commentsCounts
          lastUpdate
          inputTemplate
          authors {
            ... on Author {
              contentName
            }
          }
        }
      }
      dfp: items {
        ... on DfpBanner {
          ...DfpBanner
        }
      }
    }
  }
  ${imagesInTeaser}
  ${dfpBanner}
`;

type ZombieProps = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Zombie({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: ZombieProps): React.Node {
  return (
    <ListDataGetter
      query={ZombieQuery}
      view="Zombie"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <ZombieView {...props} />}
    </ListDataGetter>
  );
}
