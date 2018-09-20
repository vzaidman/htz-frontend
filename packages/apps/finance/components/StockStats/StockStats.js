// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import type { Node, StatelessFunctionalComponent, } from 'react';
import type { Stock as LineStock, } from '../Graph/graphs/Line/Line';
import type { Stock as ScatterStock, } from '../Graph/graphs/Scatter/Scatter';

type Stats = Array<{ title: string, value: string | number, }>

// eslint-disable-next-line react/prop-types
const Stat: StatelessFunctionalComponent<any> = ({ children, title, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      alignItems: 'center',
      display: 'flex',
      flexBasis: '100%',
      flexDirection: 'column',
      flexGrow: '1',
      flexShrink: '1',
      justifyContent: 'center',
      position: 'relative',
      ':not(:last-child)': {
        ':after': {
          backgroundColor: theme.color('neutral', '-4'),
          content: '""',
          end: '0',
          height: '80%',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2px',
        },
      },
    })}
  >
    <FelaComponent style={{ fontWeight: '700', }} render="span">{title}</FelaComponent>
    <FelaComponent
      style={theme => ({
        ...theme.type(1),
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, }) => children(className)}
    />
  </FelaComponent>
);

type Props = {
  graphType: 'line' | 'scatter',
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'tripleYear' | 'max',
  render: ({changeStats: (stock: LineStock | ScatterStock) => void}) => Node,
  miscStyles: ?Object,
}
type State = {
  stats: Stats,
}

class StockStats extends React.Component<Props, State> {
  state = {
    stats: [],
  };

  getDateStat: (number, string) => { title: string, value: string, } = (date, time) => {
    let title: string;
    let value: string;
    switch (time) {
      case 'daily':
        title = 'שעה';
        value = new Date(date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', });
        break;
      default:
        title = 'תאריך';
        value = new Date(date).toLocaleDateString('en-GB');
    }
    return { title, value, };
  };

  changeStats: Object => void = stock => {
    const { period, graphType, } = this.props;
    let stats: Stats;

    if (graphType === 'line') {
      const { time, value, change, }: LineStock = stock || {};
      stats = [
        { ...this.getDateStat(time, period), },
        { title: 'שער', value: value || '', },
        { title: '% שינוי', value: change || '', },
      ];
    }
    else {
      const { x, y, name, }: ScatterStock = stock || {};
      stats = [
        { title: 'מניה', value: name || '', },
        { title: 'מחזור', value: x || '', },
        { title: '% תשואה', value: y || '', },
      ];
    }
    this.setState({ stats, });
  };

  render() {
    const { render, miscStyles, } = this.props;
    const { stats, } = this.state;
    return (
      <Fragment>
        {render({ changeStats: this.changeStats, })}
        <FelaComponent
          style={theme => ({
            backgroundColor: theme.color('neutral', '-2'),
            color: theme.color('neutral', '-10'),
            display: 'flex',
            height: '9rem',
            paddingBottom: '1rem',
            paddingTop: '1rem',
            ...theme.type(-1),
            extend: [
              ...(miscStyles
                ? parseStyleProps(miscStyles, theme.mq, theme.type)
                : []),
            ],
          })}
        >
          {
            stats && stats.length > 0 ? (
              <Fragment>
                <Stat title={stats[0].title}>
                  {className => <span className={className}>{stats[0].value}</span>}
                </Stat>
                <Stat title={stats[1].title}>
                  {className => <span className={className}>{stats[1].value}</span>}
                </Stat>
                <Stat
                  title={stats[2].title}
                  miscStyles={{
                    color: Number(stats[2].value) < 0 ? 'red' : 'green',
                    direction: 'ltr',
                    ':before': {
                      content: Number(stats[2].value) > 0 ? '"+"' : Number(stats[2].value) < 0 ? '"-"' : '""',
                    },
                    ':after': {
                      content: '"%"',
                    },
                  }}
                >
                  {className => (
                    <span className={className}>{Math.abs(Number(stats[2].value))}</span>
                  )}
                </Stat>
              </Fragment>
            ) : null
          }
        </FelaComponent>
      </Fragment>
    );
  }
}

export default StockStats;
