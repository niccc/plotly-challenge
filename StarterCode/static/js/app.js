var allData;
var names;
var meta;
var samples;
var menu;
var user_option = "NULL";

d3.json("samples.json").then(data =>{
    allData = data;
    names = allData.names;
    meta = allData.metadata;
    samples = allData.samples;
    menu = d3.select("#selDataset");
})

sample_values = samples[0].sample_values.slice(0,10).reverse();
otu_ids = samples[0].otu_ids.slice(0,10).reverse();
otu_labels = samples[0].otu_labels.slice(0,10).reverse();

 function createCharts(){
   
    //bar chart
    var trace = {
        x:sample_values,
        y:otu_ids,
        text: otu_labels.map(String),
        type: "bar",
        orientation: "h"

    }
    data = [trace];

    var layout ={
        title: "Top 10 OTUs",
        xaxis: {
            title: "Sample Value"
            
          },
        yaxis: {
            title: "OTU ID"
          },
        } 
    

    Plotly.newPlot("bar", data, layout);
     
    //bubble chart
    var trace1 = {
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        text: samples[0].otu_labels.map(String),
        mode: "markers",
        marker:{
            size: samples[0].sample_values,
            color: samples[0].otu_ids
        }
    
    }
    data1 = [trace1];
    var layout ={
        title: "OTU Bubble Chart",
        xaxis: {
            title: 'OTU IDs'
        }
    }
    
    Plotly.newPlot("bubble", data1, layout);

 } 
 
 createCharts();

//populate the dropdown menu
var menuHtml;
function makeMenu(name){
    menuHtml = menuHtml + "<option value=" + name + ">" + name + "</option>"
}
names.foreach(makeMenu);
document.getElementById("selDataset").innerHTML = menuHtml;

//respond to user input
function newGraphs(){

    d3.event.preventDefault();
    function checkInput(sample){
        if (sample.id == user_option){
            otu_ids = (sample.otu_ids.slice(0,10).reverse());
            otu_labels = sample.otu_labels.slice(0,10).reverse();
            sample_values = sample.sample_values.slice(0,10).reverse();
        }
    }
    samples.foreach(checkInput);
    createCharts();
}

//do stuff on user selection
function changeStuff(menu,user_option){

    menu.on("change", newGraphs());
    menu.on("click", newGraphs());

}
 