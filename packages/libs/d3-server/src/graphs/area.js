import D3Node, { d3, } from 'd3-node';
import { tmTheme as theme, } from '@haaretz/tm-theme';
import { rgba, } from 'polished';

export default (data, timeSpan, {
  width = 680,
  height = 630,
  margin = { top: 0, right: 40, bottom: 40, left: 60, },
}) => {
  const options = {
    d3Module: d3,
  };

  const xAxisTickFormats = new Map([
    [ 'year', [ '%b', d3.timeMonth.every, 2, ], ],
    [ 'fiveYears', [ '%Y', d3.timeYear.every, 1, ], ],
    [ 'tenYears', [ '%Y', d3.timeYear.every, 2, ], ],
    [ 'fifteenYears', [ '%Y', d3.timeYear.every, 3, ], ],
    [ 'twentyYears', [ '%Y', d3.timeYear.every, 4, ], ],
  ]);

  const d3n = new D3Node(options);

  const getTranslation = transform => /translate\((\d*\.?\d*),/.exec(transform)[1];

  const xExtent = d3.extent(data, stock => stock.time);
  const y1Extent = d3.extent(data, stock => stock.value);
  const y2Extent = d3.extent(data, stock => stock.peRatio);

  const xScale = d3.scaleTime()
    .range([ margin.left, width - margin.right, ])
    .domain(xExtent);
  const y1Scale = d3.scaleLinear()
    .range([ height - margin.bottom, margin.top, ])
    .domain([ y1Extent[0] - 30, y1Extent[1] + 10, ]);
  const y2Scale = d3.scaleLinear()
    .range([ height - margin.bottom, margin.top, ])
    .domain([ 0, y2Extent[1] + 10, ]);

  const svg = d3n.createSVG(null, null, {
    direction: 'ltr',
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
  });

  const [ timeFormat, timeFunction, every, ] = xAxisTickFormats.get(timeSpan);

  const xAxis = svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(
      d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat(timeFormat))
        .ticks(timeFunction(every))
    );

  const xTicks = [];

  xAxis.selectAll('.tick').each(function () {
    xTicks.push(getTranslation(d3.select(this).attr('transform')));
  });

  if (xTicks[0] > margin.left) xTicks.unshift(margin.left);

  const bg = svg.selectAll('rect')
    .data(xTicks)
    .enter()
    .append('g');

  bg.append('rect')
    .attr('x', d => d)
    .attr('width', (d, i) => (i < xTicks.length - 1
      ? xTicks[i + 1] - d
      : (width - margin.right) - d)
    )
    .attr('height', height - margin.bottom)
    .attr('fill', (d, i) => (i % 2 > 0
      ? theme.color('neutral', '-10')
      : rgba(theme.color('neutral', '-4'), 0.05)
    ));

  bg.append('line')
    .attr('x1', d => d)
    .attr('x2', d => d)
    .attr('y1', 0)
    .attr('y2', height - margin.bottom)
    .attr('stroke', (d, i) => (i > 0 ? rgba(theme.color('neutral', '-4'), 0.15) : 'none'));

  const valueArea = d3.area()
    .x(d => xScale(d.time))
    .y0(height - margin.bottom)
    .y1(d => y1Scale(d.value));

  const peRatioArea = d3.area()
    .x(d => xScale(d.time))
    .y0(height - margin.bottom)
    .y1(d => y2Scale(d.peRatio));

  const valueLine = d3.line()
    .x(d => xScale(d.time))
    .y(d => y1Scale(d.value));

  const peRatioLine = d3.line()
    .x(d => xScale(d.time))
    .y(d => y2Scale(d.peRatio));

  svg.append('path')
    .data([ data, ])
    .attr('d', valueArea)
    .attr('fill', '#F2680A')
    .attr('opacity', 0.2);

  svg.append('path')
    .attr('d', valueLine(data))
    .attr('stroke', '#F2680A')
    .attr('stroke-width', 3)
    .attr('fill', 'none')
    .attr('opacity', 0.4);

  svg.append('path')
    .data([ data, ])
    .attr('d', peRatioArea)
    .attr('fill', '#2E3191')
    .attr('opacity', 0.2);

  svg.append('path')
    .attr('d', peRatioLine(data))
    .attr('stroke', '#2E3191')
    .attr('stroke-width', 3)
    .attr('fill', 'none')
    .attr('opacity', 0.5);

  const y1Axis = svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y1Scale));

  const y2Axis = svg.append('g')
    .attr('transform', `translate(${width - margin.right}, 0)`)
    .call(d3.axisRight(y2Scale));

  xAxis.select('path').remove();
  y1Axis.select('path').remove();
  y2Axis.select('path').remove();

  xAxis.selectAll('.tick line').attr('stroke', '#b2b2b2');
  y1Axis.selectAll('.tick line').attr('stroke', '#b2b2b2');
  y2Axis.selectAll('.tick line').attr('stroke', '#b2b2b2');

  const poly = [
    { x: margin.left, y: 0, },
    { x: margin.left, y: height - margin.bottom, },
    { x: width - margin.right, y: height - margin.bottom, },
    { x: width - margin.right, y: 0, },
  ];

  svg.append('polygon')
    .data([ poly, ])
    .attr('stroke', '#b2b2b2')
    .attr('stroke-width', 0.5)
    .attr('fill', 'none')
    .attr('points', points => points.map(point => [ point.x, point.y, ].join(',')).join(' '));

  svg.selectAll('text')
    .attr('fill', '#5a5a5a')
    .attr('stroke', '#5a5a5a')
    .attr('stroke-width', 0.5)
    .attr('font-size', '17px')
    .attr('style', 'font-family: "Open Sans Hebrew","Helvetica Neue",Helvetica,Arial,sans-serif; overflow: visible;');

  return d3n;
};
