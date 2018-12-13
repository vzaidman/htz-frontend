// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import List from '../List/List';
import GridItem from '../Grid/GridItem';
import ListView from '../ListView/ListView';

type Props = {
  data: {
    slotA: {
      view: 'Wong' | 'Conrad',
      inputTemplate: 'com.tm.element.List',
      contentId: string,
      contentName: string,
    },
    // TODO: replace Dfp placeholder, and add typing
    slotB: {
      contentLists: {},
    }[],
    slotC: {
      view: 'Pazuzu',
      inputTemplate: 'com.tm.element.List',
      contentId: string,
      contentName: string,
    },
  },
};

export default function MainBlock({ data: { slotA, slotB, slotC, }, }: Props): React.Node {
  const isConradView = slotA.view === 'Conrad';
  return (
    <ListView
      gutter={0}
      innerBackgroundColor={[ { until: 's', value: 'transparent', }, ]}
      miscStyles={{
        paddingInlineEnd: [ { from: 's', value: '4rem', }, ],
        paddingInlineStart: [ { from: 's', value: '4rem', }, ],
      }}
    >
      <List
        contentId={slotA.contentId}
        view={slotA.view}
        viewProps={{
          width: [
            { from: 's', until: 'l', value: 1, },
            { from: 'l', until: 'xl', value: 1, },
            { from: 'xl', value: isConradView ? 1 : 7 / 10, },
          ],
        }}
      />
      <GridItem
        gutter={0}
        width={[
          { from: 's', until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 4 / 12, },
          { from: 'xl', value: isConradView ? 4 / 12 : 3 / 10, },
        ]}
        miscStyles={{
          marginTop: [
            {
              until: 's',
              value: 2,
            },
            {
              from: 's',
              value: 4,
            },
          ],
          paddingInlineStart: [
            { from: 'l', until: 'xl', value: '4rem', },
            { from: 'xl', value: '4rem', },
          ],
          paddingInlineEnd: [
            { from: 'l', until: 'xl', value: '2rem', },
            { from: 'xl', value: '4rem', },
          ],
          order: [
            { from: 'l', until: 'xl', value: 5, },
            ...(isConradView ? [ { from: 'xl', value: 5, }, ] : []),
          ],
          display: [ { until: 's', value: 'none', }, ],
        }}
      >
        <FelaComponent
          style={theme => ({
            backgroundColor: 'orange',
            height: '273px',
            width: '300px',
            marginRight: 'auto',
            marginLeft: 'auto',
          })}
        />
      </GridItem>
      <List
        contentId={slotC.contentId}
        view={slotC.contentId}
        viewProps={{
          isConradView,
          width: [
            { from: 's', until: 'l', value: 1, },
            { from: 'l', until: 'xl', value: 8 / 12, },
            { from: 'xl', value: isConradView ? 8 / 12 : 1, },
          ],
        }}
      />
    </ListView>
  );
}
