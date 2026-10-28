// bar-chart.js (Exercise 5.1)
// Vertical bar chart: average energy use (kWh a year) for each screen type.
// width, height, margin, innerWidth and innerHeight come from shared-constants.js.

const drawBarChart = data => {

  // Create the svg inside the div with id "bar-chart"
  const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)      // size of the drawing area
      .style("border", "1px solid black");            // border only to see the edges

  // Group that holds the chart, moved in by the margins to leave room for axes and labels
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // x scale: one slot for each screen type (categories, so scaleBand)
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.screenType))              // e.g. ["LCD", "LED", "OLED"]
    .range([0, innerWidth])
    .padding(0.2);                                    // gap between the bars

  // y scale: energy (kWh) to pixels
  // The highest value is about 370, so 400 leaves a little space above the bars
  const yScale = d3.scaleLinear()
    .domain([0, 400])
    .range([innerHeight, 0]);                         // reversed: svg y goes downwards

  // Axes: D3 builds them from the scales
  const bottomAxis = d3.axisBottom(xScale);
  const leftAxis = d3.axisLeft(yScale);

  // x axis: moved down to the bottom of the inner chart
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  // y axis: the default position is the left edge, so no translate
  innerChart
    .append("g")
      .call(leftAxis);

  // Bars: one rect for each screen type
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.screenType))                    // left edge of the slot
      .attr("y", d => yScale(d.energy))                        // top of the bar
      .attr("width", xScale.bandwidth())                       // slot width minus the gap
      .attr("height", d => innerHeight - yScale(d.energy))     // bottom minus top
      .attr("fill", "steelblue");

  // Y axis label, in the top left corner
  innerChart
    .append("text")
      .attr("x", -margin.left + 10)                   // negative: inside the left margin
      .attr("y", -20)                                 // above the chart
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .text("Average energy use (kWh a year)");

  // Value above each bar, e.g. "370 kWh"
  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.screenType) + xScale.bandwidth() / 2)   // middle of the bar
      .attr("y", d => yScale(d.energy) - 8)                            // 8 pixels above the bar
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text(d => Math.round(d.energy) + " kWh");
};