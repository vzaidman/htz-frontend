// @flow
import * as React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import GridItem from '../../../Grid/GridItem';
import getMediaComponent from '../../../../utils/getMediaComponent';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserSubtitle from '../../../TeaserSubtitle/TeaserSubtitle';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import Picture from '../../../Image/Picture';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ImageDataType, } from '../../../../flowTypes/ImageDataType';
import type { HTMLEmbedDataType, } from '../../../../flowTypes/HTMLEmbedDataType';
import type { GalleryDataType, } from '../../../../flowTypes/GalleryDataType';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import HtzLink from '../../../HtzLink/HtzLink';
import {
  isTeaser,
  isImage,
  isEmbed,
  //  isGallery,
} from '../../../../utils/validateType.js';
import IconBack from '../../../Icon/icons/IconBack';

type Props = {
  gutter: ?number,
  // Conrad and wong are almost identical with small differences in xl bps
  // Conrad actually renders Wong list with isConrad prop that effects the styles
  isConrad: boolean,
  list: ListDataType,
  /**
   * The width of the underlying `<TeaserMedia />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <TeaserMedia /> spans 25% (3 of 12 columns)
   * <TeaserMedia width={3 / 12} />
   *
   * // responsive settings:
   * <TeaserMedia
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: ?(number | ComponentPropResponsiveObject<number>[]),
  lazyLoadImages: boolean,
};

Wong.defaultProps = {
  gutter: null,
  isConrad: false,
  lazyLoadImages: false,
  width: null,
};

export default function Wong({
  isConrad,
  gutter,
  lazyLoadImages,
  list: { items, },
  width,
}: Props): React.Node {
  const item = items[0];
  const media = isTeaser(item) ? item.media : null;
  const MediaComponent = getMediaComponent(media && media.kind, Picture);
  const mediaProps = getMediaProps(media, isConrad);
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={gutter}
          width={width}
          rule={
            isConrad
              ? null
              : [ { from: 'xl', value: { color: [ 'neutral', '-4', ], width: 1, }, }, ]
          }
        >
          {isTeaser(item) && (
            <Teaser
              gutter={0}
              data={item}
              isRev={[ { from: 'xl', value: !isConrad, }, ]}
              gridMiscStyles={{
                justifyContent: [ { from: 'xl', value: 'flex-end', }, ],
              }}
            >
              <TeaserMedia
                data={item}
                width={[
                  { until: 'l', value: 1, },
                  { from: 'l', until: 'xl', value: 7 / 12, },
                  { from: 'xl', value: isConrad ? 1 / 2 : 4 / 7, },
                ]}
                miscStyles={{
                  paddingInlineEnd: [
                    { from: 'xl', value: isConrad ? 0 : '2rem', },
                  ],
                }}
              >
                <MediaComponent {...mediaProps} lazyLoad={lazyLoadImages} />
              </TeaserMedia>
              <TeaserContent
                width={[
                  { until: 'l', value: 1, },
                  { from: 'l', until: 'xl', value: 5 / 12, },
                  { from: 'xl', value: isConrad ? 1 / 2 : 3 / 7, },
                ]}
                data={item}
                padding={[
                  { until: 's', value: [ 0, 2, 0, 0, ], },
                  { from: 's', until: 'l', value: [ 3, 0, 0, 0, ], },
                  { from: 'l', until: 'xl', value: [ 0, 2, 0, 0, ], },
                  { from: 'xl', value: isConrad ? [ 0, 2, 0, ] : [ 0, 0, 0, 2, ], },
                ]}
                miscStyles={{
                  marginTop:
                    item && (item.exclusive || item.exclusiveMobile)
                      ? [ { until: 's', value: '-3rem', }, ]
                      : undefined,
                }}
                renderContent={() => (
                  <React.Fragment>
                    <TeaserHeader
                      kickerIsBlock
                      isH1
                      {...item}
                      typeScale={[
                        { until: 's', value: 1, },
                        { from: 's', until: 'l', value: 6, },
                        { from: 'l', until: 'xl', value: 5, },
                        { from: 'xl', value: isConrad ? 5 : 4, },
                      ]}
                      kickerTypeScale={[
                        { until: 'xl', value: -1, },
                        { from: 'xl', value: -2, },
                      ]}
                      miscStyles={{
                        marginTop: '1rem',
                      }}
                      kickerMiscStyles={{
                        marginInlineStart: [ { until: 's', value: '-2rem', }, ],
                      }}
                      kickerInnerMiscStyles={{
                        paddingInlineStart: [ { until: 's', value: '2rem', }, ],
                        paddingInlineEnd: [ { until: 's', value: '2rem', }, ],
                      }}
                    />
                    <TeaserSubtitle
                      {...item}
                      typeScale={[
                        { until: 'xl', value: -1, },
                        { from: 'xl', value: -2, },
                      ]}
                      miscStyles={{
                        display: [ { until: 's', value: 'none', }, ],
                        marginTop: [ { from: 's', value: '1rem', }, ],
                        fontWeight: 400,
                      }}
                    />
                  </React.Fragment>
                )}
                footerPadding={[
                  { until: 's', value: [ 1, 2, ], },
                  { from: 's', until: 'l', value: [ 1, 0, ], },
                  { from: 'l', until: 'xl', value: [ 1, 2, 0, 0, ], },
                  isConrad
                    ? { from: 'xl', value: [ 1, 2, 0, 0, ], }
                    : { from: 'xl', value: [ 1, 0, 0, 2, ], },
                ]}
                footerMiscStyles={{
                  marginTop: '0',
                  display: 'block',
                  color: theme.color('neutral', '-3'),
                  type: [
                    { until: 's', value: -3, },
                    { from: 's', until: 'xl', value: -2, },
                    { from: 'xl', value: -3, },
                  ],
                }}
                renderFooter={() => (
                  <React.Fragment>
                    <TeaserAuthors
                      authors={item.authors}
                      miscStyles={{ fontWeight: 'bold', }}
                    />
                    {' | '}
                    <TeaserTime {...item} />
                    {' '}
                    <CommentsCount
                      commentsCount={item.commentsCounts}
                      size={[ { from: 's', until: 'l', value: 2, }, ]}
                    />
                    {item.relatedArticles && (
                      <FelaComponent
                        style={{
                          marginTop: '1rem',
                          fontWeight: '700',
                          extend: [
                            theme.mq({ until: 's', }, { display: 'none', }),
                          ],
                        }}
                        render="ul"
                      >
                        {item.relatedArticles.map(
                          // related articles should show up to
                          // 3 articles on xl bp, 2 articles for s-l bp, and none for s bp
                          (article, idx) => (idx < 3 ? (
                            <li key={article.contentId}>
                              <FelaComponent
                                style={{
                                  color: theme.color('link', 'base'),
                                  ':visited': {
                                    color: theme.color('link', 'base'),
                                  },
                                  extend: [
                                    theme.mq(
                                      { until: 'xl', },
                                      idx === 2 ? { display: 'none', } : {}
                                    ),
                                    theme.type(-1, { untilBp: 'xl', }),
                                    theme.type(-2, { fromBp: 'xl', }),
                                  ],
                                }}
                                render={({ className, }) => (
                                  <HtzLink
                                    href={article.path}
                                    className={className}
                                  >
                                    <IconBack
                                      size={[
                                        { until: 'xl', value: 2, },
                                        { from: 'xl', value: 1.5, },
                                      ]}
                                      miscStyles={{
                                        marginInlineEnd: '0.5rem',
                                      }}
                                    />
                                    {article.title}
                                  </HtzLink>
                                )}
                              />
                            </li>
                          ) : null)
                        )}
                      </FelaComponent>
                    )}
                  </React.Fragment>
                )}
              />
            </Teaser>
          )}
        </GridItem>
      )}
    />
  );
}

// /////////////////////////////////////////////////////////////////////
//                               UTILS                                //
// /////////////////////////////////////////////////////////////////////

function getSourceOptions(aspect: string): Object {
  return {
    sizes: '(min-width:1280px) 1280px, 100vw',
    transforms: [
      {
        width: '375',
        aspect,
        quality: 'auto',
      },
      {
        width: '425',
        aspect,
        quality: 'auto',
      },
      {
        width: '600',
        aspect,
        quality: 'auto',
      },
      {
        width: '768',
        aspect,
        quality: 'auto',
      },
      {
        width: '1028',
        aspect,
        quality: 'auto',
      },
      {
        width: '1280',
        aspect,
        quality: 'auto',
      },
      {
        width: '1920',
        aspect,
        quality: 'auto',
      },
    ],
  };
}

function getImageProps(media: ImageDataType, isConrad: boolean): Object {
  return {
    defaultImg: {
      sourceOptions: getSourceOptions('regular'),
      data: media,
    },
    sources: [
      {
        until: 's',
        sourceOptions: getSourceOptions('regular'),
        data: media,
      },
      {
        from: 's',
        until: 'xl',
        sourceOptions: getSourceOptions('headline'),
        data: media,
      },
      {
        from: 'xl',
        sourceOptions: getSourceOptions(isConrad ? 'headline' : 'regular'),
        data: media,
      },
    ],
  };
}

function getEmbedProps(media: HTMLEmbedDataType): Object {
  return media.inputTemplate === 'com.polobase.YouTubeEmbed'
    ? {
      source: media.source,
      embedType: media.embedType,
      settings: {
        ...media.settings,
        controls: '0',
        autoplay: true,
        loop: '1',
        logo: '1',
        startAt: 0,
        related: '0',
        mute: true,
      },
      showCaption: false,
      inputTemplate: media.inputTemplate,
      caption: media.caption,
      credit: media.credit,
    }
    : {
      source: media.source,
      embedType: media.embedType,
      settings: media.settings,
      showCaption: false,
      inputTemplate: media.inputTemplate,
      caption: media.caption,
      credit: media.credit,
    };
}

function getMediaProps(
  media: ?(ImageDataType | HTMLEmbedDataType | GalleryDataType),
  isConrad: boolean
): ?Object {
  if (media) {
    if (isImage(media)) return getImageProps(media, isConrad);
    if (isEmbed(media)) return getEmbedProps(media);
    // if (isGallery(media)) return getGalleryProps(media);
  }
  return null;
}
