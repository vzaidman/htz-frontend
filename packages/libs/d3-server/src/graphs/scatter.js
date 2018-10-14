import D3Node from 'd3-node';
import * as d3 from 'd3';
import { rgba, } from 'polished';
import { tmTheme as theme, } from '@haaretz/tm-theme';

export default (data, {
  width = 574,
  height = 308,
  margin = { top: 34, right: 10, bottom: 15, left: 50, },
}) => {
  const options = {
    d3Module: d3,
  };

  const d3n = new D3Node(options);

  /* Extract graph's start & end points from the data */
  const yScale = d3.scaleLinear()
    .range([ height - margin.bottom, margin.top, ])
    .domain([ d3.min(data, d => d.y) - 5, d3.max(data, d => d.y) + 5, ]);

  const xScale = d3.scaleLinear()
    .range([ margin.left, width - margin.right, ])
    .domain([ 2, d3.max(data, d => d.x) - 2, ]);

  const svg = d3n.createSVG(null, null, {
    direction: 'ltr',
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
  });

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', theme.color('neutral', '-1'));

  svg.append('g')
    .attr('transform', 'translate(0, 0.5)')
    .append('line')
    .attr('x1', xScale(xScale.domain()[0]))
    .attr('x2', xScale(xScale.domain()[1]) + margin.right)
    .attr('stroke-width', 1)
    .attr('stroke', theme.color('negative'))
    .attr('y1', yScale(0))
    .attr('y2', yScale(0));

  svg.append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('style', 'mix-blend-mode: hard-light;')
    .attr('fill', d => (d.y > 0
      ? rgba(theme.color('positive', '-2'), 0.8)
      : rgba(theme.color('negative', '-2'), 0.8)
    ))
    .attr('r', 5)
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y));

  const xAxisRef = svg.append('g')
    .attr('transform', `translate(0, ${margin.top})`)
    .call(d3.axisTop().scale(xScale));

  const yAxisRef = svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft().scale(yScale));

  xAxisRef.selectAll('.tick line').remove();
  xAxisRef.select('.domain').remove();

  yAxisRef.select('.domain').remove();

  /* Select all vertical axis ticks. */
  yAxisRef.selectAll('.tick line')
    .attr('stroke', '#777')
    .attr('stroke-width', 0.5)
    .attr('x1', 0)
    .attr('x2', width - margin.left)
    .attr('opacity', 1);

  svg.selectAll('text')
    .attr('stroke', theme.color('neutral', '-3'))
    .attr('style', `font-size: 11px; font-family: ${theme.fontStacks.default}; line-height: 18px;`);

  return d3n;
};
