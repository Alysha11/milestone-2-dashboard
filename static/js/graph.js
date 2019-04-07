// Load data, once comple makeGraphs is executed. 
queue()
    .defer(d3.json, "data/2018-btp.json")
    .await(makeGraphs);

//function to render graphs
function makeGraphs(error, data) {



    //Convert string dates to js dates in data
    data.forEach(function(d) {

        var tempDate = new Date(d.Month);
        d.Month = tempDate;

    });


    //Convert string to interger in data

    data.forEach(function(d) {
        d.Counter = parseInt(d.Counter);

    });

    var ndx = crossfilter(data);
    show_station_selector(ndx)
    show_crimes_by_month(ndx);
    show_crimes_by_type(ndx);
    show_crimes_by_station(ndx);
    show_north_vs_south(ndx);
    //show_stacked_chart(ndx)
    show_theft_distribution(ndx)
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
        .height(200)
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
        .height(350)
        .width(500)
        .dimension(typeDimension)
        .group(typeGroup);


};

function show_crimes_by_station(ndx) {

    var stationDimension = ndx.dimension(dc.pluck("Location"));
    var stationGroup = stationDimension.group();


    var rowChart = dc.rowChart("#total-crime-by-station")
        .height(500)
        .width(1360)
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb']) //play around with
        .dimension(stationDimension)
        .group(stationGroup);


};

function show_north_vs_south(ndx) {

    var northSouthDimension = ndx.dimension(function(d) {
        if (d.Location === "Waterloo" || d.Location === "London Bridge")
            return "South";
        else
            return "North"

    });

    var northSouthGroup = northSouthDimension.group();

    dc.pieChart("#show_north_vs_south")
        .height(180)
        .width(180)
        .dimension(northSouthDimension)
        .group(northSouthGroup);

};


function show_theft_distribution(ndx) {


    function crimeTypeByStation(dimension, crime) {
        return dimension.group().reduce(
            function(p, v) {
                p.total++;
                if (v.Crime == crime) {
                    p.match++;
                }
                return p;
            },

            function(p, v) {
                p.total--;
                if (v.Crime == crime) {
                    p.match--;
                }
                return p;
            },
            function() {
                return { total: 0, match: 0 };
            }
        );

    }

    var locationDimension = ndx.dimension(dc.pluck("Location"));

    var bicycleTheftByStation = crimeTypeByStation(locationDimension, "Bicycle theft");
    var otherTheftByStation = crimeTypeByStation(locationDimension, "Other theft");
    var personTheftByStation = crimeTypeByStation(locationDimension, "Theft from the person");
    var shopliftingByStation = crimeTypeByStation(locationDimension, "Shoplifting");
    var burglaryByStation = crimeTypeByStation(locationDimension, "Burglary");
    var robberyByStation = crimeTypeByStation(locationDimension, "Robbery");


    var stackedChart = dc.barChart("#stacked")
        .width(1350)
        .height(500)
        .dimension(locationDimension)
        .group(bicycleTheftByStation, "Bicycle theft")
        .stack(otherTheftByStation, "Other theft")
        .stack(personTheftByStation, " Theft from the person")
        .stack(shopliftingByStation, " Shoplifting")
        .stack(burglaryByStation, "Burglary")
        .stack(robberyByStation, "Robbery")
        .valueAccessor(function(d) { // ensures counts more than zero are added while those less than zero are not added
            if (d.value.total > 0) {
                return d.value.match;
            }
            else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(50).y(0).itemHeight(20).gap(20).horizontal(true).autoItemWidth(true).itemWidth(60))
        .xAxisLabel("Station") 
        .yAxisLabel("Total Incidents"); 

    stackedChart.margins().right = 100;




}



