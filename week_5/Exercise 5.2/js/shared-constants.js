// shared-constants.js (Exercise 5.1 and 5.2)
// Values that more than one file needs. Loaded before bar-chart.js,
// so the chart code can use these names directly.

// Size of the whole svg and the margins around the chart
const width = 800;
const height = 500;
const margin = { top: 50, right: 30, bottom: 50, left: 70 };   // left is wider: room for the y axis numbers

// Size of the inner chart area (what is left after the margins)
const innerWidth = width - margin.left - margin.right;         // 800 - 70 - 30 = 700
const innerHeight = height - margin.top - margin.bottom;       // 500 - 50 - 50 = 400