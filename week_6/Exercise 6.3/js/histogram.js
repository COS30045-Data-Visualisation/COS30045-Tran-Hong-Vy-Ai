// histogram.js (Exercise 6.1)
// Draws a histogram: how many TVs fall into each energy consumption range.

const drawHistogram = data => {

  // 1. Create the svg and the inner chart --------------------------------
  // width, height, margin, innerWidth, innerHeight come from shared-constants.js
  const svg = d3.select("#histogram")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");        // border only to see the edges

  // Group that holds the chart, moved in by the margins to leave room for axes
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // 2. Make the bins ------------------------------------------------------
  // energyBinGenerator lives in shared-constants.js.
  // It splits the TVs into ranges (0-200 kWh, 200-400 kWh, ...).
  // "bins" is an array: each bin holds the TVs in that range
  const bins = energyBinGenerator(data);

  // 3. Work out the limits for the scales -------------------------------
  // x0 = start of a bin, x1 = end of a bin
  const minEnergy = bins[0].x0;                   // start of the first bin
  const maxEnergy = bins[bins.length - 1].x1;     // end of the last bin

  // The tallest bar = the bin with the most TVs
  const maxFrequency = d3.max(bins, d => d.length);

  // 4. Set up the scales --------------------------------------------------
  // The scales are created in shared-constants.js, here we only set domain and range
  xScale
    .domain([minEnergy, maxEnergy])               // energy: lowest to highest
    .range([0, innerWidth]);                      // pixels, left to right

  yScale
    .domain([0, maxFrequency])                    // number of TVs: 0 to the tallest bar
    .range([innerHeight, 0]);                     // reversed, because svg y goes downwards

  // 5. Draw the axes ------------------------------------------------------
  // x axis: moved down to the bottom of the inner chart
  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

  // y axis: the default position is the left edge
  innerChart.append("g")
    .call(d3.axisLeft(yScale));

  // 6. Draw the bars ------------------------------------------------------
  // One rect for each bin
  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0))                           // left edge = start of the bin
      .attr("y", d => yScale(d.length))                       // top of the bar
      .attr("width", d => xScale(d.x1) - xScale(d.x0))        // bar width = bin width in pixels
      .attr("height", d => innerHeight - yScale(d.length))    // bottom of the chart minus the top
      .attr("fill", "steelblue")
      .attr("stroke", "white");                               // white edge makes a gap between bars

  // Checks: the values should be 0, 2800 and 1387
  console.log("Min energy:", minEnergy);
  console.log("Max energy:", maxEnergy);
  console.log("Max frequency:", maxFrequency);
  console.log(bins);
};