// @flow
import React from 'react';
import type { ElementRef, Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import * as d3 from 'd3';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

type BarData = {
  name: string,
  value: number,
};

/* eslint-disable react/no-unused-prop-types */
type Props = {
  data: Array<BarData>,
  theme: Object,
  miscStyles?: Object,
  width: number,
  height: number,
  margin: { top: number, right: number, bottom: number, left: number, },
  midSpace: number,
};
/* eslint-enable react/no-unused-prop-types */

type State = {
  theme: Object,
  yScale: number => number,
  xScale: number => number,
};

class Yield extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
    width: 574,
    height: 145,
    margin: { top: 7, right: 50, bottom: 7, left: 0, },
    midSpace: 10,
  };

  state = {
    /* Base scales for x & y axis */
    yScale: d3
      .scaleBand()
      .range([
        this.props.height - this.props.margin.bottom,
        this.props.margin.top,
      ]),
    xScale: d3
      .scaleLinear()
      .range([
        this.props.margin.left,
        (this.props.width - this.props.margin.right) / 2 - this.props.midSpace,
      ]),
    theme: {},
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, theme, } = nextProps;
    const { yScale, xScale, } = prevState;

    /* Set the scales. */
    yScale.domain(data.map(d => d.name).reverse()).padding(0.3);
    xScale.domain([ 0, d3.max(data, d => Math.abs(d.value)) * 1.5, ]);

    return {
      xScale,
      yScale,
      theme,
    };
  }

  /* Create graph's axis */
  yAxis = d3
    .axisRight()
    .scale(this.state.yScale)
    .tickSize(0);

  componentDidMount() {
    const { data, } = this.props;
    if (data) this.renderGraph(data);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.data && nextProps.data !== this.props.data) this.renderGraph(nextProps.data);
    return false;
  }

  svgRef: ElementRef<"svg"> | null;

  barsRef: ElementRef<"g"> | null;

  yAxisRef: ElementRef<"g"> | null;

  midRef: ElementRef<"g"> | null;

  /**
   * This function responsible for rendering and updating the graph.
   * @param data - An Array of stocks to be drawn.
   */
  renderGraph: (Array<BarData>) => void = data => {
    const { yScale, xScale, theme, } = this.state;
    const { height, width, margin, midSpace, } = this.props;

    /* Set the init bars svg elements, and set the animation's key (its index). */
    const bars = d3
      .select(this.barsRef)
      .selectAll('rect')
      .data(data, (d, i) => i);

    /* Set the Exit event. */
    bars.exit().remove();

    bars
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.name))
      .attr('height', yScale.bandwidth())
      .attr('x', margin.left)
      .attr('width', width - margin.right)
      .attr('fill', theme.color('neutral', '-6'));

    /* Set the Enter event and the position, height and width. */
    bars
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.name))
      .attr('height', yScale.bandwidth())
      .attr(
        'x',
        d => (d.value > 0
          ? (width - (margin.left + margin.right)) / 2 + midSpace / 2
          : (width - (margin.left + margin.right)) / 2
              - xScale(Math.abs(d.value))
              - midSpace / 2)
      )
      .attr('width', d => xScale(Math.abs(d.value)))
      .attr(
        'fill',
        d => (d.value > 0 ? theme.color('secondary') : theme.color('negative'))
      );

    d3.select(this.barsRef)
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr(
        'x',
        d => (d.value > 0
          ? (width - (margin.left + margin.right)) / 2
              + xScale(Math.abs(d.value))
          : (width - (margin.left + margin.right)) / 2
              - xScale(Math.abs(d.value)))
      )
      .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
      .attr('dx', d => (d.value > 0 ? '10' : '-10'))
      .attr('dy', '.36em')
      .attr('text-anchor', d => (d.value > 0 ? 'start' : 'end'))
      .attr('fill', theme.color('neutral'))
      .attr('style', 'font-size: 12px; direction: ltr')
      .text(
        d => `
        ${d.value > 0 ? '+' : '-'}
        ${Math.abs(d.value)}%
      `
      );

    const poly = [
      {
        x: (width - (margin.left + margin.right)) / 2 - midSpace / 2,
        y: margin.bottom,
      },
      {
        x: (width - (margin.left + margin.right)) / 2 + midSpace / 2,
        y: margin.bottom,
      },
      {
        x: (width - (margin.left + margin.right)) / 2 + midSpace / 2,
        y: height - margin.top,
      },
      {
        x: (width - (margin.left + margin.right)) / 2 - midSpace / 2,
        y: height - margin.top,
      },
    ];

    d3.select(this.midRef)
      .append('polygon')
      .data([ poly, ])
      .attr('stroke', theme.color('neutral', '-10'))
      .attr('fill', theme.color('neutral', '-10'))
      .attr('points', points => points.map(point => [ point.x, point.y, ].join(',')).join(' ')
      );

    d3.select(this.midRef)
      .append('line')
      .attr('stroke', theme.color('neutral', '-4'))
      .attr('stroke-width', 1)
      .attr('x1', (width - (margin.left + margin.right)) / 2)
      .attr('y1', margin.bottom)
      .attr('x2', (width - (margin.left + margin.right)) / 2)
      .attr('y2', height - margin.top);

    /* Select the Y axis group reference */
    const yAxisRef = d3.select(this.yAxisRef);

    /* Remove the default vertical axis. */
    yAxisRef
      .call(this.yAxis)
      .select('.domain')
      .remove();
  };

  render(): Node {
    const { miscStyles, height, width, } = this.props;
    return (
      <FelaComponent
        style={theme => ({
          backgroundColor: theme.color('neutral', '-10'),
          extend: [
            ...(miscStyles
              ? parseStyleProps(miscStyles, theme.mq, theme.type)
              : []),
          ],
        })}
        render={({ className, theme, }) => (
          <svg
            ref={svgRef => {
              this.svgRef = svgRef;
            }}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            width="100%"
            direction="rtl"
          >
            <g
              ref={barsRef => {
                this.barsRef = barsRef;
              }}
            />
            <FelaComponent
              style={{
                ...theme.type(-1),
                fontWeight: '700',
                fontFamily: theme.fontStacks.enhanced,
              }}
              render={({ className, }) => (
                <g
                  className={className}
                  ref={yAxisRef => {
                    this.yAxisRef = yAxisRef;
                  }}
                  transform={`translate(${width}, 0)`}
                  fill={theme.color('neutral', '-3')}
                />
              )}
            />
            <g
              ref={midRef => {
                this.midRef = midRef;
              }}
            />
          </svg>
        )}
      />
    );
  }
}

export default Yield;
