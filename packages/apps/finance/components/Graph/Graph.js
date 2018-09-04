// @flow
import React from 'react';
import dynamic from 'next/dynamic';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import type { StatelessFunctionalComponent, } from 'react';

import linedaily2 from '../dummyData/2/line/daily/data';
import lineweekly2 from '../dummyData/2/line/weekly/data';
import linemonthly2 from '../dummyData/2/line/monthly/data';
import lineyearly2 from '../dummyData/2/line/yearly/data';
import line3years2 from '../dummyData/2/line/3years/data';
import linemax2 from '../dummyData/2/line/max/data';

import scatterdaily2 from '../dummyData/2/scatter/daily/data';
import scatterweekly2 from '../dummyData/2/scatter/weekly/data';
import scattermonthly2 from '../dummyData/2/scatter/monthly/data';
import scatteryearly2 from '../dummyData/2/scatter/yearly/data';
import scatter3years2 from '../dummyData/2/scatter/3years/data';
import scattermax2 from '../dummyData/2/scatter/max/data';

import scatterdaily137 from '../dummyData/137/scatter/daily/data';
import scatterweekly137 from '../dummyData/137/scatter/weekly/data';
import scattermonthly137 from '../dummyData/137/scatter/monthly/data';
import scatteryearly137 from '../dummyData/137/scatter/yearly/data';
import scatter3years137 from '../dummyData/137/scatter/3years/data';
import scattermax137 from '../dummyData/137/scatter/max/data';

import linedaily137 from '../dummyData/137/line/daily/data';
import lineweekly137 from '../dummyData/137/line/weekly/data';
import linemonthly137 from '../dummyData/137/line/monthly/data';
import lineyearly137 from '../dummyData/137/line/yearly/data';
import line3years137 from '../dummyData/137/line/3years/data';
import linemax137 from '../dummyData/137/line/max/data';

import linedaily142 from '../dummyData/142/line/daily/data';
import lineweekly142 from '../dummyData/142/line/weekly/data';
import linemonthly142 from '../dummyData/142/line/monthly/data';
import lineyearly142 from '../dummyData/142/line/yearly/data';
import line3years142 from '../dummyData/142/line/3years/data';
import linemax142 from '../dummyData/142/line/max/data';

import scatterdaily142 from '../dummyData/142/scatter/daily/data';
import scatterweekly142 from '../dummyData/142/scatter/weekly/data';
import scattermonthly142 from '../dummyData/142/scatter/monthly/data';
import scatteryearly142 from '../dummyData/142/scatter/yearly/data';
import scatter3years142 from '../dummyData/142/scatter/3years/data';
import scattermax142 from '../dummyData/142/scatter/max/data';


const getData: Object = new Map([
  [ 'linedaily2', linedaily2, ],
  [ 'lineweekly2', lineweekly2, ],
  [ 'linemonthly2', linemonthly2, ],
  [ 'lineyearly2', lineyearly2, ],
  [ 'linetripleYear2', line3years2, ],
  [ 'linemax2', linemax2, ],
  [ 'scatterdaily2', scatterdaily2, ],
  [ 'scatterweekly2', scatterweekly2, ],
  [ 'scattermonthly2', scattermonthly2, ],
  [ 'scatteryearly2', scatteryearly2, ],
  [ 'scattertripleYear2', scatter3years2, ],
  [ 'scattermax2', scattermax2, ],
  [ 'scatterdaily137', scatterdaily137, ],
  [ 'scatterweekly137', scatterweekly137, ],
  [ 'scattermonthly137', scattermonthly137, ],
  [ 'scatteryearly137', scatteryearly137, ],
  [ 'scattertripleYear137', scatter3years137, ],
  [ 'scattermax137', scattermax137, ],
  [ 'linedaily137', linedaily137, ],
  [ 'lineweekly137', lineweekly137, ],
  [ 'linemonthly137', linemonthly137, ],
  [ 'lineyearly137', lineyearly137, ],
  [ 'linetripleYear137', line3years137, ],
  [ 'linemax137', linemax137, ],
  [ 'linedaily142', linedaily142, ],
  [ 'lineweekly142', lineweekly142, ],
  [ 'linemonthly142', linemonthly142, ],
  [ 'lineyearly142', lineyearly142, ],
  [ 'linetripleYear142', line3years142, ],
  [ 'linemax142', linemax142, ],
  [ 'scatterdaily142', scatterdaily142, ],
  [ 'scatterweekly142', scatterweekly142, ],
  [ 'scattermonthly142', scattermonthly142, ],
  [ 'scatteryearly142', scatteryearly142, ],
  [ 'scattertripleYear142', scatter3years142, ],
  [ 'scattermax142', scattermax142, ],
]);

type Props = {
  indexId: number | string,
  time: string,
  type: string,
  changeStats: Function,
  miscStyles: ?Object,
}

const Line = dynamic(import('./graphs/Line/Line'), {
  loading: () => null,
  ssr: false,
});

const Scatter = dynamic(import('./graphs/Scatter/Scatter'), {
  loading: () => null,
  ssr: false,
});


const Graph: StatelessFunctionalComponent<Props> =
  ({ indexId, time, type, changeStats, miscStyles, }) => {
    const GraphElement = type === 'line'
      ? Line
      : Scatter;
    const data = indexId && type && time ? getData.get(`${type}${time}${indexId}`) : {};
    return (
      <FelaTheme
        render={theme => (
          <FelaComponent
            style={{
              extend: [
                ...(miscStyles
                  ? parseStyleProps(miscStyles, theme.mq, theme.type)
                  : []),
              ],
            }}
          >
            <GraphElement theme={theme} data={data.dataSource} changeStats={changeStats} />
          </FelaComponent>
        )}
      />
    );
  };


export default Graph;
