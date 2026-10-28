// shared-constants.js (Exercise 6.2)
// Values that more than one file needs. Loaded before the chart files,
// so histogram.js and interactions.js can use these names directly.
// (D3 must be loaded first, because d3.bin and d3.scaleLinear are used here.)

// 1. Chart size ---------------------------------------------------------
// Size of the whole svg and the margins around the chart
const width = 800;
const height = 500;
const margin = { top: 50, right: 30, bottom: 50, left: 70 };   // left is wider: room for the y axis numbers

// Size of the inner chart area (what is left after the margins)
const innerWidth = width - margin.left - margin.right;         // 700
const innerHeight = height - margin.top - margin.bottom;       // 400

// 2. Bin generator ------------------------------------------------------
// Groups the TVs into energy consumption ranges (bins).
// It is used twice: by histogram.js (all TVs) and by interactions.js (filtered TVs).
// The bins are FIXED, so a filtered chart always has the same 14 bins as the full chart.
const energyBinGenerator = d3.bin()
  .value(d => d.energyConsumption)            // which column decides the bin
  .domain([0, 2800])                          // bins always cover 0 to 2800 kWh
  .thresholds(d3.range(200, 2800, 200));      // cut points: 200, 400, ... 2600 (14 bins)

// 3. Scales -------------------------------------------------------------
// Only created here. The domain and range are set inside drawHistogram.
const xScale = d3.scaleLinear();              // x: energy consumption
const yScale = d3.scaleLinear();              // y: number of TVs in a bin

// 4. Filter buttons -----------------------------------------------------
// One item for each button:
//   id       = name used in the code (must match the screenTech text in the data)
//   label    = text shown on the button
//   isActive = is the button switched on? (only "All" at the start)
const filters_screen = [
  { id: "all",  label: "All",  isActive: true },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

