//made sure app.js is linked to html
alert("Linked up!");

// use D3 to read in samples dataset
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
    }
    
});

// create horizontal bar chart to display top 10 OTUs for each individual


// create bubble chart that displays each sample


// display sample metadata - individual's demographic information of key value pairs


