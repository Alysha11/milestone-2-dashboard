queue()
    .defer(d3.csv, "data/2018-btp.csv")
    .await(makeGraphs);


function makeGraphs(error, crimeData) {

    crimeData.forEach(function(d) {

    })

    var ndx = crossfilter(crimeData);

    show_crimes_by_type(ndx);
    dc.renderAll();


};

function show_crimes_by_type(ndx) {


    var typeDimension = ndx.dimension(dc.pluck("Crime type"));
    var typeGroup = typeDimension.group();

    var rowChart = dc.rowChart("#total-crime-by-type")
        .height(500)
        .width(1300)
        .dimension(typeDimension)
        .group(typeGroup);







}
