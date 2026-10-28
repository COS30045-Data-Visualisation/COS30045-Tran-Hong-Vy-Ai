// interactions.js (Exercise 6.2)
// Draws the filter buttons. Clicking a button filters the data
// and moves the histogram bars to their new heights.

const populateFilters = data => {

  // 1. Function that updates the histogram for one filter -----------------
  // filterId is "all", "LCD", "LED" or "OLED"
  const updateHistogram = filterId => {

    // Step 1: filter the data ("all" means keep every TV)
    const updatedData = filterId === "all"
      ? data                                           // keep all TVs
      : data.filter(d => d.screenTech === filterId);   // keep only one screen type

    // Step 2: make new bins from the TVs that are left
    // (energyBinGenerator is in shared-constants.js, with fixed ranges,
    //  so we always get the same 14 bins, only the counts change)
    const updatedBins = energyBinGenerator(updatedData);

    // Step 3: move the existing bars to their new heights
    d3.select("#histogram svg")
      .selectAll("rect")                               // the 14 bars (the axes are not rects)
      .data(updatedBins)                               // give each bar its new bin
      .join("rect")
      .transition()                                    // animate instead of jumping
      .duration(600)                                   // 600 milliseconds
      .ease(d3.easeCubicOut)                           // fast at first, slows down at the end
        .attr("y", d => yScale(d.length))              // new top of the bar
        .attr("height", d => innerHeight - yScale(d.length));   // new height
        // x and width stay the same because the bins are fixed
  };

  // 2. Draw one button for each item in filters_screen ----------------------
  // filters_screen is in shared-constants.js: { id, label, isActive }
  d3.select("#filters_screen")
    .selectAll("button")
    .data(filters_screen)
    .join("button")
      .text(d => d.label)                              // text on the button
      .classed("active", d => d.isActive)              // "active" class = dark button (CSS)

      // 3. What happens when a button is clicked ----------------------------
      .on("click", (event, d) => {                     // d = info of the clicked button

        // Only the clicked button stays active, the others are switched off
        filters_screen.forEach(f => f.isActive = (f.id === d.id));

        // Update the colour of all 4 buttons from the new isActive values
        d3.selectAll("#filters_screen button")
          .classed("active", f => f.isActive);         // each button still holds its own data

        // Filter the data and redraw the bars
        updateHistogram(d.id);
      });
};