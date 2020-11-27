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

// create charts to display by chosen id from dropdown
function dataByID() {
    d3.json("../samples.json").then( data => {

    // get the value of the selection
    let id = d3.select("#selDataset").property("value");
    
    // filter samples data based on user selection
    let filteredId = data.samples.filter((d) => d.id === id);
    console.log(filteredId);

    // SETTING VARIABLES FOR OUTPUT
    
    // retreive just the sample_values ---------------------
    let sampleVs = filteredId.map(d => d.sample_values).sort();

    // get all samples for bubble chart
    let allSamples = sampleVs[0];

    // get the top 10 sample_values for bar chart
    let topSamples = allSamples.slice(0, 10).reverse();
    console.log(topSamples);

    // retrieve the otu_ids  -------------------------
    let ids = filteredId.map(d => d.otu_ids).sort();

    // get all otu_ids, convert to string, split, and add OTU to each otu_id
    let allIds = ids[0];

    // get the top 10 otu_ids for bar chart
    let topIds = allIds.slice(0, 10).reverse().toString().split(",").map((e) => `OTU ${e}`);
    console.log(topIds);

    // retrieve the otu_label for hovertext ---------------------
    let labels = filteredId.map(d => d.otu_labels).sort();

    // get all labels for bubble chart
    let allLabels = labels[0];

    // get the top 10 otu_labels for bar chart
    let topLabels = allLabels.slice(0, 10).reverse();
    console.log(topLabels);

    // filter metadata based on selection use == instead of triple because id is int here
    let metadata = data.metadata.filter((d) => d.id == id);
    console.log(metadata)

    // CREATING OUTPUTS FOR DISPLAY

    // create metadata display
    displayData = Object.entries(metadata[0])
    console.log(displayData)

    document.getElementById("sample-metadata").innerHTML = displayData;

    // create bar chart
    let barData = [{
        type: "bar",
        x: topSamples,
        y: topIds,
        orientation: "h",
        text: topLabels
    }];

    let barLayout = {
        autosize: false, 
        width: 400,
        height: 600,
        margin: {
            l: 75,
            r: 50,
            b: 50,
            pad: 2
        },
        title: "Top 10 OTUs (Operational Taxonomic Units)"
    };

    // create bubble chart

    let bubbleData = [{
        x: allIds,
        y: allSamples,
        mode: "markers",
        text: allLabels,
        marker: {
            size: allSamples,
            color: allIds
        }
    }];

    let bubbleLayout = {
        title: "Bubble Chart of all OTU Samples",
        height: 500,
        width: 1200
    };

    // plot charts
    Plotly.newPlot("bar", barData, barLayout);
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)

    });
};

// call dataByID() when user makes a different selection
d3.selectAll("#selDataset").on("change", dataByID);
