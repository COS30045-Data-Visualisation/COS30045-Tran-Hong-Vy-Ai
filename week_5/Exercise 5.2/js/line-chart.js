// line-chart.js (Exercise 5.2)
// Line chart with points and a shaded area: average electricity spot price for each year.
// width, height, margin, innerWidth and innerHeight come from shared-constants.js.

const drawLineChart = data => {

  // Create the svg inside the div with id "line-chart"
  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");            // border only to see the edges

  // Group that holds the chart, moved in by the margins
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scales: both are scaleLinear because year and price are continuous numbers
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))             // [earliest year, latest year]
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])   // starts at 0, ends at the highest price
    .range([innerHeight, 0]);                         // reversed: svg y goes downwards

  // Axes
  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)                    // down to the bottom
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));              // "d" shows 2000, not 2,000

  innerChart.append("g")
    .call(d3.axisLeft(yScale));

  // Shaded area under the line. Drawn first, so the line and dots stay on top of it.
  // y1 = the line (the price), y0 = the bottom of the chart
  const areaGenerator = d3.area()
    .x(d => xScale(d.year))
    .y0(innerHeight)
    .y1(d => yScale(d.averagePrice));

  innerChart
    .append("path")
      .datum(data)                                    // one path gets the whole array
      .attr("d", areaGenerator)
      .attr("fill", "#CFEBFF")
      .attr("fill-opacity", 0.27);                    // light and see-through

  // Dots: one circle for each year
  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("r", 4)
      .attr("fill", "steelblue");

  // Line: the generator turns the 27 points into one path, joined in the order of the data
  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  innerChart
    .append("path")
      .datum(data)
      .attr("d", lineGenerator)
      .attr("fill", "none")                           // without this the path is filled in black
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

  // Y axis label, in the top left corner
  innerChart
    .append("text")
      .attr("x", -margin.left + 10)
      .attr("y", -20)
      .style("font-size", "14px")
      .text("Average spot price ($ per megawatt hour)");
};