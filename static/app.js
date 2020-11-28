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

    // retrieve the washing frequency for gauge chart
    let washFreq = metadata[0]["wfreq"]
    console.log(washFreq)

    // CREATING OUTPUTS FOR DISPLAY

    // create metadata display -------------
    displayData = metadata[0]
    console.log(displayData)

    indvData = Object.entries(displayData).map(([key, value]) => `<p>${key}: ${value}</p>`).join("");
    console.log(indvData)

    // display metadata
    document.getElementById("sample-metadata").innerHTML = indvData 

    // create bar chart -----------------
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
        height: 500,
        margin: {
            l: 75,
            r: 50,
            b: 50,
            pad: 2
        },
        title: "Top 10 OTUs (Operational Taxonomic Units)"
    };

    // create bubble chart ------------------

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

    // create gauge chart ----------------
    let gaugeData = [{
        type: "pie",
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        value: washFreq,
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: ["rgb(241, 239, 238)", "rgb(220, 225, 216)", "rgb(199, 212, 195)", "rgb(178, 198, 174)", "rgb(157, 185, 153)", "rgb(136, 171, 131)", "rgb(115, 158, 110)", "rgb(94, 144, 89)", "rgb(74, 131, 68)"]
        }
        
    }]


    // plot charts -----------------------
    Plotly.newPlot("bar", barData, barLayout);
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    Plotly.newPlot("gauge", gaugeData)

    });
};

// initialize dashboard with default selection
function init() {
    d3.json("../samples.json").then( data => {
    
        // create array of options
        let options = data.names;
        
        // select one option
        let defaultData = options[0];
        console.log(defaultData)

        // call main plot function
        dataByID(defaultData)
    });
}

// call function to display default data when page opens
init()

// call dataByID() when user makes a different selection
d3.selectAll("#selDataset").on("change", dataByID);
