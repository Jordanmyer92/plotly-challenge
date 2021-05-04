var subjectName;
var bioSample;
var bioMeta;
var bioData;
var parasample;

const path = "static/js/samples.json";

d3.json(path).then((data) => {
    bioData = data
    subjectName = bioData.names;
    bioSample = bioData.samples;
    bioMeta = bioData.metadata;
    dropDownList(subjectName)
    bioPlot('940');
});
function bioPlot(id) {
    var otu_ids = bioData.samples.filter((key) => { return key.id === id })[0].otu_ids
    var top10 = otu_ids.slice(0, 10)
    var sample_values = bioData.samples.filter((key) => { return key.id === id })[0].sample_values
    var top10Sample = sample_values.slice(0, 10)
    var otu_labels = bioData.samples.filter((key) => { return key.id === id })[0].otu_labels
    var top10labels = otu_labels.slice(0, 10)
    
    //Create Bar Chart 
    var filtering = bioMeta.filter(bioData => bioData.id === parseInt(id))
    console.log(filtering)
    var result = filtering[0];
    console.log(result)
    var sample_meta = d3.select("#sample-metadata");
    sample_meta.html("");
    Object.entries(result).forEach(([key, value]) => {
        sample_meta.append("h6").text(`${key}:${value}`);
    });

    var trace1 = {
        x: top10Sample,
        orientation: 'h',
        type: "bar",
    };

    // Data for bar plot
    var data1 = [trace1];
    var layout = {
        title: "Top 10 OTUs Found In That Individual",
        xaxis: { title: top10Sample },
        
    };
    Plotly.newPlot("bar", data1, layout);

    //Create bubble Chart 
    var trace2 = {
        title: "OTU Sample",
        x: top10,
        y: top10Sample,
        text: top10labels,
        mode: 'markers',
        marker: {
            size: top10Sample,
            color: top10
        }
    };
    // Data for bubble chart
    var data2 = [trace2];
    var layout2 = {
        xaxis: { title: 'Otu-ids' },
        heigth: 600,
        width: 900
    };
    Plotly.newPlot("bubble", data2, layout2);

};

function dropDownList(subjectName) {
    var sel = document.getElementById("selDataset");
    subjectName.forEach(otu => {
        var currentOption = document.createElement('option');
        currentOption.text = otu;
        sel.appendChild(currentOption);
    });
};
function optionChanged(id) {
    bioPlot(id);
};

