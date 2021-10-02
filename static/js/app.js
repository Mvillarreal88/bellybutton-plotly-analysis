d3.js  on("samples.json").then((data)) => {



}


names = samples.map(function (row){
    return row.names
  });

// Trace for the Greek Data
let trace1 = {
    x: samples.map(row => row.greekName),
    y: data.map(row => row.greekSearchResults),
    type: "bar",
    orientation: "h"
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
  title: "Greek gods search results"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);
