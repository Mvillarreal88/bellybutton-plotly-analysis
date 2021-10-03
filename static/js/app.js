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

Init();

// d3.selectAll("#selDataset").on("change", demoTable(demographics);


function demoTable(item) {
  //Read the JSON data
  d3.json("samples.json").then((sampleData) => {
    console.log(sampleData);

    // Demographics table
    var MetaData = sampleData.metadata;
    var dataid = MetaData.filter(data => data.id == item);
    var htmldata = d3.select("#sample-metadata").html("");

    Object.entries(dataid[0]).forEach(([key, value]) => {
        htmldata.append("p").text(`${key}: ${value}`);
     });   
  });
}

