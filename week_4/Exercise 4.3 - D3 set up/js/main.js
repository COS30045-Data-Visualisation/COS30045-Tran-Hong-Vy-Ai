// Create an SVG drawing area inside the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")       // Set the SVG coordinate system
  .style("border", "1px solid black");    // Add a border to see the SVG edges

// Draw a blue rectangle inside the SVG
svg.append("rect")
  .attr("x", 10)                          // Position from the left
  .attr("y", 10)                          // Position from the top
  .attr("width", 414)                     // Set the rectangle width
  .attr("height", 16)                     // Set the rectangle height
  .attr("fill", "blue");                  // Set the rectangle colour