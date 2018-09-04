// @flow
import React from 'react';
import type {
  ElementRef,
  Node,
} from 'react';
import { FelaComponent, } from 'react-fela';
import * as d3 from 'd3';

import type { Stats, } from '../../../StockStats/StockStats';

type Stock = [ number, number, number, string, ];

/* eslint-disable react/no-unused-prop-types */
type Props = {
  data: Array<Stock>,
  duration: number,
  theme: Object,
  changeStats: ({ stats: Stats, }) => void,
};
/* eslint-enable react/no-unused-prop-types */

type State= {
  duration: number,
  theme: Object,
  yScale: number => number,
  xScale: number => number,
};

/* SVG frame's settings */
const width = 574;
const height = 308;
const margin = { top: 34, right: 10, bottom: 15, left: 50, };

class Line extends React.Component<Props, State> {
  static defaultProps = {
    duration: 1000,
  };

  state = {
    /* Base scales for x & y axis */
    yScale: d3.scaleLinear().range([ height - margin.bottom, margin.top, ]),
    xScale: d3.scaleTime().range([ margin.left, width - margin.right, ]),
    theme: {},
    duration: 1000,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, duration, theme, } = nextProps;
    const { yScale, xScale, } = prevState;

    /* Extract graph's start & end points from the data */
    const xExtent = d3.extent(data, stock => stock[0]);
    const [ yMin, yMax, ] = d3.extent(data, stock => stock[1]);

    /* Calculate x & y inner padding */
    // TODO: do this through median difference rather than hard coded
    const yPadding = 2;

    /* Combine the start & ends points with the padding and inset them into the scales */
    yScale.domain([ yMin - yPadding, yMax + yPadding, ]);
    xScale.domain(xExtent);

    return {
      yScale,
      xScale,
      duration,
      theme,
    };
  }

  componentDidMount() {
    const { data, } = this.props;
    this.dataIndex = data.length - 1;
    console.log('DATA: ',data);
    if (data) this.renderGraph(data);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.data !== this.props.data) this.renderGraph(nextProps.data);
    return false;
  }

  /**
   * This function extracts the mouse X position relative to the cover rectangle (@this.overlayRef)
   * and with the help of d3's xScale function, retrieves the item that occupies the same X poition
   * on the graph.
   * @returns {*}
   */
  getStockFromMouseEvent: () => Stock = () => {
    const { xScale, } = this.state;
    const { data, } = this.props;

    /* Get the X value of the item that occupies the same X as the mouse position */
    const x: number = xScale.invert(d3.mouse(this.overlayRef)[0]);

    /* Get the later's index position in the data array */
    const bisectDate: Function = d3.bisector(d => d[0]).left;
    const i: number = bisectDate(data, x, 1);

    /* In case the cursor is between two items, calculate which on is the closest */
    const stockIndex: number =
      !data[i - 1] ? i
        : !data[i] ? i - 1
          : x - data[i - 1][0] > data[i][0] - x ? i : i - 1;

    this.dataIndex = stockIndex;
    return data[stockIndex];
  };

  yMean: number;
  dataIndex: number;
  graphRef: ElementRef<'g'> | null;
  xAxisRef: ElementRef<'g'> | null;
  yAxisRef: ElementRef<'g'> | null;
  lineRef: ElementRef<'line'> | null;
  circleRef: ElementRef<'circle'> | null;
  polyRef: ElementRef<'polygon'> | null;
  overlayRef: ElementRef<'rect'> | null;

  /**
   * This function accepts Stock type array, extracts its items and sends them to the parent component.
   * @param stock - An array of stock data to be passed t othe parent component.
   */
  updateStatsState: ?Stock => void = stock => {
    const [ time, rate, change, ] = stock || [];
    const stats: Stats = [
      { title: 'שעה',
        value: time ?
          new Date(time).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', })
          : '',
      },
      { title: 'שער', value: rate || '', },
      { title: '% שינוי', value: change || '', },
    ];
    this.props.changeStats({ stats, });
  };

  /* Create graph's axis */
  xAxis = d3.axisTop().scale(this.state.xScale).tickFormat(d3.timeFormat('%H:%M'));
  yAxis = d3.axisLeft().scale(this.state.yScale);

  /**
   * This function is in charge of giving the indication line a new X position.
   * @param d - An array of stock data that the indication line should be pointed at. if
   *  not supplies, the function will extract that data with `getStockFromMouseEvent`.
   * @param animate - Should the circle in the indication line be animated.
   */
  moveLine: (?Stock, boolean) => void = (d, animate) => {
    const { xScale, yScale, duration, theme, } = this.state;

    /* Set transition. */
    const transition = d3.transition().duration(animate ? duration : null);

    /* If no specific stock passed to this function, go and get the one that
     the mouse is currently hover at its X axis and extract it's X & Y (Time & Rate). */
    const stock: Stock = d || this.getStockFromMouseEvent();
    const [ time, rate, ] = stock;
    const positionX: number = xScale(time);
    const positionY: number = yScale(rate);

    /* Take the indicator's dotted line, and change it's X position. */
    d3.select(this.lineRef)
      .attr('stroke', theme.color('neutral', '-3'))
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3 3')
      .attr('x1', positionX)
      .attr('y1', height - margin.bottom)
      .attr('x2', positionX)
      .attr('y2', 0);

    /* Prepare indicator's triangle's dimensions. */
    const poly = [
      { x: positionX - 15, y: height, },
      { x: positionX, y: height - margin.bottom, },
      { x: positionX + 15, y: height, },
    ];

    /* Change indicator's triangle's X position. */
    d3.select(this.polyRef)
      .data([ poly, ])
      .attr('points', points => points.map(point => [ point.x, point.y, ].join(',')).join(' '))
      .attr('fill', theme.color('neutral', '-2'));

    /* Change indicator's circle's X & Y position. */
    const circle = d3.select(this.circleRef)
      .attr('fill', '#f5a623')
      .attr('r', 0)
      .attr('cx', positionX)
      .attr('cy', positionY);

    circle.merge(circle)
      .transition(transition)
      .attr('r', 4);

    /* Send the hovered stock and send it's data to the parent component. */
    this.updateStatsState(stock);
  };

  /**
   * This function responsible for rendering and updating the graph.
   * @param data - An Array of stocks to be drawn.
   */
  renderGraph: Array<Stock> => void = data => {
    const { yScale, xScale, duration, } = this.state;
    /* Set transition. */
    const transition = d3.transition().duration(duration);

    /* Set the init lines svg elements, and set the animation's key (the date). */
    const lines = d3.select(this.graphRef)
      .selectAll('line')
      .data(data, d => d[0]);

    /* Set the Exit event. */
    lines.exit().remove();

    /* Find and save the average height for the init Y. */
    this.yMean = d3.mean(data, stock => stock[1]);

    /* Set the Enter event and the init position. */
    const enter = lines
      .enter()
      .append('line')
      .attr('x1', d => xScale(d[0]))
      .attr('x2', (d, i) => (data[i + 1] ? xScale(data[i + 1][0]) : xScale(d[0])))
      .attr('y1', yScale(this.yMean))
      .attr('y2', yScale(this.yMean));

    /* Merge the Enter event with the Update event and animation. */
    enter.merge(lines)
      .attr('stroke', '#f5a623')
      .attr('stroke-width', 1)
      .transition(transition)
      .attr('x1', d => xScale(d[0]))
      .attr('y1', d => yScale(d[1]))
      .attr('x2', (d, i) => (data[i + 1] ? xScale(data[i + 1][0]) : xScale(d[0])))
      .attr('y2', (d, i) => (data[i + 1] ? yScale(data[i + 1][1]) : yScale(d[1])));

    /* Set a listener on the cover rectangle. */
    d3.select(this.overlayRef).on('mousemove', this.moveLine);

    /* Move the line indicator to it's init position. */
    this.moveLine(data[this.dataIndex], true);

    /* Select the X & Y axis group reference */
    const xAxisRef = d3.select(this.xAxisRef);
    const yAxisRef = d3.select(this.yAxisRef);

    /* Remove the default horizontal axis and its ticks. */
    xAxisRef.call(this.xAxis)
      .selectAll('.tick line, .domain').remove();

    /* Remove the default vertical axis. */
    yAxisRef.call(this.yAxis)
      .select('.domain').remove();

    /* Select all vertical axis ticks. */
    const yAxisLines = yAxisRef.selectAll('.tick line');

    /* Set the Exit event. */
    yAxisLines.exit().remove();

    /* Set the Enter event and the init opacity. */
    const linesEnter = yAxisLines
      .attr('opacity', 0);

    /* Merge the Enter event with the Update event and animation. */
    linesEnter.merge(linesEnter)
      .attr('stroke', '#777')
      .attr('stroke-width', 0.5)
      .attr('x1', 0)
      .attr('x2', width - margin.left)
      .transition(transition)
      .attr('opacity', 1);
  };

  render(): Node {
    return (
      <FelaComponent
        style={theme => ({ backgroundColor: theme.color('neutral', '-1'), })}
        render={({ className, theme, }) => (
          <svg
            className={className}
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            direction="ltr"
          >
            <g
              // eslint-disable-next-line no-return-assign
              ref={graphRef => this.graphRef = graphRef}
            />
            <g
              // eslint-disable-next-line no-return-assign
              ref={xAxisRef => this.xAxisRef = xAxisRef}
              transform={`translate(0, ${margin.top})`}
              stroke={theme.color('neutral', '-3')}
            />
            <g
              // eslint-disable-next-line no-return-assign
              ref={yAxisRef => this.yAxisRef = yAxisRef}
              transform={`translate(${margin.left}, 0)`}
              stroke={theme.color('neutral', '-3')}
            />
            <g>
              <line
                // eslint-disable-next-line no-return-assign
                ref={lineRef => this.lineRef = lineRef}
              />
              <circle
                // eslint-disable-next-line no-return-assign
                ref={circleRef => this.circleRef = circleRef}
              />
              <polygon
                // eslint-disable-next-line no-return-assign
                ref={polyRef => this.polyRef = polyRef}
              />
            </g>
            <rect
              // eslint-disable-next-line no-return-assign
              ref={overlayRef => this.overlayRef = overlayRef}
              x={margin.left}
              y={margin.top}
              width={width - (margin.left + margin.right)}
              height={height - (margin.top + margin.bottom)}
              style={{ fill: 'none', pointerEvents: 'all', }}
            />
          </svg>
        )}
      />
    );
  }
}

export default Line;
