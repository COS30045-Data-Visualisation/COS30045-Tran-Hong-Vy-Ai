// Exercise 4.3

// Create an SVG drawing area inside the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")       // Set the SVG coordinate system
  .style("border", "1px solid black");    // Add a border to see the SVG edges


// Exercise 4.5

// Draw a horizontal bar chart using the TV brand data
const drawBarChart = data => {
    const BarHeight = 30;                 // Set the height of each bar
    const BarSpace = 5;                   // Set the gap between the bars
    
    svg
    .selectAll("rect")
    .data(data)
    .join("rect")                         // Create one rectangle for each data item
      .attr("class", d => `bar-${d.count}`)
      .attr("x", 0)                       // Start each bar at the left edge
      .attr("y", (d, i) => i * (BarHeight + BarSpace)) // Position each bar vertically
      .attr("width", d => d.count)        // Set the bar width based on the TV count
      .attr("height", BarHeight)          // Set the height of each bar
      .attr("fill", "steelblue");         // Set the bar colour
};


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

