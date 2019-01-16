// @flow
import * as React from 'react';
import { rgba, } from '@haaretz/htz-css-tools';
import { FelaComponent, FelaTheme, } from 'react-fela';
import type { Node, } from 'react';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import getMediaComponent from '../../../../utils/getMediaComponent';
import H from '../../../AutoLevels/H';
import LayoutContainer from '../../../PageLayout/LayoutContainer';
import LayoutRow from '../../../PageLayout/LayoutRow';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import Picture from '../../../Image/Picture';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserResponsiveText from '../../../TeaserResponsiveText/TeaserResponsiveText';
import GridItem from '../../../Grid/GridItem';
import BlockLink from '../../../BlockLink/BlockLink';
import type { ImageDataType, } from '../../../../flowTypes/ImageDataType';
import type { HTMLEmbedDataType, } from '../../../../flowTypes/HTMLEmbedDataType';
import type { GalleryDataType, } from '../../../../flowTypes/GalleryDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import { isImage, isEmbed, } from '../../../../utils/validateType';

type MediaType = ImageDataType | HTMLEmbedDataType | GalleryDataType;

type Props = {
  list: ListDataType,
  marginTop: string | ComponentPropResponsiveObject<number>[],
};

Boxy.defaultProps = {
  // Disabling eslint here, because it doesn't understand how
  // flow works with default props and required props
  /* eslint-disable react/default-props-match-prop-types */
  /* eslint-enable react/default-props-match-prop-types */
  marginTop: [ { until: 's', value: 4, }, { from: 's', value: 8, }, ],
};

const getSourceOptions = isMobile => {
  const aspect = isMobile ? 'vertical' : 'landscape';
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

function getImageProps(media: ImageDataType): Object {
  return {
    defaultImg: {
      sourceOptions: getSourceOptions(false),
      data: media,
    },
    sources: [
      {
        until: 's',
        sourceOptions: getSourceOptions(true),
        data: media,
      },
      {
        from: 's',
        sourceOptions: getSourceOptions(false),
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
  media: MediaType
): ?Object => {
  if (isImage(media)) {
    return getImageProps(media);
  }
  if (isEmbed(media)) {
    return getEmbedProps(media);
  }
  return null;
};

const wrapperStyle = theme => ({
  position: 'absolute',
  right: '0',
  zIndex: '2',
  maxWidth: '70%',
  extend: [
    theme.type(3, { lines: 5, untilBp: 'l', }),
    theme.type(4, { lines: 6, fromBp: 'l', }),
    theme.mq(
      { until: 'l', },
      {
        bottom: '1px',
      }
    ),
    theme.mq(
      { from: 'l', },
      {
        bottom: '2px',
      }
    ),
  ],
});

const innerTextStyle = theme => ({
  fontWeight: '400',
  padding: '1rem',
  backgroundColor: rgba(theme.color('quaternary', 'base'), 0.85),
  display: 'inline',
  boxDecorationBreak: 'clone',
  paddingTop: '0',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  paddingBottom: '0',
});

export default function Boxy({ list, marginTop, }: Props): Node {
  const item: TeaserDataType = list.items[0];
  const media: ?MediaType = item ? item.media : null;
  const mediaKind: ?string = media ? media.kind : null;
  const MediaComponent: React.ComponentType<any> = getMediaComponent(mediaKind, Picture);
  const mediaProps: ?Object = media ? getMediaProps(media) : null;
  return item && MediaComponent && mediaProps ? (
    <FelaTheme
      render={theme => {
        const { color, } = theme;
        return (
          <LayoutRow bgc={color('neutral', '-2')} miscStyles={{ marginTop, }}>
            <LayoutContainer
              miscStyles={{
                maxWidth: [
                  { from: 's', until: 'm', value: '100%', },
                  { from: 'm', until: 'l', value: '100%', },
                  { from: 'l', until: 'xl', value: '100%', },
                ],
                position: 'relative',
              }}
            >
              <FelaComponent style={wrapperStyle}>
                {item.title && (
                  <FelaComponent
                    style={innerTextStyle}
                    render={({ className: headerClass, }) => (
                      <H className={headerClass}>
                        <TeaserResponsiveText text={item.title} mobileText={item.titleMobile} />
                      </H>
                    )}
                  />
                )}
              </FelaComponent>
              {mediaKind === 'image' ? (
                <TeaserMedia data={item}>
                  <MediaComponent {...mediaProps} />
                </TeaserMedia>
              ) : (
                <GridItem width={1} stretchContent>
                  <BlockLink href={item.path} attrs={{ tabIndex: -1, }}>
                    <MediaComponent {...mediaProps} />
                  </BlockLink>
                </GridItem>
              )}
            </LayoutContainer>
          </LayoutRow>
        );
      }}
    />
  ) : null;
}
