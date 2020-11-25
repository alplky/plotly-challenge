//made sure app.js is linked to html
alert("Linked up!");

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
    console.log(data);

    let id = d3.select("#selDataset").property("value");

    let filteredId = data.filter((d) => d.samples[0]["otu_ids"] === id);
    console.log(filteredId);
    
    });
};

// call dataByID() when user makes a different selection
d3.selectAll("#selDataset").on("change", dataByID);


// create bubble chart that displays each sample


// display sample metadata - individual's demographic information of key value pairs