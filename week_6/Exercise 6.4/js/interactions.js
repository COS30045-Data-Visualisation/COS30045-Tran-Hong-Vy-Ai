// interactions.js (Exercises 6.2, 6.3 and 6.4)
// Everything the user can click or hover on:
//   populateFilters   - filter buttons for the histogram (6.2)
//   createTooltip     - builds the hidden tooltip box on the scatterplot (6.4)
//   handleMouseEvents - shows and hides the tooltip when the mouse moves over a dot (6.4)

// ---------------------------------------------------------------------------
// Filter buttons (Exercise 6.2)
// Clicking a button filters the data and moves the histogram bars.
// ---------------------------------------------------------------------------
const populateFilters = data => {

  // Update the histogram for one filter (filterId is "all", "LCD", "LED" or "OLED")
  const updateHistogram = filterId => {

    // Step 1: filter the data ("all" means keep every TV)
    const updatedData = filterId === "all"
      ? data                                           // keep all TVs
      : data.filter(d => d.screenTech === filterId);   // keep only one screen type

    // Step 2: make new bins from the TVs that are left
    // (the bins are fixed in shared-constants.js, so we always get the same 14 bins)
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
  };

  // Draw one button for each item in filters_screen (shared-constants.js)
  d3.select("#filters_screen")
    .selectAll("button")
    .data(filters_screen)
    .join("button")
      .text(d => d.label)                              // text on the button
      .classed("active", d => d.isActive)              // "active" class = dark button (CSS)

      // When a button is clicked (d = info of the clicked button)
      .on("click", (event, d) => {

        // Only the clicked button stays active, the others are switched off
        filters_screen.forEach(f => f.isActive = (f.id === d.id));

        // Update the colour of all 4 buttons from the new isActive values
        d3.selectAll("#filters_screen button")
          .classed("active", f => f.isActive);

        // Filter the data and redraw the bars
        updateHistogram(d.id);
      });
};

// ---------------------------------------------------------------------------
// Tooltip (Exercise 6.4)
// Step 1: build the tooltip box once, hidden. handleMouseEvents shows it later.
// ---------------------------------------------------------------------------
const createTooltip = () => {

  // Group that holds the whole tooltip, hidden at the start.
  // It is added after the dots, so it is drawn on top of them.
  const tooltip = innerChartS
    .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0)                  // invisible until the mouse enters a dot
      .style("pointer-events", "none");     // the box must never catch the mouse itself

  // Background box (size from shared-constants.js)
  tooltip
    .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 6)                        // rounded corners
      .attr("fill", "steelblue")
      .attr("opacity", 0.85);               // slightly see-through

  // Text inside the box, centred
  tooltip
    .append("text")
      .attr("x", tooltipWidth / 2)
      .attr("y", tooltipHeight / 2 + 5)     // y of text is the baseline, so move it down a bit
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "14px")
      .text("");                            // filled in when the mouse enters a dot
};

// ---------------------------------------------------------------------------
// Step 2: show the tooltip when the mouse is over a dot, hide it when it leaves.
// Must be called after drawScatterplot, because the dots have to exist first.
// ---------------------------------------------------------------------------
const handleMouseEvents = () => {

  innerChartS
    .selectAll("circle")                    // all the dots of the scatterplot

    // Mouse goes onto a dot (e = the event, d = the data of that dot)
    .on("mouseenter", (e, d) => {

      // Put the screen size of this TV into the tooltip text
      innerChartS.select(".tooltip text")
        .text(`${d.screenSize} inches`);

      // Where is the dot? Read its centre from the circle itself (e.target)
      const cx = +e.target.getAttribute("cx");   // the + turns text into a number
      const cy = +e.target.getAttribute("cy");

      // Move the tooltip just above the dot (centred on it), then fade it in
      innerChartS.select(".tooltip")
        .attr("transform", `translate(${cx - tooltipWidth / 2}, ${cy - tooltipHeight - 10})`)
        .transition()
        .duration(200)
          .style("opacity", 1);
    })

    // Mouse leaves the dot: fade the tooltip out and park it far away
    .on("mouseleave", () => {
      innerChartS.select(".tooltip")
        .transition()
        .duration(200)
          .style("opacity", 0)
        .attr("transform", "translate(-500, -500)");
    });
};