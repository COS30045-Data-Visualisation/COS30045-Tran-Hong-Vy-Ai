// Step 2: change styles with D3

// Change the heading colour, font and alignment
d3.select("#d3-exercise-section h1")
  .style("color", "green")
  .style("font-family", "Arial")
  .style("text-align", "center");

// Change the intro paragraph colour to grey
d3.select("#d3-exercise-section .d3-intro")
  .style("color", "gray");

// Step 3: append a paragraph with D3

// Add a new paragraph inside the container with a welcome message
d3.select("#d3-exercise-section .d3-content-box")
  .append("p")
  .text("Welcome to the Appliance Energy Monitor!");

// Step 4: append an svg and a rectangle with D3

// Create an SVG drawing area inside the visualisation container
d3.select("#viz-container")
  .append("svg")
  .attr("width", 250)                  // Set the SVG width
  .attr("height", 150)                 // Set the SVG height
  .append("rect")                      // Add a rectangle to the SVG
  .attr("x", 50)                       // Position the rectangle from the left
  .attr("y", 25)                       // Position the rectangle from the top
  .attr("width", 100)                  // Set the rectangle width
  .attr("height", 30)                  // Set the rectangle height
  .style("fill", "steelblue");         // Set the rectangle colour