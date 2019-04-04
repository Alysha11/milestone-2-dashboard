// Promise to load data, once comple makeGraphs is executed. 
queue()
    .defer(d3.csv, "data/2018-btp.csv")
    .await(makeGraphs);

//function to render graphs
function makeGraphs(error, data) {
    


    //convert string dates to js dates in data
    data.forEach(function(d) {

        var tempDate = new Date(d.Month);
        d.Month = tempDate;

    });


    var ndx = crossfilter(data);
    show_station_selector(ndx)
    show_crimes_by_month(ndx);
    show_crimes_by_type(ndx);
    show_crimes_by_station(ndx);
    show_north_vs_south(ndx);

    dc.renderAll();


};

function show_station_selector(ndx) {

        var stationDimension = ndx.dimension(dc.pluck("Location"));
        var stationGroup = stationDimension.group();
        dc.selectMenu("#station_selector")
                .dimension(stationDimension)
                .group(stationGroup)
                .promptText('Select Station');

}


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


function show_crimes_by_type(ndx) {

    var typeDimension = ndx.dimension(dc.pluck("Crime"));
    var typeGroup = typeDimension.group();

    var rowChart = dc.rowChart("#total-crime-by-type")
        .height(500)
        .width(1360)
        .dimension(typeDimension)
        .group(typeGroup);


};

function show_crimes_by_station(ndx) {

    var stationDimension = ndx.dimension(dc.pluck("Location"));
    var stationGroup = stationDimension.group();


    var rowChart = dc.rowChart("#total-crime-by-station")
        .height(500)
        .width(1360)
        .dimension(stationDimension)
        .group(stationGroup);


};



function show_north_vs_south(ndx) {
    var northSouthDimension = ndx.dimension(function(d) {
        if (d.Location === "Waterloo" || "London Bridge") {
            return "South";
       } else  {
            return "North";
            
       }
    });
    
    
    var northSouthGroup = northSouthDimension.group();

    
    
    dc.pieChart("#show_north_vs_south")
    .height(300)
    .width(90)
    .dimension(northSouthDimension)
    .group(northSouthGroup);
    


};
