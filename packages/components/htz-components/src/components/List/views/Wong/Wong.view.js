// @flow
import * as React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
// import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import getMediaComponent from '../../../../utils/getMediaComponent';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
// import TeaserResponsiveText from '../../../TeaserResponsiveText/TeaserResponsiveText';
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

// import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

const getSourceOptions = (aspect: string) => {
  console.log('aspect: ', aspect);
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
};

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
const getMediaProps = (
  media: ?(ImageDataType | HTMLEmbedDataType | GalleryDataType),
  isConrad: boolean
): ?Object => {
  if (media) {
    if (media.elementType === 'image') return getImageProps(media, isConrad);
    if (media.elementType === 'embedElement') return getEmbedProps(media);
    // if (elementType === 'gallery') return getGalleryProps(media);
  }
  return null;
};

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
  width: number | ComponentPropResponsiveObject<number>[],
};

Wong.defaultProps = {
  gutter: null,
  isConrad: false,
  width: null,
};

function Wong({ isConrad, gutter, list: { items, }, width, }: Props): React.Node {
  const item = items[0];
  const media = item && item.media;
  const MediaComponent = getMediaComponent(media && media.elementType, Picture);
  const mediaProps = getMediaProps(media, isConrad);
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={gutter}
          width={width}
          rule={isConrad ? null : [ { from: 'xl', value: { color: [ 'neutral', '-3', ], width: 1, }, }, ]}
        >
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
                { from: 'xl', value: isConrad ? 1 / 2 : 6 / 10, },
              ]}
              miscStyles={{ paddingInlineEnd: [ { from: 'xl', value: isConrad ? 0 : '4rem', }, ], }}
            >
              <MediaComponent {...mediaProps} />
            </TeaserMedia>
            <TeaserContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 5 / 12, },
                { from: 'xl', value: isConrad ? 1 / 2 : 4 / 10, },
              ]}
              data={item}
              padding={[
                { until: 's', value: [ 0, 2, 0, 0, ], },
                { from: 's', until: 'l', value: [ 3, 2, 0, 0, ], },
                { from: 'l', until: 'xl', value: [ 0, 4, 0, 0, ], },
                { from: 'xl', value: [ 0, isConrad ? 4 : 0, 0, isConrad ? 0 : 4, ], },
              ]}
              miscStyles={{
                marginTop: [ { until: 's', value: '-5rem', }, ],
              }}
              renderContent={teaserData => (
                <React.Fragment>
                  <TeaserHeader
                    kickerIsBlock
                    isH1
                    {...teaserData}
                    typeScale={[
                      { until: 's', value: 1, },
                      { from: 's', until: 'l', value: 6, },
                      { from: 'l', until: 'xl', value: 6, },
                      { from: 'xl', value: 5, },
                    ]}
                    kickerTypeScale={[
                      { from: 's', until: 'l', value: -1, },
                      { from: 'l', value: -1, },
                    ]}
                    miscStyles={{
                      marginTop: [ { until: 's', value: '3rem', }, ],
                    }}
                  />
                  <TeaserSubtitle
                    {...teaserData}
                    typeScale={[ { from: 'xl', value: -1, }, ]}
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
                { from: 's', until: 'l', value: [ 1, 2, ], },
                { from: 'l', until: 'xl', value: [ 1, 4, 1, 0, ], },
                isConrad
                  ? { from: 'xl', value: [ 3, 4, 0, 0, ], }
                  : { from: 'xl', value: [ 2, 0, 0, 0, ], },
              ]}
              footerMiscStyles={{
                display: 'block',
                color: theme.color('neutral', '-3'),
                marginTop: [ { from: 'xl', value: '0', }, ],
                position: [ { from: 's', value: 'initial', }, ],
                type: [
                  { until: 's', value: -3, },
                  { from: 's', until: 'xl', value: -2, },
                  { from: 'xl', value: -3, },
                ],
              }}
              renderFooter={footerData => (
                <React.Fragment>
                  <TeaserAuthors authors={footerData.authors} miscStyles={{ fontWeight: 'bold', }} />
                  {' | '}
                  <TeaserTime {...footerData} />
                  {' '}
                  <CommentsCount
                    commentsCount={item.commentsCounts}
                    size={[ { from: 's', until: 'l', value: 2, }, ]}
                  />
                  {item.relatedArticles && (
                    <FelaComponent
                      style={{
                        marginTop: '1rem',
                        extend: [
                          theme.mq({ until: 's', }, { display: 'none', }),
                          // theme.mq({ from: 'xl', }, { display: 'none', }),
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
                                ':visited': { color: theme.color('link', 'base'), },
                                extend: [
                                  theme.mq({ until: 'xl', }, idx === 2 ? { display: 'none', } : {}),
                                ],
                              }}
                              render={({ className, }) => (
                                <HtzLink href={article.path} className={className}>
                                  {'> '}
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
        </GridItem>
      )}
    />
  );
}

export default Wong;
