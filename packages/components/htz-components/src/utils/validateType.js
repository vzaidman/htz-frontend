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

export function isMiddleRuller(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.promotion.banner.MiddleRuler';
}

export function isHeaderNewsGroup(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.HeaderNewsGroup';
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

export function isMobileListWrapper(item: TestObject): %checks {
  return item.inputTemplate === 'com.polobase.whtzMobileSiteListsWrapper';
}

export function isTeaser(item: TestObject): %checks {
  return item.inputTemplate === 'com.tm.TeaserData';
}

export function isError(media: KindObject): %checks {
  return media.kind === 'error';
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
  isMobileListWrapper,
  isDfp,
  isGridElement,
  isHeaderNewsGroup,
  isList,
  isMainBlock,
  isTabElement,
  isTeaser,
  isError,
  isImage,
  isEmbed,
  isGallery,
  isMiddleRuller,
};
