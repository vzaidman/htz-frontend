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
  validateType,
  Debug,
} from '@haaretz/htz-components';
import type { MainSlotType, } from '../../flowTypes/MainSlotType';

import List from './List/List';

const {
  isDfp,
  isList,
  isMainBlock,
  isTabElement,
  isGridElement,
  isHeaderNewsGroup,
  isClickTrackerWrapper,
} = validateType;

type Props = {
  main: MainSlotType,
};

function HomePageSlotsLayout({ main, }: Props): React.Node {
  return (
    <FelaComponent
      style={theme => ({
        backgroundColor: theme.color('primary', '-6'),
      })}
    >
      {main.map(
        element => (
          isMainBlock(element)
            ? (
              <MainBlock key={element.contentId} List={List} data={element} />
            )
            : isList(element)
              ? (
                <List key={element.contentId} {...element} />
              )
              : isClickTrackerWrapper(element)
                ? (
                  <ClickTracker key={element.contentId} {...element} />
                )
                : isDfp(element)
                  ? (
                    <GeneralAdSlot key={element.contentId} {...element} />
                  )
                  : isTabElement(element)
                    ? (
                      <TabElement key={element.contentId} List={List} {...element} />
                    )
                    : isGridElement(element)
                      ? (
                        <GridElement key={element.contentId} List={List} {...element} />
                      )
                      : isHeaderNewsGroup(element)
                        ? (
                          <TopNews key={element.contentId} {...element} />
                        )
                        : (
                          <Debug key={element.contentId}>
                            {`Element of type '${element.kind || element.inputTemplate}' is not supported in HomePage`}
                          </Debug>
                        )
        )
      )}
    </FelaComponent>
  );
}

export default HomePageSlotsLayout;
