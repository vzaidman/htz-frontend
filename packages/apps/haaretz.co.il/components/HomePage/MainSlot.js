// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import {
  GeneralAdSlot,
  GridElement,
  MainBlock,
  ClickTracker,
  TabElement,
  TopNews,
  Error,
  Debug,
  MarketingNotification,
} from '@haaretz/htz-components';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import type { MainSlotType, } from '../../flowTypes/MainSlotType';

import List from './List/List';

type Props = {
  main: MainSlotType,
};

function HomePageSlotsLayout({ main, }: Props): React.Node {
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
        switch (element.inputTemplate) {
          case 'com.htz.PageMainBlockElement':
            return <MainBlock key={element.contentId} List={List} data={element} />;
          case 'com.tm.element.List':
            return <List key={element.contentId} {...element} />;
          case 'com.polobase.ClickTrackerBannersWrapper':
            return <ClickTracker key={element.contentId} {...element} />;
          case 'com.polobase.DfpBannerElement':
            return <GeneralAdSlot key={element.contentId} {...element} />;
          case 'com.tm.TabViewElement':
            return <TabElement key={element.contentId} List={List} {...element} />;
          case 'com.tm.GridElementGroup':
            return <GridElement key={element.contentId} List={List} {...element} />;
          case 'com.tm.HeaderNewsGroup':
            return <TopNews key={element.contentId} {...element} />;
          case 'com.tm.promotion.banner.MiddleRuler':
            return (
              <MarketingNotification
                notificationType="MiddleRuller"
                buttonText=""
                text1={element.text}
                buttonUrl={element.actionUrl}
                
              />
            );
          default:
            if (element.kind === 'error') {
              return <Error key={element.contentId} {...element} />;
            }
            return (
              <Debug key={element.contentId}>
                {`Element of type '${element.kind
                  || element.inputTemplate}' is not supported in HomePage`}
              </Debug>
            );
        }
      })}
    </FelaComponent>
  );
}

export default HomePageSlotsLayout;
