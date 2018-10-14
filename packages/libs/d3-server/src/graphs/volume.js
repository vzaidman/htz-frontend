import D3Node from 'd3-node';
import * as d3 from 'd3';
import { tmTheme as theme, } from '@haaretz/tm-theme';

const numToString = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

export default (data, {
  width = 574,
  height = 104,
  margin = { top: 0, right: 161, bottom: 0, left: 0, },
}) => {
  const options = {
    d3Module: d3,
  };

  const d3n = new D3Node(options);

  const [ minValue, maxValue, ] = d3.extent(data, d => d.value);
  const avgPercentage = (minValue / maxValue) * 100;

  /* Extract graph's start & end points from the data */
  const yScale = d3.scaleBand()
    .range([ height - margin.bottom, margin.top, ])
    .domain(data.map(d => d.name).reverse()).padding(0.5);

  const xScale = d3.scaleLinear()
    .range([ margin.right, width - margin.left, ])
    .domain([ 0, maxValue, ]);

  const svg = d3n.createSVG(null, null, {
    direction: 'rtl',
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
    style: 'padding-left: 14px; padding-right: 14px;',
  });

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', theme.color('neutral', '-10'));

  const bars = svg
    .selectAll()
    .data(data);

  const barElements = bars.enter().append('g').attr('class', (d, i) => `bar${i}`);
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
    .attr('y', d => yScale(d.name) + (yScale.bandwidth() / 2))
    .attr('dx', d => (d.value === minValue && avgPercentage < 20 ? '-10' : '10'))
    .attr('dy', '.36em')
    .attr('text-anchor', d => (d.value === minValue && avgPercentage < 20 ? 'start' : 'end'))
    .attr('fill', d => theme.color('neutral', d.value === minValue && avgPercentage < 20 ? '-2' : '-10'))
    .text(d => numToString(d.value));

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
