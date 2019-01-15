// @flow
import React from 'react';

import type { ComponentType, Node, } from 'react';
import type { GridElementType, } from '../../flowTypes/GridElementType';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import CsrList from '../List/List';
import ListView from '../ListView/ListView';
import ListViewHeader from '../ListViewHeader/ListViewHeader';
import Debug from '../Debug/Debug';
import ClickTracker from '../ClickTracker/ClickTrackerWrapper';
import GeneralAdSlot from '../Ads/GeneralAdSlot';
import TabElement from '../TabElement/TabElement';
import {
  isClickTrackerWrapper,
  isDfp,
  isList,
  isTabElement,
} from '../../utils/validateType';

type GridElementProps = GridElementType & {
  showTitle?: boolean,
  gutter: number,
  withoutWrapper?: boolean,
  List?: ?ComponentType<any>,
}

GridElement.defaultProps = {
  withoutWrapper: false,
  showTitle: true,
  List: null,
};

function GridElement({
  title,
  items,
  showTitle,
  withoutWrapper,
  List: SsrList,
}: GridElementProps): Node {
  const WrapperElement: ComponentType<any> = withoutWrapper ? Grid : ListView;
  const List = SsrList || CsrList;
  return (
    <WrapperElement gutter={2}>
      {
        showTitle && title
          ? (
            <GridItem width={1} stretchContent>
              <ListViewHeader isHorizontal title={title} />
            </GridItem>
          )
          : null
      }
      {items.map(({ content, width, miscStyles, }) => (
        <GridItem
          width={width}
          miscStyles={{
            display: 'flex',
            ...(miscStyles || {}),
          }}
        >
          {
            isClickTrackerWrapper(content)
              ? (
                <ClickTracker key={content.contentId} {...content} />
              )
              : isDfp(content)
                ? (
                  <GeneralAdSlot key={content.contentId} {...content} />
                )
                : isList(content)
                  ? (
                    <List key={content.contentId} {...content} />
                  )
                  : isTabElement(content)
                    ? (
                      <TabElement key={content.contentId} List={SsrList} {...content} withoutWrapper />
                    )
                    : (
                      <Debug key={content.contentId}>
                        {`Element of type '${content.inputTemplate}' is not supported in GridElementGroup`}
                      </Debug>
                    )
          }
        </GridItem>
      ))}
    </WrapperElement>
  );
}

export default GridElement;
