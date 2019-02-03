// @flow
import React from 'react';

import type { ComponentType, Node, } from 'react';
import type { GridElementType, } from '../../flowTypes/GridElementType';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import CsrList from '../List/List';
import ListView from '../ListView/ListView';
import StickyListViewHeader from '../ListViewHeader/StickyListViewHeader';
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
};

GridElement.defaultProps = {
  gutter: 4,
  List: null,
  showTitle: true,
  withoutWrapper: false,
};

function GridElement({
  title,
  items,
  gutter,
  showTitle,
  withoutWrapper,
  List: SsrList,
}: GridElementProps): Node {
  const WrapperElement: ComponentType<any> = withoutWrapper ? Grid : ListView;
  const List = SsrList || CsrList;
  return (
    <WrapperElement
      gutter={gutter}
      padding={
        withoutWrapper
          ? null
          : [ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]
      }
    >
      {showTitle && title ? (
        <StickyListViewHeader
          width={1}
          miscStyles={{
            marginBottom: [ { until: 'l', value: '1rem', }, ],
          }}
          isHorizontal
          title={title}
        />
      ) : null}
      {items.map(({ content, width, miscStyles, }) => (
        <GridItem
          key={content.contentId}
          width={width}
          miscStyles={{
            display: 'flex',
            ...(miscStyles || {}),
          }}
        >
          {isClickTrackerWrapper(content) ? (
            <ClickTracker {...content} />
          ) : isDfp(content) ? (
            <GeneralAdSlot {...content} />
          ) : isList(content) ? (
            <List {...content} />
          ) : isTabElement(content) ? (
            <TabElement List={SsrList} {...content} withoutWrapper />
          ) : (
            <Debug key={content.contentId}>
              {`Element of type '${
                content.inputTemplate
              }' is not supported in GridElementGroup`}
            </Debug>
          )}
        </GridItem>
      ))}
    </WrapperElement>
  );
}

export default GridElement;
