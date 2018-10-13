import D3Node from 'd3-node';

const d3 = require('d3');

export default (data, {
  width = 574,
  height = 308,
  margin = { top: 34, right: 10, bottom: 15, left: 50, },
}) => {
  console.log(data);
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
  const yScale = d3.scaleLinear()
    .range([ height - margin.bottom, margin.top, ])
    .domain([ d3.min(data, d => d.y) - 5, d3.max(data, d => d.y) + 5, ]);

  const xScale = d3.scaleLinear()
    .range([ margin.left, width - margin.right, ])
    .domain([ 0, d3.max(data, d => d.x), ]);

  const svg = d3n.createSVG({
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
  });

  svg.append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .style('mix-blend-mode', 'hard-light')
    .attr('fill', d => (d.y > 0
      ? 'green'
      : 'red'
    ))
    .attr('r', 5)
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y));


  svg.append('g')
    .append('line')
    .attr('x1', xScale(xScale.domain()[0]))
    .attr('x2', xScale(xScale.domain()[1]) + margin.right)
    .attr('stroke-width', 1)
    .attr('stroke', 'red')
    .attr('y1', yScale(0))
    .attr('y2', yScale(0));

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
