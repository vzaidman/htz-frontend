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
  biAction: ListBiActionType,
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
    <ListView gutter={4} innerBackgroundColor="transparent">
      <GridItem
        width={[
          { until: 's', value: 1, },
          { from: 's', until: 'l', value: 1 / 3, },
          { from: 'l', until: 'xl', value: 1 / 4, },
          { from: 'xl', value: 1 / 5, },
        ]}
        miscStyles={{ display: 'flex', }}
      >
        <ListView
          gutter={0}
          sectionMiscStyles={{ display: 'flex', width: '100%', }}
          gridMiscStyles={{ flexDirection: 'column', width: '100%', }}
          disableWrapper
        >
          {list.title ? <VogelListTitle title={list.title} /> : null}
          <GridItem
            miscStyles={{
              flexBasis: 'auto',
              flexGrow: '1',
              flexSrink: '0',
            }}
            stretchContent
          >
            <Section isFragment>
              <VogelItem
                data={list.items[0]}
                hideImageOnMobile
                lazyLoadImages={lazyLoadImages}
                index={0}
                biAction={biAction}
              />
              <VogelItem
                data={list.items[1]}
                hideImage
                hideSeparatorOnMobile
                index={1}
                biAction={biAction}
              />
              <VogelItem
                data={list.items[2]}
                hideImage
                hideSeparator
                hideOnMobile
                index={2}
                biAction={biAction}
              />
            </Section>
          </GridItem>
        </ListView>
      </GridItem>

      <GridItem
        width={[
          { until: 's', value: 1, },
          { from: 's', until: 'l', value: 1 / 3, },
          { from: 'l', until: 'xl', value: 1 / 4, },
          { from: 'xl', value: 1 / 5, },
        ]}
        miscStyles={{ display: 'flex', }}
      >
        <ListView
          gutter={0}
          sectionMiscStyles={{ display: 'flex', width: '100%', }}
          gridMiscStyles={{ flexDirection: 'column', width: '100%', }}
          disableWrapper
        >
          {list.title ? <VogelListTitle title={list.title} /> : null}
          <GridItem
            miscStyles={{
              flexBasis: 'auto',
              flexGrow: '1',
              flexSrink: '0',
            }}
            stretchContent
          >
            <Section isFragment>
              <VogelItem
                data={list.items[0]}
                hideImageOnMobile
                lazyLoadImages={lazyLoadImages}
                index={0}
                biAction={biAction}
              />
              <VogelItem
                data={list.items[1]}
                hideImage
                hideSeparatorOnMobile
                index={1}
                biAction={biAction}
              />
              <VogelItem
                data={list.items[2]}
                hideImage
                hideSeparator
                hideOnMobile
                index={2}
                biAction={biAction}
              />
            </Section>
          </GridItem>
        </ListView>
      </GridItem>
    </ListView>
  );
}
