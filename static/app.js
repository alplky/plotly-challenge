// use D3 to read in samples dataset and create drop down
d3.json("../samples.json").then( data => {
    console.log(data);

    // create the dropdown menu list
    let select = document.getElementById("selDataset")
    let dropDowns = data.names;
    console.log(dropDowns);

    for (let i = 0; i < dropDowns.length; i++) {
        let opt =  dropDowns[i];

        let el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        select.add(el);
    };
    
});

// create horizontal bar chart to display top 10 OTUs for each individual
function dataByID() {
    d3.json("../samples.json").then( data => {

    // get the value of the selection
    let id = d3.select("#selDataset").property("value");
    
    // filter data based on selection
    let filteredId = data.samples.filter((d) => d.id === id);
    console.log(filteredId);
    
    // filter to retreive just the sample_values ---------------------
    let sampleVs = filteredId.map(d => d.sample_values).sort();

    // get the top 10 sample_values
    let topSamples = sampleVs[0].slice(0, 10);
    console.log(topSamples);

    // filter to retrieve the otu_ids for label -------------------------
    let ids = filteredId.map(d => d.otu_ids).sort();

    // get the top 10 otu_ids
    let topIds = ids[0].slice(0, 10);
    console.log(topIds);

    // filter to retrieve the otu_label for hovertext ---------------------
    let labels = filteredId.map(d => d.otu_labels).sort();

    // get the top 10 otu_labels
    let topLabels = labels[0].slice(0, 10);
    console.log(topLabels);

    // plot bar chart
    let barData = [{
        type: "bar",
        x: topSamples,
        y: topIds,
        orientation: "h"
    }];

    Plotly.newPlot("bar", barData);

    });
};

// call dataByID() when user makes a different selection
d3.selectAll("#selDataset").on("change", dataByID);


// create bubble chart that displays each sample


// display sample metadata - individual's demographic information of key value pairs