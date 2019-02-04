// @flow
import React from 'react';
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { ImageDataType, } from '../../flowTypes/ImageDataType';

import Query from '../ApolloBoundary/Query';
import { isImage, } from '../../utils/validateType';
import ImageGallery from '../ImageGallery/ImageGallery';

const ArticleGalleryQuery: DocumentNode = gql`
  query ArticleGallery($path: String!) {
    page(path: $path) @client {
      slots {
        article {
          ... on ArticleData {
            mainImage: mainElement {
              ... on Image {
                ...Image
              }
            }
            images: body {
              ... on Image {
                ...Image
              }
            }
          }
        }
      }
    }
    pageGallery @client {
      isOpen
      startWith
    }
  }
  ${image}
`;

type Props = {
  path: string,
};

const filterData: Array<any> => Array<ImageDataType> = article => (
  article.reduce((result, slot) => {
    if (slot.__typename === 'ArticleData') { // eslint-disable-line no-underscore-dangle
      Object.keys(slot).forEach(key => (
        Array.isArray(slot[key])
          ? slot[key].forEach(item => (
            item && isImage(item) && !item.imageUrlLinkGroup && result.push(item))
          )
          : slot[key] && typeof slot[key] === 'object' && isImage(slot[key]) && !slot[key].imageUrlLinkGroup && result.push(slot[key])
      ));
    }
    return result;
  }, [])
);

const closeGallery: Object => void = client => {
  client.writeData({
    data: {
      pageGallery: {
        isOpen: false,
        startWith: null,
        __typename: 'PageGallery',
      },
    },
  });
};

// eslint-disable-next-line operator-linebreak
const getImageIndex: (Array<ImageDataType>, string) => number =
  (images, contentId) => images.findIndex(imageObj => imageObj.contentId === contentId);

function ArticleGallery({ path, }: Props): Node {
  return (
    <Query
      query={ArticleGalleryQuery}
      variables={{ path, }}
    >
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        if (error) return null;
        const { page: { slots: { article, }, }, pageGallery: { isOpen, startWith, }, } = data;
        const images: Array<ImageDataType> = filterData(article);
        return (
          isOpen
            ? (
              <ImageGallery
                startAt={getImageIndex(images, startWith)}
                fullScreenOnly
                exitFullScreenAction={() => closeGallery(client)}
                images={images}
              />
            )
            : null
        );
      }}
    </Query>
  );
}

export default ArticleGallery;
