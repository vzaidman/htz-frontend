// @flow

export type ImageDataType = {
  contentName: string,
  contentId: string,
  inputTemplate: string,
  photographer?: string,
  alt?: string,
  viewMode?: string,
  position?: string,
  accessibility?: string,
  credit?: string,
  title?: string,
  imgArray: {
    imgName?: string,
    version?: string,
    aspects?: {
      [aspect: string]: {
        width: number,
        height: number,
        height: number,
        x?: number,
        y?: number,
      },
    },
  }[],
  imageType?: string,
  imageUrlLinkGroup?: string,
  imageUrlLinkGroupTarget?: string,
  kind: 'image',
};
