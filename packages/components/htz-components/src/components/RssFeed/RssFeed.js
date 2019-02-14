// @flow
import * as React from 'react';
import MorboView from '../List/views/Morbo/MorboView';

import type { RssFeedType, } from '../../flowTypes/RssFeedType';
import type { ListDataType, } from '../../flowTypes/ListDataType';

function rssDataToListData(rssData): ListDataType {
  return {
    title: rssData.title,
    contentName: rssData.title,
    contentId: rssData.contentId,
    hasPagination: false,
    inputTemplate: 'com.tm.ListElement',
    isLazyloadImages: false,
    lazyLoadImages: false,
    view: 'Morbo',
    items: rssItemsToTeaserData(rssData.items, rssData.contentId),
  };
}

/**
 * Converts rss item to teaser-data item.
 * @param {Array<Object>} items RSS items array
 * @param {string} keyPrefix a prefix for building uniqe id for each RSS item.
 */
function rssItemsToTeaserData(items, keyPrefix) {
  return !items
    ? []
    : items.map((item, idx) => {
      const publishedDate = item.publishedDate ? new Date(item.publishedDate).getTime() : null;

      return {
        image: rssItemImageToImage(item.imageUrl),
        kind: 'teaser',
        publishDate: publishedDate || null,
        contentId: `${keyPrefix}_${idx}`,
        title: item.title,
        titleMobile: item.title,
        inputTemplate: 'com.tm.TeaserData',
        path: item.link,
        linkTarget: '_blank',
        representedContent: `${keyPrefix}_${idx}`,
        representedContentType: 'externalContent',
      };
    });
}

/**
 * Convert RSS items image to PAPI Image data.
 * @param {Array<string>} rssImage Array of images urls.
 */
function rssItemImageToImage(rssImage) {
  let image = null;

  if (Array.isArray(rssImage) && rssImage.length > 0) {
    image = {
      contentName: '',
      imgArray: [
        {
          imgName: rssImage[0],
          aspects: {
            full: {
              width: 192,
              height: 144,
            },
          },
        },
      ],
      isExternal: true,
      imageType: 'image',
      inputTemplate: 'com.tm.Image',
      contentId: rssImage[0],
      kind: 'image',
    };
  }

  return image;
}

export default function RssFeed(props: RssFeedType) {
  const dataAsList: ListDataType = rssDataToListData(props);

  return (
    <MorboView
      {...{
        list: dataAsList,
        lazyLoadImages: dataAsList.isLazyloadImages,
        biAction: null,
        gaAction: null,
      }}
    />
  );
}
