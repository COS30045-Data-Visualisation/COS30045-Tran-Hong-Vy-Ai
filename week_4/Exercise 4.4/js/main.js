// Exercise 4.3

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


// Exercise 4.4

// Load the CSV file and convert each row into an object
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,                   // Keep the TV brand name as a string
        count: +d.count                   // Convert the TV count from a string to a number
    };
}).then(data => {                         // Run this code after the CSV file has loaded

    console.log(data);                    // Display the loaded data in the Console
    console.log(data.length);             // Check the number of rows
    console.log(typeof data[0].count);    // Check the data type of the first count
    console.log(d3.max(data, d => d.count));   // Find the maximum TV count
    console.log(d3.min(data, d => d.count));   // Find the minimum TV count
    console.log(d3.extent(data, d => d.count)); // Find the minimum and maximum counts

    // Sort the brands by TV count in descending order
    data.sort((a, b) => b.count - a.count);
    console.log(data);                    // Check the sorted data

    drawBarChart(data);                   // Pass the data to the bar chart function
});

// Define the function for drawing the bar chart
function drawBarChart(data) {
    // Will be built in Exercise 4.5
}