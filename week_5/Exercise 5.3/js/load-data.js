// load-data.js (Exercise 5.3)
// Three separate files are read here. Each one is drawn by its own chart function.

// 1. Bar chart data: average energy use for each screen type (55-inch TVs) ----
d3.csv("data/tvScreenTypeEnergy.csv", d => {
  // Row conversion: runs once for every row of the CSV file
  return {
    screenType: d.screenType,   // text: lcd, lcd led, oled
    energy: +d.energy           // the + turns the text into a number
  };
}).then(data => {
  // Sort from highest to lowest energy, so the tallest bar comes first
  data.sort((a, b) => b.energy - a.energy);

  drawBarChart(data);           // bar-chart.js
});

// 2. Line chart data: electricity spot prices, one row for each year -------------
d3.csv("data/ARE_Spot_Prices.csv", d => {
  // The column names must match line 1 of the CSV exactly (capital Y, spaces, brackets)
  return {
    year: +d.Year,                                      // number, needed for a continuous x axis
    averagePrice: +d["Average Price (notTas-Snowy)"]    // [" "] is needed because the name has spaces
  };
}).then(data => {
  // No sort: the file is already in year order, and the line joins the points in that order
  drawLineChart(data);          // line-chart.js
});

// 3. Donut chart data: number of TV models in each screen size group -------------
d3.csv("data/tvSizeGroupCount.csv", d => {
  return {
    sizeGroup: d.sizeGroup,     // text: Large, Medium, Small
    count: +d.count             // number of TV models
  };
}).then(data => {
  // No sort: d3.pie is set to keep the order of the file (Large, Medium, Small)
  drawDonutChart(data);         // donut-chart.js
});