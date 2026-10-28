// scatterplot.js (Exercise 6.3)
// Draws a scatterplot: each dot is one TV, coloured by screen type.
//   x = star rating, y = energy consumption (kWh a year)

const drawScatterplot = data => {

  // 1. Create the svg and the inner chart --------------------------------
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");        // border only to see the edges

  // No "const" here: innerChartS was already declared (with let) in shared-constants.js.
  // Writing const would make a new variable that interactions.js cannot see.
  innerChartS = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // 2. Set up the scales --------------------------------------------------
  // The largest values in the data decide where each axis ends
  const maxStar = d3.max(data, d => d.star);
  const maxEnergy = d3.max(data, d => d.energyConsumption);

  // The scales are created in shared-constants.js, here we only set domain and range
  xScaleS
    .domain([0, maxStar])                         // star rating: 0 to the highest
    .range([0, innerWidth]);                      // pixels, left to right

  yScaleS
    .domain([0, maxEnergy])                       // energy: 0 to the highest
    .range([innerHeight, 0]);                     // reversed, because svg y goes downwards

  // 3. Draw the dots ------------------------------------------------------
  // One circle for each TV. colorScale (shared-constants.js) turns the
  // screen type ("LCD", "LED", "OLED") into a colour
  innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => xScaleS(d.star))                   // centre, left to right = star rating
      .attr("cy", d => yScaleS(d.energyConsumption))      // centre, up and down = energy
      .attr("r", 3)                                       // small dots, there are over 4000
      .attr("fill", d => colorScale(d.screenTech))        // colour by screen type
      .attr("opacity", 0.5);                              // see-through, so overlaps look darker

  // 4. Draw the axes ------------------------------------------------------
  // x axis: moved down to the bottom of the inner chart
  innerChartS
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScaleS));

  // y axis: the default position is the left edge
  innerChartS
    .append("g")
      .call(d3.axisLeft(yScaleS));

  // 5. Axis labels --------------------------------------------------------
  // x label: centred under the x axis (text-anchor "middle" centres the text on x)
  innerChartS
    .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Star rating");

  // y label: top left, above the y axis
  innerChartS
    .append("text")
      .attr("x", -margin.left + 10)
      .attr("y", -20)
      .style("font-size", "14px")
      .text("Energy consumption (kWh a year)");

  // 6. Legend -------------------------------------------------------------
  // One group that holds the whole legend, moved to the top right
  const legend = innerChartS
    .append("g")
      .attr("transform", `translate(${innerWidth - 100}, 0)`);

  // One group for each screen type, 20px apart (i = 0, 1, 2)
  const legendItems = legend
    .selectAll("g")
    .data(colorScale.domain())                    // ["LCD", "LED", "OLED"]
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  // Coloured box
  legendItems
    .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => colorScale(d));

  // Label next to the box
  legendItems
    .append("text")
      .attr("x", 18)
      .attr("y", 10)                              // y of text is the baseline, so move it down
      .style("font-size", "13px")
      .text(d => d);
};
