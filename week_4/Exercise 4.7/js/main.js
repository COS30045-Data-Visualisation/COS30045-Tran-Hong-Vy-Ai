// Exercise 4.3

// Create an SVG drawing area inside the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 600")          // Set the SVG coordinate system
  .style("border", "1px solid black");     // Add a border to see the SVG edges


// Exercise 4.5 + 4.6

// Draw a horizontal bar chart with brand names and counts
const drawBarChart = data => {

  // x scale: convert TV counts into pixel widths
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 300]);                      // Set the width available for the bars

  // y scale: assign each brand its own position on the canvas
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))        // Use the brand names as categories
    .range([0, 600])                       // Set the vertical range of the chart
    .padding(0.2);                         // Leave a gap between the bars

  // Create a group for each brand to keep its bar and labels together
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Draw a bar for each brand
  barAndLabel
    .append("rect")
      .attr("class", d => `bar-${d.count}`)
      .attr("x", 100)                      // Leave space on the left for brand names
      .attr("y", 0)                        // Use the group's vertical position
      .attr("width", d => xScale(d.count)) // Set the bar width based on the count
      .attr("height", yScale.bandwidth())  // Set the bar height based on the band size
      .attr("fill", "steelblue");           // Set the bar colour

  // Add the brand name to the left of each bar
  barAndLabel
    .append("text")
      .text(d => d.brand)
      .attr("x", 90)                       // Position the label before the bar
      .attr("y", 10)
      .attr("text-anchor", "end")          // Align the text to the right
      .style("font-size", "13px");

  // Add the count to the right of each bar
  barAndLabel
    .append("text")
      .text(d => d.count)
      .attr("x", d => 100 + xScale(d.count) + 5) // Position the count after the bar
      .attr("y", 10)                        // Align with the brand name
      .style("font-size", "13px");
};


// Exercise 4.4

// Load the CSV file from the data folder
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,                        // Keep the brand name as text
    count: +d.count                        // Convert the count from text to a number
  };
}).then(data => {                          // Process the data after loading the CSV

  console.log(data);                       // Display the loaded data
  console.log(data.length);                // Check the number of brands
  console.log(typeof data[0].count);       // Check the data type of the count
  console.log(d3.max(data, d => d.count)); // Find the maximum count
  console.log(d3.min(data, d => d.count)); // Find the minimum count
  console.log(d3.extent(data, d => d.count)); // Find the minimum and maximum counts

  // Sort the brands by count in descending order
  data.sort((a, b) => b.count - a.count);
  console.log(data);                       // Check the sorted data

  drawBarChart(data);                      // Pass the data to the bar chart function
});