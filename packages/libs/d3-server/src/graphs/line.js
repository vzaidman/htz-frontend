import D3Node from 'd3-node';
import * as d3 from 'd3';
import { tmTheme as theme, } from '@haaretz/tm-theme';

export default (data, time, {
  width = 320,
  height = 303,
  margin = { top: 34, right: 10, bottom: 15, left: 50, },
}) => {
  const options = {
    d3Module: d3,
  };

  const xAxisTickFormats = new Map([
    [ 'daily', [ '%H:%M', d3.timeHour.every, 1, ], ],
    [ 'weekly', [ '%a', d3.timeDay.every, 1, ], ],
    [ 'monthly', [ '%d/%m', d3.timeDay.every, 2, ], ],
    [ 'yearly', [ '%B', d3.timeMonth.every, 2, ], ],
    [ 'tripleYear', [ '%b %y', d3.timeMonth.every, 3, ], ],
    [ 'max', [ '%Y', d3.timeYear.every, 1, ], ],
  ]);

  const d3n = new D3Node(options);

  /* Extract graph's start & end points from the data */
  const xExtent = d3.extent(data, stock => stock.time);
  const [ yMin, yMax, ] = d3.extent(data, stock => stock.value);

  const yScale = d3.scaleLinear()
    .range([ height - margin.bottom, margin.top, ])
    .domain([ yMin - 2, yMax + 2, ]);
  const xScale = d3.scaleTime()
    .range([ margin.left, width - margin.right, ])
    .domain(xExtent);

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
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('stroke', theme.color('sales'))
    .attr('stroke-width', 1)
    .attr('x1', d => xScale(d.time))
    .attr('y1', d => yScale(d.value))
    .attr('x2', (d, i) => (data[i + 1] ? xScale(data[i + 1].time) : xScale(d.time)))
    .attr('y2', (d, i) => (data[i + 1] ? yScale(data[i + 1].value) : yScale(d.value)));

  const [ timeFormat, timeFunction, every, ] = xAxisTickFormats.get(time);

  const xAxisRef = svg.append('g')
    .attr('transform', `translate(0, ${margin.top})`)
    .call(
      d3.axisTop()
        .scale(xScale)
        .tickFormat(d3.timeFormat(timeFormat))
        .ticks(timeFunction(every))
    );

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
