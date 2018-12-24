// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import config from 'config';
import { borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, ListItemType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';

import ListItem from '../../elements/ListItem';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Image from '../../../Image/Image';
import { PromotedItem, } from '../Leela/LeelaView';
import BlockLink from '../../../BlockLink/BlockLink';
import H from '../../../AutoLevels/H';
import HtzLink from '../../../HtzLink/HtzLink';
import Section from '../../../AutoLevels/Section';
import filterList from '../../utils/filterList';
import { isClickTrackerWrapper, isDfp, isTeaser, } from '../../utils/validateTeaser';

const listItemStyle = {
  alignItems: 'flex-start',
  display: 'flex',
};

type ClickTrackerProps = {
  item: ClickTrackerBannerWrapperType,
  index: number,
  biAction: ListBiActionType,
}

function ClickTrackerItem({ item, index, biAction, }: ClickTrackerProps): Node {
  return (
    <ClickTracker
      {...item}
      render={(banner: ClickTrackerBannerType) => {
        const { text, link, clicktrackerimage, } = banner;
        return (
          <FelaTheme
            render={theme => (
              <BlockLink
                miscStyles={{
                  ...listItemStyle,
                  marginTop: '1rem',
                  borderTop: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                  borderBottom: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                  borderEnd: [ '5px', 0, 'solid', theme.color('neutral', '-4'), ],
                }}
                href={link}
                onClick={() => biAction({ index, articleId: item.contentId, })}
              >
                <PromotedItem
                  title={text}
                  image={clicktrackerimage}
                  path={link}
                  suffix
                  paragraphHeight={{ maxHeight: '9rem', }}
                  textType={-2}
                />
              </BlockLink>
            )}
          />
        );
      }}
    />
  );
}

type ItemProps = {
  data: TeaserDataType,
  index: number,
  biAction: ListBiActionType,
  listLength: number,
};

function Item({
  data,
  index,
  biAction,
  listLength,
}: ItemProps): Node {
  return (
    <FelaTheme
      render={theme => (
        <BlockLink
          miscStyles={{
            ...listItemStyle,
            marginTop: index ? '1rem' : undefined,
            ...(index < listLength - 1
              // place separators only between items
              ? { borderBottom: [ '1px', '1', 'solid', theme.color('neutral', '-4'), ], }
              : {}
            ),
          }}
          href={data.path}
          onClick={() => biAction({ index, articleId: data.representedContent, })}
        >
          <Section isFragment>
            <FelaComponent
              style={{
                width: '18rem',
                flexShrink: '0',
                flexGrow: '0',
              }}
              render={({ className, }) => (
                <span className={className}>
                  <Image
                    data={data.image}
                    imgOptions={{
                      transforms: {
                        width: '125',
                        aspect: 'regular',
                        quality: 'auto',
                      },
                    }}
                    miscStyles={{
                      width: '18rem',
                      flexShrink: '0',
                      flexGrow: '0',
                    }}
                  />
                </span>
              )}
            />
            <FelaComponent
              style={{
                fontWeight: '700',
                marginStart: '1rem',
                flexGrow: '1',
                extend: [ theme.type(-2), ],
              }}
              render={({ className, }) => (
                <H className={className}>
                  <HtzLink href={data.path}>{data.title}</HtzLink>
                </H>
              )}
            />
          </Section>
        </BlockLink>
      )}
    />
  );
}

type Props = {
  gaAction: () => void,
  biAction: ListBiActionType,
  /**
   * data object from polopoly
   */
  list: ListDataType & {
    dfp: Array<ListItemType>,
    clickTrackers: Array<ListItemType>,
  },
  /**
   * Determine if the component should be lazyloaded. Defaults to `false`.
   * If lazyloaded, indicates how many pixels before entering the screen
   * should the image be loaded.
   * For example, when `{lazyLoadImages: true}`, the image will be
   * lazyloaded as soon as it enters the screen. When `{lazyLoadImages: '400px'}`
   * the image will be lazyloaded 400px before entering the screen.
   * Strings should be in css length units.
   */
  lazyLoadImages: boolean,
};

// eslint-disable-next-line react/prop-types
function Zoidberg({ list, lazyLoadImages, biAction, }: Props): Node {
  const { title, } = list;
  let items;
  let clickTrackers;
  let dfp;

  if (config.has('appName') && config.get('appName') === 'styleguide') {
    items = filterList(list.items, 'inputTemplate', 'com.tm.TeaserData');
    clickTrackers = list.clickTrackers
      ? filterList(list.clickTrackers, 'inputTemplate', 'com.polobase.ClickTrackerBannersWrapper')
      : null;
    dfp = list.dfp
      ? filterList(list.dfp, 'inputTemplate', 'com.polobase.DfpBannerElement')
      : null;
  }
  else {
    items = list.items;
    clickTrackers = list.clickTrackers;
    dfp = list.dfp;
  }

  const stdItemsLength: number = items.length;

  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: `${300 / 7}rem`,
      }}
    >
      <FelaComponent
        style={theme => ({
          ...theme.type(1),
          fontWeight: '700',
          color: theme.color('primary'),
          ...borderBottom('2px', 1, 'solid', theme.color('primary')),
          marginBottom: '2rem',
        })}
        render={({ className, }) => <H className={className}>{title}</H>}
      />
      <Section>
        {
          items.map((item, index) => (
            <ListItem key={item.contentId}>
              {isTeaser(item)
                ? (
                  <Item
                    data={item}
                    index={index}
                    biAction={biAction}
                    listLength={stdItemsLength}
                  />
                )
                : null
              }
            </ListItem>
          ))
        }
        {clickTrackers && clickTrackers.length > 0 ? (
          clickTrackers.map((item, index) => (
            <ListItem key={item.contentId}>
              {isClickTrackerWrapper(item)
                ? (
                  <ClickTrackerItem
                    item={item}
                    index={index}
                    biAction={biAction}
                  />
                )
                : null
              }
            </ListItem>
          ))
        ) : null}
        {dfp && dfp.length > 0 ? (
          dfp.map(item => (
            <ListItem key={item.contentId}>
              {isDfp(item)
                ? (
                  <GeneralAdSlot
                    {...item}
                    styleRule={{
                      ...listItemStyle,
                      marginTop: '1rem',
                    }}
                  />
                )
                : null
              }
            </ListItem>
          ))
        ) : null}
      </Section>
    </FelaComponent>
  );
}

export default Zoidberg;
