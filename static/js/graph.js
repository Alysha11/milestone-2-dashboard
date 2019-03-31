queue()
    .defer(d3.csv, "data/2018-btp.csv")
    .await(makeGraphs);


function makeGraphs(error, data) {

    data.forEach(function(d) {

        var tempDate = new Date(d.Month);
        d.Month = tempDate;

    })


    var ndx = crossfilter(data);
    show_crimes_by_month(ndx);
    show_crimes_by_type(ndx);

    dc.renderAll();


};

function show_crimes_by_type(ndx) {

    var typeDimension = ndx.dimension(dc.pluck("Crime type"));
    var typeGroup = typeDimension.group();

    var rowChart = dc.rowChart("#total-crime-by-type")
        .height(500)
        .width(1360)
        .dimension(typeDimension)
        .group(typeGroup);


};

function show_crimes_by_month(ndx) {

    var dateDimension = ndx.dimension(dc.pluck("Month"));
    var dateGroup = dateDimension.group();


    var maxDate = dateDimension.top(1)[0].Month;
    var minDate = dateDimension.bottom(1)[0].Month;

    var lineChart = dc.lineChart("#total-crime-by-month")
        .height(400)
        .width(1360)
        .dimension(dateDimension)
        .group(dateGroup)
        .renderHorizontalGridLines(true)
        .x(d3.time.scale().domain([minDate, maxDate]));
    lineChart.yAxis().ticks(5)






};
