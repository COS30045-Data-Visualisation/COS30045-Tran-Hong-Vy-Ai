// donut-chart.js (Exercise 5.3)
// Donut chart: share of TV models in each screen size group (Large, Medium, Small).
// width and height come from shared-constants.js.

const drawDonutChart = data => {

  // The donut is a circle, so its radius must fit the SHORTER side of the svg.
  // 500 / 2 = 250, minus 50 to leave some space around the edge
  const radius = Math.min(width, height) / 2 - 50;

  // Colour scale: one colour for each size group.
  // scaleOrdinal matches categories to colours in order (Large = blue, Medium = orange, Small = red)
  const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.sizeGroup))
    .range(["#4E79A7", "#F28E2B", "#E15759"]);

  // Pie generator: works out the start and end angle of each slice from the counts.
  // The angles are in radians (a full circle is about 6.28)
  const pieGenerator = d3.pie()
    .value(d => d.count)                // slice size depends on the count
    .sort(null);                        // keep the order of the file instead of sorting by size

  const pieData = pieGenerator(data);   // each item holds startAngle, endAngle and the original row in .data

  // Arc generator: turns one slice into the shape of a path.
  // The slice is the area between the inner and the outer circle
  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)          // the hole is 60% of the full radius
    .outerRadius(radius);               // set innerRadius to 0 to get a pie chart

  // Create the svg inside the div with id "donut-chart"
  const svg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");            // border only to see the edges

  // d3.arc draws around the point (0, 0), so move that point to the middle of the svg
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Slices: one path for each item of pieData
  innerChart
    .selectAll("path")
    .data(pieData)
    .join("path")
      .attr("d", arcGenerator)                              // the generator turns each slice into a path
      .attr("fill", d => colorScale(d.data.sizeGroup));     // d.data = the original row of the file

  // Labels: put the name of each group in the middle of its slice
  innerChart
    .selectAll("text")
    .data(pieData)
    .join("text")
      .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)   // centroid = centre of the slice
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "16px")
      .text(d => d.data.sizeGroup);
};