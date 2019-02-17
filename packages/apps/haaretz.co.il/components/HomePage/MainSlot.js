// @flow
import * as React from 'react';
import Observer from 'react-intersection-observer';
import { FelaComponent, } from 'react-fela';
import {
  GeneralAdSlot,
  GridElement,
  MainBlock,
  ClickTracker,
  TabElement,
  TopNews,
  validateType,
  Error,
  Debug,
  MarketingNotification,
  MobileListWrapper,
  RssFeed,
  List,
} from '@haaretz/htz-components';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import type { MainSlotElement, MainSlotType, } from '../../flowTypes/MainSlotType';

const {
  isDfp,
  isList,
  isMainBlock,
  isTabElement,
  isGridElement,
  isError,
  isHeaderNewsGroup,
  isClickTrackerWrapper,
  isMobileListWrapper,
  isMiddleRuller,
  isRssFeed,
} = validateType;

const componentType: Object = new Map([
  [ 'com.htz.PageMainBlockElement', (element: MainSlotElement) => (
    isMainBlock(element)
      ? <MainBlock key={element.contentId} List={List} data={element} />
      : null
  ), ],
  [ 'com.tm.element.List', (element: MainSlotElement, lazyloadDistance: number) => (
    isList(element)
      ? <List key={element.contentId} {...element} lazyloadDistance={lazyloadDistance}/>
      : null
  ), ],
  [ 'com.polobase.ClickTrackerBannersWrapper', (element: MainSlotElement) => (
    isClickTrackerWrapper(element)
      ? <ClickTracker key={element.contentId} {...element} />
      : null
  ), ],
  [ 'com.polobase.DfpBannerElement', (element: MainSlotElement) => (
    isDfp(element)
      ? <GeneralAdSlot key={element.contentId} {...element} />
      : null
  ), ],
  [ 'com.tm.TabViewElement', (element: MainSlotElement, lazyloadDistance: number) => (
    isTabElement(element)
      ? <TabElement key={element.contentId} List={List} {...element} lazyloadDistance={lazyloadDistance}/>
      : null
  ), ],
  [ 'com.tm.GridElementGroup', (element: MainSlotElement, lazyloadDistance: number) => (
    isGridElement(element)
      ? <GridElement key={element.contentId} List={List} {...element} lazyloadDistance={lazyloadDistance}/>
      : null
  ), ],
  [ 'com.tm.HeaderNewsGroup', (element: MainSlotElement) => (
    isHeaderNewsGroup(element)
      ? <TopNews key={element.contentId} {...element} />
      : null
  ), ],
  [ 'com.polobase.whtzMobileSiteListsWrapper', (element: MainSlotElement, lazyloadDistance: number) => (
    isMobileListWrapper(element)
      ? <MobileListWrapper key={element.contentId} {...element} lazyloadDistance={lazyloadDistance}/>
      : null
  ), ],
  [ 'com.tm.promotion.banner.MiddleRuler', (element: MainSlotElement) => (
    isMiddleRuller(element)
      ? (
        <MarketingNotification
          key={element.contentId}
          notificationType="MiddleRuller"
          buttonText=""
          text1={element.text}
          buttonUrl={element.actionUrl}
        />
      )
      : null
  ), ],
  [ 'com.tm.ExternalRssElement', (element: MainSlotElement, lazyloadDistance: number) => (
    isRssFeed(element)
      ? <RssFeed key={element.contentId} {...element} lazyloadDistance={lazyloadDistance}/>
      : null
  ), ],
  [ 'error', (element: MainSlotElement) => (
    isError(element)
      ? <Error key={element.contentId} {...element} />
      : null
  ), ],
]);

type Props = {
  main: MainSlotType,
  globalLazyload: number,
};

function HomePageSlotsLayout({ main, globalLazyload, }: Props): React.Node {
  return (
    <FelaComponent
      style={theme => ({
        backgroundColor: theme.color('primary', '-6'),
        extend: [
          parseComponentProp(
            'paddingBottom',
            [
              { until: 's', value: '10rem', },
              { from: 's', until: 'l', value: '8rem', },
              { from: 'l', until: 'xl', value: '10rem', },
              { from: 'xl', value: '9rem', },
            ],
            theme.mq,
            (prop, value) => ({ [prop]: value, })
          ),
        ],
      })}
    >
      {main.map(element => {
        const getComponent = componentType.get(element.kind || element.inputTemplate);
        const lazyloadDistance = element.lazyloadDistance || globalLazyload;
        return getComponent
          ? element.loadPriority && element.loadPriority === 'lazy'
            ? (
              <Observer triggerOnce rootMargin={`${lazyloadDistance}px`}>
                {inView => (inView ? getComponent(element, lazyloadDistance) : null)}
              </Observer>
            )
            : getComponent(element)
          : (
            <Debug key={element.contentId}>
              {`Element of type '${element.kind || element.inputTemplate}' is not supported in HomePage`}
            </Debug>
          );
      })}
    </FelaComponent>
  );
}

export default HomePageSlotsLayout;
