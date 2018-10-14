import D3Node from 'd3-node';

const d3 = require('d3');

export default (data, {
  width = 574,
  height = 308,
  margin = { top: 34, right: 10, bottom: 15, left: 50, },
}) => {
  const styles = `
    .bar rect {
      fill: steelblue;
    }
    .bar text {
      fill: #fff;
      font: 10px sans-serif;
    }
  `;

  const options = {
    svgStyles: styles,
    d3Module: d3,
  };

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
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
  });

  svg.append('g')
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('stroke', 'green')
    .attr('stroke-width', 1)
    .attr('x1', d => xScale(d.time))
    .attr('y1', d => yScale(d.value))
    .attr('x2', (d, i) => (data[i + 1] ? xScale(data[i + 1].time) : xScale(d.time)))
    .attr('y2', (d, i) => (data[i + 1] ? yScale(data[i + 1].value) : yScale(d.value)));


  const xAxisRef = svg.append('g')
    .attr('transform', `translate(0, ${margin.top})`)
    .call(d3.axisTop().scale(xScale).tickFormat(d3.timeFormat('%H:%M')));

  xAxisRef.selectAll('.tick line, .domain')
    .remove();

  xAxisRef.selectAll('.tick text')
    .attr('stroke', 'red');

  const yAxisRef = svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft().scale(yScale));

  yAxisRef.select('.domain')
    .remove();

  yAxisRef.selectAll('.tick text')
    .attr('stroke', 'red');

  return d3n;
};
