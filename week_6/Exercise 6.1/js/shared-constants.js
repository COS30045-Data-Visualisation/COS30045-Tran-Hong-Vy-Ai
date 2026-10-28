// shared-constants.js (Exercise 6.1)
// Values that more than one file needs. Loaded before histogram.js,
// so the chart code can use these names directly.
// (D3 must be loaded first, because d3.bin and d3.scaleLinear are used here.)

// 1. Chart size ---------------------------------------------------------
// Size of the whole svg and the margins around the chart
const width = 800;
const height = 500;
const margin = { top: 50, right: 30, bottom: 50, left: 70 };   // left is wider: room for the y axis numbers

// Size of the inner chart area (what is left after the margins)
const innerWidth = width - margin.left - margin.right;         // 800 - 70 - 30 = 700
const innerHeight = height - margin.top - margin.bottom;       // 500 - 50 - 50 = 400

// 2. Bin generator ------------------------------------------------------
// Groups the TVs into energy consumption ranges (bins).
// It is built here (not inside drawHistogram) so other files can reuse it later.
// .value() tells D3 which column to use for sorting TVs into bins.
const energyBinGenerator = d3.bin()
  .value(d => d.energyConsumption);

// 3. Scales -------------------------------------------------------------
// Only created here. The domain and range are set inside drawHistogram,
// once the data is available.
const xScale = d3.scaleLinear();    // x: energy consumption
const yScale = d3.scaleLinear();    // y: number of TVs in a bin


