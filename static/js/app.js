function Init() {
  var dropdownMenu = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
      
    var names = data.names;
    names.forEach(item => {
        var tag = dropdownMenu.append("option");
        tag.text(item);
        tag.attr("value", item);
        })

    demoTable(names[0])
    charts(names[0])
  });
}




function demoTable(item) {
  //Read the JSON data
  d3.json("samples.json").then((sampleData) => {
    console.log(sampleData);

    // Demographics table
    var MetaData = sampleData.metadata;
    var dataid = MetaData.filter(data => data.id == item);
    var htmldata = d3.select("#sample-metadata").html("");

    console.log("Metadata:")
    console.log(MetaData)

    Object.entries(dataid[0]).forEach(([key, value]) => {
        htmldata.append("p").text(`${key}: ${value}`);
     });   
  });
}


//Creating the function to hold the charts
function charts(item) {

  d3.json("data/data.json").then((sampleData) => {

    var filtereddata = sampleData.samples;
    console.log("filetered data:")
    console.log(filtereddata)

    // filter the data for charting
    var dictSample = filtereddata.filter(data => data.id == item)[0];
    console.log(dictSample)

    var valuessample = dictSample.sample_values;

    //Creating the values to be used in the chart
    var chartvalues = valuessample.slice(0,10).reverse();

    console.log(chartvalues)

    //Getting Chart labels
    sampleid = dictSample.otu_ids;
    chartlabels = sampleid.slice(0,10).reverse();
    
    console.log(chartlabels)

    //Format the labels on the chart label
    formOTU = [];
    chartlabels.forEach((value) => {

    formOTU.push(`OTU ${value}`);
    });

    console.log(formOTU)

    //add hovertext to items
    var hovertext = chartvalues.otu_labels;
    var hoverbar  = hovertext.slice(0,10).reverse();
    
    var tracebar = {
      type: "bar",
      y: formOTU,
      x: chartvalues,
      text: hoverbar,
      orientation: 'h'
  };
    //add variable for barchart to sit in
    chartData = [tracebar];

    Plotly.newPlot("bar", chartData);


  });
}



//Define the change option
function optionChanged(itemOption)  {
  //Update table with changed id
  demoTable(itemOption);

  //Update charts with changed id
  charts(itemOption);
}

Init();
