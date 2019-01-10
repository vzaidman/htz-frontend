// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';
import { format, } from 'date-fns';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import H from '../AutoLevels/H';
import Time from '../Time/Time';
import BreakingNewsTimeLine from './BreakingNewsTimeLine';
import dayMap from './dayMap';

type Props = {
  /** should pass only items relevant for the single day */
  items: {
    title: string,
    creationDateTime: number,
    url: string,
    inputTemplate: string,
    contentId: string,
  }[],
};

const getDayFromTimeStamp = (time: number) => {
  const dayOfWeek = format(time, 'd');

  return dayMap[dayOfWeek];
};

export default function BreakingNewsSingleDay({ items, }: Props): React.Node {
  // decide the breakingNewsSingleDay date based on the first item
  const determiningDate = items[0].creationDateTime;
  const dayString = getDayFromTimeStamp(determiningDate);
  console.log('dayString: ', dayString);
  return (
    <FelaTheme
      render={theme => (
        <Grid
          miscStyles={{
            backgroundColor: [ { until: 'l', value: theme.color('layout', 'rowBg'), }, ],
            paddingInlineStart: [ { until: 'l', value: '2rem', }, ],
            paddingInlineEnd: [ { until: 'l', value: '2rem', }, ],
            paddingTop: '3rem',
            paddingBottom: [ { until: 'l', value: '5rem', }, { from: 'l', value: '11rem', }, ],
          }}
        >
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 1 / 4, }, ]}
            miscStyles={{
              color: theme.color('primary'),
              marginBottom: '1rem',
            }}
          >
            <FelaComponent
              style={{
                fontWeight: 700,
                extend: [
                  theme.type(3, { fromBp: 'l', }),
                  theme.type(1, { untilBp: 'l', }),
                  theme.mq(
                    { until: 'l', },
                    {
                      display: 'inline-block',
                      marginInlineEnd: '1rem',
                      paddingInlineStart: [ { until: 'l', value: '1rem', }, ],
                    }
                  ),
                  theme.mq(
                    { from: 'l', },
                    {
                      ...borderTop('5px', 1, 'solid', theme.color('primary')),
                    }
                  ),
                ],
              }}
              render={({ className, }) => <H className={className}>{dayString}</H>}
            />
            {/* todo: add logic here which date to add */}
            <FelaComponent
              style={{
                extend: [
                  theme.type(1),
                  theme.mq({ until: 'l', }, { display: 'inline-block', fontWeight: 'bold', }),
                ],
              }}
              render={({ className, }) => (
                <Time className={className} format="MM/DD/YYYY" time={determiningDate} />
              )}
            />
          </GridItem>
          <GridItem width={[ { until: 'l', value: 1, }, { from: 'l', value: 3 / 4, }, ]}>
            <BreakingNewsTimeLine items={items} />
          </GridItem>
        </Grid>
      )}
    />
  );
}
