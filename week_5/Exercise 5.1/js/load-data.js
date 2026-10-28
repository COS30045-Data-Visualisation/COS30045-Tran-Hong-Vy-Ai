// load-data.js (Exercise 5.1)
// Reads the CSV file, then hands the data to the chart-drawing function.

d3.csv("data/tvScreenTypeEnergy.csv", d => {
  // Row conversion: runs once for every row of the CSV file
  return {
    screenType: d.screenType,   // text: lcd, lcd led, oled
    energy: +d.energy           // the + turns the text into a number
  };
}).then(data => {
  // This part runs only AFTER the whole file has been read.

  // Sort from highest to lowest energy, so the tallest bar comes first
  data.sort((a, b) => b.energy - a.energy);

  // Draw the chart (drawBarChart is defined in bar-chart.js)
  drawBarChart(data);
});