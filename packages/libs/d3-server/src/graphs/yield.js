import D3Node from 'd3-node';
import * as d3 from 'd3';
import { tmTheme as theme, } from '@haaretz/tm-theme';

export default (data, {
  width = 574,
  height = 145,
  margin = { top: 7, right: 50, bottom: 7, left: 0, },
  midSpace = 10,
}) => {
  const options = {
    d3Module: d3,
  };

  const d3n = new D3Node(options);

  /* Extract graph's start & end points from the data */
  const yScale = d3.scaleBand()
    .range([ height - margin.bottom, margin.top, ])
    .domain(data.map(d => d.name).reverse()).padding(0.3);

  const xScale = d3.scaleLinear()
    .range([ margin.left, ((width - margin.right) / 2) - midSpace, ])
    .domain([ 0, d3.max(data, d => Math.abs(d.value)) * 1.5, ]);

  const svg = d3n.createSVG(null, null, {
    direction: 'rtl',
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
    style: 'padding-left: 14px; padding-right: 14px;',
    'font-family': 'sans-serif',
  });

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', theme.color('neutral', '-10'));

  const bars = svg
    .append('g')
    .selectAll('rect')
    .data(data);

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
    .attr('x', d => (
      d.value > 0
        ? ((width - (margin.left + margin.right)) / 2) + (midSpace / 2)
        : (
          ((width - (margin.left + margin.right)) / 2) - xScale(Math.abs(d.value))
        ) - (midSpace / 2)
    ))
    .attr('width', d => xScale(Math.abs(d.value)))
    .attr('fill', d => (
      d.value > 0
        ? theme.color('secondary')
        : theme.color('negative')
    ));

  svg
    .append('g')
    .attr('style', 'font-size: 12px; direction: ltr')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => (
      d.value > 0
        ? ((width - (margin.left + margin.right)) / 2) + xScale(Math.abs(d.value))
        : ((width - (margin.left + margin.right)) / 2) - xScale(Math.abs(d.value))
    ))
    .attr('y', d => yScale(d.name) + (yScale.bandwidth() / 2))
    .attr('dx', d => (d.value > 0 ? '10' : '-10'))
    .attr('dy', '.36em')
    .attr('text-anchor', d => (d.value > 0 ? 'start' : 'end'))
    .attr('fill', theme.color('neutral'))
    .text(d => `
        ${d.value > 0 ? '+' : '-'}
        ${Math.abs(d.value)}%
      `);


  const poly = [
    { x: ((width - (margin.left + margin.right)) / 2) - (midSpace / 2), y: margin.bottom, },
    { x: ((width - (margin.left + margin.right)) / 2) + (midSpace / 2), y: margin.bottom, },
    { x: ((width - (margin.left + margin.right)) / 2) + (midSpace / 2), y: height - margin.top, },
    { x: ((width - (margin.left + margin.right)) / 2) - (midSpace / 2), y: height - margin.top, },
  ];

  const mid = svg.append('g');

  mid
    .append('polygon')
    .data([ poly, ])
    .attr('stroke', theme.color('neutral', '-10'))
    .attr('fill', theme.color('neutral', '-10'))
    .attr('points', points => points.map(point => [ point.x, point.y, ].join(',')).join(' '));

  mid
    .append('line')
    .attr('stroke', theme.color('neutral', '-4'))
    .attr('stroke-width', 1)
    .attr('x1', (width - (margin.left + margin.right)) / 2)
    .attr('y1', margin.bottom)
    .attr('x2', (width - (margin.left + margin.right)) / 2)
    .attr('y2', height - margin.top);

  /* Select the Y axis group reference */
  const yAxisRef = svg.append('g')
    .attr('transform', `translate(${width}, 0)`)
    .attr('fill', theme.color('neutral', '-3'))
    .attr('style', 'font-size: 14px; font-weight: 700; line-height: 21px')
    .call(d3.axisRight().scale(yScale).tickSize(0));

  /* Remove the default vertical axis. */
  yAxisRef.select('.domain').remove();

  return d3n;
};
