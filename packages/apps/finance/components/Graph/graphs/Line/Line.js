// @flow
import React, { Fragment, } from 'react';
import type {
  ElementRef,
  Node,
} from 'react';
import { FelaComponent, } from 'react-fela';
import * as d3 from 'd3';

export type Stock = {
  time: number,
  value: number,
  yieldSpread: number,
  change: number,
  volume: number,
  name: string,
  symbol: string,
};

/* eslint-disable react/no-unused-prop-types */
type Props = {
  data: Array<Stock>,
  duration: number,
  theme: Object,
  changeStats: (stock: Stock) => void,
  width: number,
  height: number,
  margin: { top: number, right: number, bottom: number, left: number, },
};
/* eslint-enable react/no-unused-prop-types */

type State= {
  duration: number,
  theme: Object,
  yScale: number => number,
  xScale: number => number,
};

class Line extends React.Component<Props, State> {
  static defaultProps = {
    duration: 1000,
  };

  state = {
    /* Base scales for x & y axis */
    yScale: d3.scaleLinear().range(
      [ this.props.height - this.props.margin.bottom,
        this.props.margin.top,
      ]
    ),
    xScale: d3.scaleTime().range(
      [
        this.props.margin.left,
        this.props.width - this.props.margin.right,
      ]
    ),
    theme: {},
    duration: 1000,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, duration, theme, } = nextProps;
    const { yScale, xScale, } = prevState;

    /* Extract graph's start & end points from the data */
    const xExtent = data ? d3.extent(data, stock => stock.time) : [ 0, 0, ];
    const [ yMin, yMax, ] = data ? d3.extent(data, stock => stock.value) : [ 0, 0, ];

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
    if (data) {
      this.dataIndex = data.length - 1;
      this.renderGraph(data);
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.data && nextProps.data !== this.props.data) this.renderGraph(nextProps.data);
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
    const bisectDate: Function = d3.bisector(d => d.time).left;
    const i: number = bisectDate(data, x, 1);

    /* In case the cursor is between two items, calculate which on is the closest */
    const stockIndex: number =
      !data[i - 1] ? i
        : !data[i] ? i - 1
          : x - data[i - 1].time > data[i].time - x ? i : i - 1;

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
    const { height, margin, } = this.props;

    /* Set transition. */
    const transition = d3.transition().duration(animate ? duration : null);

    /* If no specific stock passed to this function, go and get the one that
     the mouse is currently hover at its X axis and extract it's X & Y (Time & Rate). */
    const stock: Stock = d || this.getStockFromMouseEvent();
    const { time, value, } = stock;
    const positionX: number = xScale(time);
    const positionY: number = yScale(value);

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
    this.props.changeStats(stock);
  };

  /**
   * This function responsible for rendering and updating the graph.
   * @param data - An Array of stocks to be drawn.
   */
  renderGraph: Array<Stock> => void = data => {
    const { yScale, xScale, duration, theme, } = this.state;
    const { width, margin, } = this.props;

    /* Set transition. */
    const transition = d3.transition().duration(duration);

    /* Set the init lines svg elements, and set the animation's key (the date). */
    const lines = d3.select(this.graphRef)
      .selectAll('line')
      .data(data, (d, i) => i);

    /* Find and save the average height for the init Y. */
    this.yMean = d3.mean(data, stock => stock.value);

    /* Set the Exit event. */
    lines.exit()
      .transition(transition)
      .attr('y1', yScale(this.yMean))
      .attr('y2', yScale(this.yMean))
      .remove();

    /* Set the Enter event and the init position. */
    const enter = lines
      .enter()
      .append('line')
      .attr('x1', d => xScale(d.time))
      .attr('x2', (d, i) => (data[i + 1] ? xScale(data[i + 1].time) : xScale(d.time)))
      .attr('y1', yScale(this.yMean))
      .attr('y2', yScale(this.yMean));

    /* Merge the Enter event with the Update event and animation. */
    enter.merge(lines)
      .attr('stroke', '#f5a623')
      .attr('stroke-width', 1)
      .transition(transition)
      .attr('x1', d => xScale(d.time))
      .attr('y1', d => yScale(d.value))
      .attr('x2', (d, i) => (data[i + 1] ? xScale(data[i + 1].time) : xScale(d.time)))
      .attr('y2', (d, i) => (data[i + 1] ? yScale(data[i + 1].value) : yScale(d.value)));

    /* Set a listener on the cover rectangle. */
    d3.select(this.overlayRef).on('mousemove', this.moveLine);

    /* Move the line indicator to it's init position. */
    this.moveLine(data[this.dataIndex] || data[data.length - 1], true);

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

    yAxisRef.selectAll('.tick text')
      .attr('fill', theme.color('neutral', '-3'));
    xAxisRef.selectAll('.tick text')
      .attr('fill', theme.color('neutral', '-3'));

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
    const { width, height, margin, } = this.props;
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
              ref={graphRef => { this.graphRef = graphRef; }}
            />
            <FelaComponent
              style={{
                ...theme.type(-3),
                fontFamily: theme.fontStacks.enhanced,
              }}
              render={({ className, }) => (
                <Fragment>
                  <g
                    className={className}
                    ref={xAxisRef => { this.xAxisRef = xAxisRef; }}
                    transform={`translate(0, ${margin.top})`}
                  />
                  <g
                    className={className}
                    ref={yAxisRef => { this.yAxisRef = yAxisRef; }}
                    transform={`translate(${margin.left}, 0)`}
                  />
                </Fragment>
              )}
            />
            <g>
              <line
                ref={lineRef => { this.lineRef = lineRef; }}
              />
              <circle
                ref={circleRef => { this.circleRef = circleRef; }}
              />
              <polygon
                ref={polyRef => { this.polyRef = polyRef; }}
              />
            </g>
            <rect
              ref={overlayRef => { this.overlayRef = overlayRef; }}
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
