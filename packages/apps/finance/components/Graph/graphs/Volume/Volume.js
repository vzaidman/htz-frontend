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
};
/* eslint-enable react/no-unused-prop-types */

type State = {
  duration?: number,
  theme: Object,
  yScale: number => number,
  xScale: number => number,
};

const numToString: number => string = num => num.toLocaleString('he', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

class Volume extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
    width: 574,
    height: 104,
    margin: { top: 0, right: 161, bottom: 0, left: 0, },
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
        this.props.margin.right,
        this.props.width - this.props.margin.left,
      ]),
    theme: {},
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, theme, } = nextProps;
    const { yScale, xScale, } = prevState;

    /* Extract the Min & Max points and inset them into the scales. */
    xScale.domain([ 0, d3.max(data, d => d.value), ]);
    yScale.domain(data.map(d => d.name).reverse()).padding(0.5);

    return {
      yScale,
      xScale,
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

  /**
   * This function responsible for rendering and updating the graph.
   * @param data - An Array of stocks to be drawn.
   */
  renderGraph: (Array<BarData>) => void = data => {
    const { yScale, xScale, theme, } = this.state;
    const { width, margin, } = this.props;

    /* Set the init bars svg elements, and set the animation's key (its index). */
    const bars = d3
      .select(this.barsRef)
      .selectAll()
      .data(data, (d, i) => i);

    /* Set the Exit event. */
    bars.exit().remove();

    const barElements = bars
      .enter()
      .append('g')
      .attr('class', (d, i) => `bar${i}`);
    /* Set the filled bar. */
    barElements
      .append('rect')
      .attr('y', d => yScale(d.name))
      .attr('height', yScale.bandwidth())
      .attr('x', d => width - xScale(d.value))
      .attr('width', d => xScale(d.value) - margin.right)
      .attr('fill', theme.color('neutral', '-2'));

    /* Set the background bar. */
    barElements
      .append('rect')
      .attr('y', d => yScale(d.name))
      .attr('height', yScale.bandwidth())
      .attr('x', 0)
      .attr('width', d => width - xScale(d.value))
      .attr('fill', theme.color('neutral', '-6'));

    /* Set the volume text. */
    barElements
      .append('text')
      .attr('x', d => width - xScale(d.value))
      .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
      .attr('dx', '10')
      .attr('dy', '.36em')
      .attr('text-anchor', 'end')
      .attr('fill', theme.color('neutral', '-10'))
      .text(d => numToString(d.value));

    /* In cae that the text is wider than the bar, change its position and color. */
    barElements.selectAll('rect').each((group, i) => {
      const rectElement = d3.select(`.bar${i} rect`);
      const textElement = d3.select(`.bar${i} text`);
      if (
        rectElement.node().getBoundingClientRect().width
        < textElement.node().getBoundingClientRect().width
      ) {
        textElement
          .attr('dx', '-10')
          .attr('text-anchor', 'start')
          .attr('fill', theme.color('neutral', '-2'));
      }
    });

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
                ...theme.type(-2),
                fontWeight: '700',
                textAnchor: 'start', // Todo: BUG!! at the client, this rule will be transcoded as "text-anchor: right;", which is an illegal value
                fontFamily: theme.fontStacks.enhanced,
              }}
              render={({ className, }) => (
                <g
                  className={className}
                  ref={yAxisRef => {
                    this.yAxisRef = yAxisRef;
                  }}
                  transform={`translate(${width - 10}, 0)`}
                  fill={theme.color('neutral', '-3')}
                  style={{ textAnchor: 'start', }}
                />
              )}
            />
          </svg>
        )}
      />
    );
  }
}

export default Volume;
