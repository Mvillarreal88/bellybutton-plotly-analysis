d3.json("samples.json").then(data => {
    
  var names = data.names;
  
  var dropdownMenu = d3.select("#selDataset");
  
  names.forEach(item => {
      var tag = dropdownMenu.append("option");
      tag.text(item);
      tag.attr("id", item);
      })

});

d3.selectAll("#selDataset").on("change", pullData);



function pullData() {
  var dropdownMenu = d3.select("#selDataset");
  var dataset = dropdownMenu.property("value");

  d3.json("data/samples.json").then(data => {

      // Demographio table
      var pulledMetaData = data.metadata.filter(data => {return data.id == dataset})
      
      var demoInfo = d3.select("#sample-metadata");
      demographicInfo.html("");

      console.log(pulledMetaData)
      Object.entries(pulledMetaData[0]).forEach(function([key, value]) {
      demoInfo.append("p").text(`${key}: ${value}`);
      })})};

