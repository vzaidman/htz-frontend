// @flow

type TestObject = { inputTemplate: any, } & Object;
type KindObject = { kind: any, } & Object;

export function isClickTracker(item: TestObject): %checks {
  return item.inputTemplate === 'com.polobase.ClickTrackerBannerElement';
}

export function isClickTrackerWrapper(item: TestObject): %checks {
  return item.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper';
}

export function isDfp(item: TestObject): %checks {
  return item.inputTemplate === 'com.polobase.DfpBannerElement';
}

export function isGridElement(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.GridElementGroup';
}

export function isList(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.element.List';
}

export function isMainBlock(item: TestObject): %checks {
  return item.inputTemplate === 'com.htz.PageMainBlockElement';
}

export function isTabElement(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.TabViewElement';
}

export function isTeaser(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.TeaserData';
}

export function isImage(media: KindObject): %checks {
  return media.kind === 'image';
}

export function isEmbed(media: KindObject): %checks {
  return media.kind === 'embed';
}

export function isGallery(media: KindObject): %checks {
  return media.kind === 'gallery';
}

export default {
  isClickTracker,
  isClickTrackerWrapper,
  isDfp,
  isGridElement,
  isList,
  isMainBlock,
  isTabElement,
  isTeaser,
  isImage,
  isEmbed,
  isGallery,
};
