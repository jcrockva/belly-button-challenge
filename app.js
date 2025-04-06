
//function to populate the metadata
function demoInfo(sample)
{
    //console.log(sample);

    // use d3.json to get data
    d3.json("samples.json").then((data) => {
        //grab all of the metadata
        let metaData = data.metadata;
        console.log(metaData);

        //filter based on value
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        //access index 0 from array
        let resultData = result[0];
        //console.log(resultData);

        //clear the metadata
        d3.select("#sample-metadata").html("");

        //object.entry to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
              .append("h5")
              .text(`${key}: ${value}`);
        });
    });
}

//function that builds the bar chart
function buildBarChart(sample)
{
    //console.log(sample);
    //let data = d3.json("samples.json");
   //console.log(data);

    d3.json("samples.json").then((data) => {
        //grab all of the sample data
        let sampleData = data.samples;
       

        //filter based on value
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
    

        //access index 0 from array
        let resultData = result[0];
        

        //get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
      

        //build the bar chart
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xvalues = sample_values.slice(0,10);
        let textlabels = otu_labels.slice(0,10);

        let barChart = {
            y: yticks.reverse(),
            x: xvalues.reverse(),
            text: textlabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
    });
}

//function that builds the bubble chart
function buildBubbleChart(sample)
{
     //console.log(sample);
    //let data = d3.json("samples.json");
   //console.log(data);

   d3.json("samples.json").then((data) => {
    //grab all of the sample data
    let sampleData = data.samples;
   

    //filter based on value
    let result = sampleData.filter(sampleResult => sampleResult.id == sample);


    //access index 0 from array
    let resultData = result[0];
    

    //get the otu_ids
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
  

    //build the bubble chart

    let bubbleChart = {
        y: sample_values,
        x: otu_ids,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    }

    let layout = {
        title: "Bacteria Cultures per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", [bubbleChart], layout);
});
}

//funtion to initialize dashboard
function initialize()   
{
  
    let data = d3.json("samples.json")

    //access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    // use d3.json to get data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;    //array of names
        console.log(sampleNames);

        //foreach to create options for each sample in selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample)
        });

        //when initialized, pass in the first sample
        let sample1 = sampleNames[0];

        //call function to build metadata
        demoInfo(sample1);
        //call function to build bar chart
        buildBarChart(sample1);
        //call function to build the bubble chart
        buildBubbleChart(sample1);
    });
}

//function to update the dashboard
function optionChanged(item)
{
    //call update to the metadata
    demoInfo(item);
    //call function to build bar chart
    buildBarChart(item);
    //call function to build the bubble chart
    buildBubbleChart(item);
}

//call the initialize function
initialize();
