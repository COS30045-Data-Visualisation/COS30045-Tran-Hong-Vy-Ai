// load-data.js (Exercise 6.2)
// Reads the CSV file once, then hands the data to every function that needs it.

d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  // Row conversion: runs once for every row of the CSV file.
  // We choose which columns to keep, and turn number columns from text into numbers.
  return {
    brand: d.brand,                              // text, stays as it is
    model: d.model,                              // text
    screenSize: +d.screenSize,                   // the + turns text into a number
    screenTech: d.screenTech,                    // text: LCD, LED or OLED (the filters use this)
    star: +d.star,                               // number
    energyConsumption: +d.energyConsumption      // number (kWh a year)
  };
}).then(data => {
  // This part runs only AFTER the whole file has been read.
  // "data" is now an array with one object per TV.
  console.log(data);                             // check the data in the console (F12)

  drawHistogram(data);                           // draw the histogram (histogram.js)
  populateFilters(data);                         // draw the filter buttons (interactions.js)
                                                 // after the histogram, so the bars already exist

}).catch(error => {
  // Runs if something goes wrong, and prints the error message
  console.error("Error loading the CSV file:", error);
});