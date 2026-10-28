// load-data.js (Exercise 6.1)
// Reads the CSV file once, then hands the data to the chart-drawing function.

d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  // Row conversion: runs once for every row of the CSV file.
  // We choose which columns to keep, and turn number columns from text into numbers.
  return {
    brand: d.brand,                              // text, stays as it is
    model: d.model,                              // text
    screenSize: +d.screenSize,                   // the + turns text into a number
    screenTech: d.screenTech,                    // text: LCD, LED or OLED
    star: +d.star,                               // number
    energyConsumption: +d.energyConsumption      // number (kWh a year)
  };
}).then(data => {
  // This part runs only AFTER the whole file has been read.
  // "data" is now an array with one object per TV.
  console.log(data);                             // check the data in the console (F12)

  // Draw the histogram (drawHistogram is defined in histogram.js)
  drawHistogram(data)});