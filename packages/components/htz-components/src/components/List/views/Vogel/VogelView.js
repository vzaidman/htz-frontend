// @flow
import * as React from 'react';
import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import Section from '../../../AutoLevels/Section';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import VogelItem from './VogelItem';
import VogelListTitle from './VogelListTitle';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type VogelViewPropTypes = {
  list: ListDataType,
  lazyLoadImages: boolean,
  gaAction: () => void,
  biAction: ?ListBiActionType,
  lazyloadDistance: number,
};

VogelView.defaultProps = {
  lazyLoadImages: false,
};

export default function VogelView({
  list,
  lazyLoadImages,
  gaAction,
  biAction,
}: VogelViewPropTypes): React.Node {
  return (
    <ListView
      gutter={0}
      sectionMiscStyles={{ display: 'flex', width: '100%', }}
      gridMiscStyles={{ flexDirection: 'column', width: '100%', }}
      marginTop={0}
      disableWrapper
    >
      {
        list.title
          ? (
            <VogelListTitle
              title={list.title}
              url={list.url}
            />
          )
          : null
        }
      <GridItem
        miscStyles={{
          flexBasis: 'auto',
          flexGrow: '1',
          flexShrink: '0',
        }}
        stretchContent
      >
        <Section isFragment>
          {list.items.length > 0
            ? (
              <VogelItem
                data={list.items[0]}
                hideImageOnMobile
                lazyLoadImages={lazyLoadImages}
                lazyloadDistance={lazyloadDistance}
                index={0}
                biAction={biAction}
              />
            )
            : null
          }
          {list.items.length > 1
            ? (
              <VogelItem
                data={list.items[1]}
                hideImage
                hideSeparatorOnMobile
                index={1}
                biAction={biAction}
              />
            )
            : null
          }
          {list.items.length > 2
            ? (
              <VogelItem
                data={list.items[2]}
                hideImage
                hideSeparator
                hideOnMobile
                index={2}
                biAction={biAction}
              />
            )
            : null
          }
        </Section>
      </GridItem>
    </ListView>
  );
}
