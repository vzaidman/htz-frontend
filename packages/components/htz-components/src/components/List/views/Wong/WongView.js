// @flow
import * as React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';

import type { GalleryDataType, } from '../../../../flowTypes/GalleryDataType';
import type { HTMLEmbedDataType, } from '../../../../flowTypes/HTMLEmbedDataType';
import type { ImageDataType, } from '../../../../flowTypes/ImageDataType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import { isImage, isEmbed, isGallery, } from '../../../../utils/validateType.js';
import LiveUpdateView from '../../../LiveUpdateView/LiveUpdateView';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import GridItem from '../../../Grid/GridItem';
import HtzLink from '../../../HtzLink/HtzLink';
import IconBack from '../../../Icon/icons/IconBack';
import Picture from '../../../Image/Picture';
import Image from '../../../Image/Image';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserSubtitle from '../../../TeaserSubtitle/TeaserSubtitle';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import getMediaComponent from '../../../../utils/getMediaComponent';
import getPictureAssets from '../../../../utils/getPictureAssets';
import getImageAssets from '../../../../utils/getImageAssets';

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
  biAction: ?ListBiActionType,
  lazyLoadImages: boolean,
};

Wong.defaultProps = {
  gutter: null,
  isConrad: false,
  lazyLoadImages: false,
  biAction: null,
  width: null,
};

export default function Wong({
  isConrad,
  gutter,
  lazyLoadImages,
  list: { items, },
  biAction,
  width,
}: Props): React.Node {
  const item = items[0];
  const media = item.media || null;
  const MediaComponent = getMediaComponent(media && media.kind, isConrad ? Image : Picture);
  const relatedPadding = '2rem';
  return (
    <FelaTheme
      render={theme => {
        const mediaProps = getMediaProps(media, isConrad, theme);
        return (
          <GridItem
            gutter={gutter}
            width={width}
            rule={
              isConrad
                ? null
                : [
                  {
                    from: 'xl',
                    value: { color: [ 'neutral', '-4', ], width: 1, },
                  },
                ]
            }
          >
            <Teaser
              gutter={0}
              data={item}
              isRev={[ { from: 'xl', value: !isConrad, }, ]}
              gridMiscStyles={{
                justifyContent: [ { from: 'xl', value: 'flex-end', }, ],
              }}
              onClick={
                biAction ? () => biAction({ index: 0, articleId: item.representedContent, }) : null
              }
              miscStyles={{
                margin: [ { until: 's', value: '0 -2rem', }, { fom: 's', value: '0', }, ],
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
                  paddingInlineEnd: [ { from: 'xl', value: isConrad ? 0 : '2rem', }, ],
                }}
                onClick={
                  biAction
                    ? () => biAction({
                      index: 0,
                      articleId: item.representedContent,
                    })
                    : null
                }
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
                      ? [ { until: 's', value: '-4rem', }, ]
                      : undefined,
                }}
                renderContent={() => (
                  <React.Fragment>
                    <TeaserHeader
                      kickerIsBlock
                      isH1
                      {...item}
                      typeScale={[
                        { until: 's', value: 2, },
                        { from: 's', until: 'l', value: 6, },
                        { from: 'l', until: 'xl', value: 5, },
                        { from: 'xl', value: isConrad ? 5 : 4, },
                      ]}
                      kickerTypeScale={[ { until: 's', value: 0, }, { from: 's', value: -1, }, ]}
                      kickerMiscStyles={{
                        marginBottom: '1rem',
                        marginInlineStart: [ { until: 's', value: '-2rem', }, ],
                      }}
                      kickerInnerMiscStyles={{
                        paddingInlineStart: [ { until: 's', value: '2rem', }, ],
                        paddingInlineEnd: [ { until: 's', value: '2rem', }, ],
                      }}
                      onClick={
                        biAction
                          ? () => biAction({
                            index: 0,
                            articleId: item.representedContent,
                          })
                          : null
                      }
                    />
                    <TeaserSubtitle
                      {...item}
                      typeScale={[
                        { from: 's', until: 'l', value: 0, },
                        { until: 'xl', value: 0, },
                        { from: 'xl', value: -1, },
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
                    {item.representedContentType === 'liveBlogArticle' ? <LiveUpdateView /> : null}
                    <TeaserAuthors authors={item.authors} miscStyles={{ fontWeight: 'bold', }} />
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
                          extend: [ theme.mq({ until: 's', }, { display: 'none', }), ],
                        }}
                        render="ul"
                      >
                        {item.relatedArticles.map(
                          // related articles should show up to
                          // 3 articles on xl bp, 2 articles for s-l bp, and none for s bp
                          (article, idx) => (idx < 3 ? (
                            <AboveBlockLink key={article.contentId}>
                              {({ className: aboveBlockLinkClassName, }) => (
                                <li className={aboveBlockLinkClassName}>
                                  <FelaComponent
                                    style={{
                                      color: theme.color('link', 'base'),
                                      display: 'block',
                                      paddingInlineStart: relatedPadding,

                                      ':visited': {
                                        color: theme.color('link', 'base'),
                                      },
                                      ':hover': {
                                        color: theme.color('link', 'base'),
                                        textDecoration: 'underline',
                                      },
                                      ':focus': {
                                        color: theme.color('link', 'base'),
                                        textDecoration: 'underline',
                                        outline: 'none',
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
                                    render={({ className: linkClassName, }) => (
                                      <HtzLink
                                        href={article.path}
                                        className={linkClassName}
                                        onClick={
                                            biAction
                                              ? () => biAction({
                                                index: idx,
                                                articleId: article.contentId,
                                              })
                                              : null
                                          }
                                      >
                                        <IconBack
                                          size={[
                                            { until: 'xl', value: 2, },
                                            { from: 'xl', value: 1.5, },
                                          ]}
                                          miscStyles={{
                                            marginInlineStart: `-${relatedPadding}`,
                                            marginInlineEnd: '0.5rem',
                                          }}
                                        />
                                        {article.title}
                                      </HtzLink>
                                    )}
                                  />
                                </li>
                              )}
                            </AboveBlockLink>
                          ) : null)
                        )}
                      </FelaComponent>
                    )}
                  </React.Fragment>
                )}
              />
            </Teaser>
          </GridItem>
        );
      }}
    />
  );
}

// /////////////////////////////////////////////////////////////////////
//                               UTILS                                //
// /////////////////////////////////////////////////////////////////////

function getImageProps(media: ImageDataType, isConrad: boolean, theme: Object): Object {
  return isConrad
    ? {
      data: media,
      imgOptions: getImageAssets({
        bps: theme.bps,
        aspect: 'headline',
        sizes: [
          { from: 'xl', size: '604px', },
          { from: 'l', size: '570px', },
          { from: 'm', size: '720px', },
          { from: 's', size: '552px', },
          { size: 'calc(100vw)', },
        ],
        widths: [ 375, 469, 570, 604, 720, ],
      }),
    }
    : getPictureAssets({
      bps: theme.bps,
      imgData: media,
      defaultImgOptions: {
        sizes: [ { from: 'xl', size: '469px', }, { size: '100vw', }, ],
        aspect: 'regular',
        widths: [ 375, 469, 600, ],
      },
      sources: [
        {
          from: 's',
          until: 'xl',
          aspect: 'headline',
          sizes: [ { from: 'l', size: '570px', }, { from: 'm', size: '720px', }, { size: '552px', }, ],
          widths: [ 570, 772, 1000, ],
        },
      ],
    });
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
  isConrad: boolean,
  theme: Object
): ?Object {
  if (media) {
    console.log(media);
    if (isImage(media)) return getImageProps(media, isConrad, theme);
    if (isEmbed(media)) return getEmbedProps(media);
    if (isGallery(media)) return { ...media, disableFullScreen: true, };
  }
  return null;
}
