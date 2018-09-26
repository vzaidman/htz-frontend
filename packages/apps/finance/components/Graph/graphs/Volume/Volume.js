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
};
/* eslint-enable react/no-unused-prop-types */

type State= {
  duration?: number,
  theme: Object,
  yScale: number => number,
  xScale: number => number,
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

/* SVG frame's settings */
const width = 574;
const height = 104;
const margin = { top: 0, right: 161, bottom: 0, left: 0, };

class Volume extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
  };

  state = {
    /* Base scales for x & y axis */
    yScale: d3.scaleBand().range([ height - margin.bottom, margin.top, ]),
    xScale: d3.scaleLinear().range([ margin.right, width - margin.left, ]),
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

  componentDidMount() {
    const { data, } = this.props;
    if (data) this.renderGraph(data);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.data && nextProps.data !== this.props.data) this.renderGraph(nextProps.data);
    return false;
  }

  svgRef: ElementRef<'svg'> | null;
  barsRef: ElementRef<'g'> | null;
  yAxisRef: ElementRef<'g'> | null;

  /* Create graph's axis */
  yAxis = d3.axisRight().scale(this.state.yScale).tickSize(0);

  /**
   * This function responsible for rendering and updating the graph.
   * @param data - An Array of stocks to be drawn.
   */
  renderGraph: Array<BarData> => void = data => {
    const { yScale, xScale, theme, } = this.state;

    /* Set the init bars svg elements, and set the animation's key (its index). */
    const bars = d3.select(this.barsRef)
      .selectAll('rect')
      .data(data, (d, i) => i);

    /* Set the Exit event. */
    bars.exit().remove();

    /* Set the Enter event and the position, height and width. */
    bars
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.name))
      .attr('height', yScale.bandwidth())
      .attr('x', d => width - xScale(d.value))
      .attr('width', d => xScale(d.value) - margin.right)
      .attr('fill', theme.color('neutral', '-2'));

    bars
      .enter()
      .append('rect')
      .attr('y', d => yScale(d.name))
      .attr('height', yScale.bandwidth())
      .attr('x', 0)
      .attr('width', d => width - xScale(d.value))
      .attr('fill', theme.color('neutral', '-6'));

    d3.select(this.barsRef)
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => width - xScale(d.value))
      .attr('y', d => yScale(d.name) + (yScale.bandwidth() / 2))
      .attr('dx', '10')
      .attr('dy', '.36em')
      .attr('text-anchor', 'end')
      .attr('fill', theme.color('neutral', '-10'))
      .text(d => numToString(d.value));

    /* Select the Y axis group reference */
    const yAxisRef = d3.select(this.yAxisRef);

    /* Remove the default vertical axis. */
    yAxisRef.call(this.yAxis)
      .select('.domain').remove();
  };

  render(): Node {
    const { miscStyles, } = this.props;
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
            ref={svgRef => { this.svgRef = svgRef; }}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            width="100%"
            direction="rtl"
          >
            <g
              ref={barsRef => { this.barsRef = barsRef; }}
            />
            <FelaComponent
              rule={({ theme, }) => ({
                ...theme.type(-2),
                fontWeight: '700',
                fontFamily: theme.fontStacks.enhanced,
              })}
              render={({ className, }) => (
                <g
                  className={className}
                  ref={yAxisRef => { this.yAxisRef = yAxisRef; }}
                  transform={`translate(${width}, 0)`}
                  fill={theme.color('neutral', '-3')}
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
