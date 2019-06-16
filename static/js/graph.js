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
    showStationSelector(ndx)
    showCrimesByMonth(ndx);
    showCrimesByType(ndx);
    showCrimesByStation(ndx);
    showNorthVsSouth(ndx);
    showTheftDistribution(ndx);
    showCrimeTimeStation(ndx);
    dc.renderAll();


};

//station selector
function showStationSelector(ndx) {

    var stationDimension = ndx.dimension(dc.pluck("Location"));
    var stationGroup = stationDimension.group();
    dc.selectMenu("#station_selector")
        .dimension(stationDimension)
        .group(stationGroup)
        .promptText('Select Station');
}


//to hide and display catagory explanation table


function showHideInfoTable() {
  var catTable = document.getElementById("table").style;
  if (catTable.display === 'none' || catTable.display === ''){
      catTable.display = 'block';
  } else{
     catTable.display = 'none' 
  }
  
}

//crimes by type line chart
function showCrimesByMonth(ndx) {

    var dateDimension = ndx.dimension(dc.pluck("Month"));
    var dateGroup = dateDimension.group();

    var maxDate = dateDimension.top(1)[0].Month;
    var minDate = dateDimension.bottom(1)[0].Month;

    var lineChart = dc.lineChart("#total-crime-by-month")
        .height(200)
        .width(990)
        .useViewBoxResizing(true)
        .dimension(dateDimension)
        .group(dateGroup)
        .renderHorizontalGridLines(true)
        .x(d3.time.scale().domain([minDate, maxDate]));
    lineChart.yAxis().ticks(5)

};

//crime by type row chart
function showCrimesByType(ndx) {

    var typeDimension = ndx.dimension(dc.pluck("Crime"));
    var typeGroup = typeDimension.group();

    var rowChart = dc.rowChart("#total-crime-by-type")
        .height(350)
        .width(500)
        .useViewBoxResizing(true)
        .ordinalColors(d3.scale.category20().range())
        .dimension(typeDimension)
        .group(typeGroup);

};

//crime by station row chart
function showCrimesByStation(ndx) {

    var stationDimension = ndx.dimension(dc.pluck("Location"));
    var stationGroup = stationDimension.group();

    var rowChart = dc.rowChart("#total-crime-by-station")
        .height(350)
        .width(500)
        .useViewBoxResizing(true)
        .ordinalColors(d3.scale.category20().range())
        .dimension(stationDimension)
        .group(stationGroup);
        
};


//Stations in the North Vs South Pie chart
function showNorthVsSouth(ndx) {

    var northSouthDimension = ndx.dimension(function(d) {
        switch (true) {
            case (d.Location == " Kings Cross "):
            case (d.Location == " London Victoria "):
            case (d.Location == " Euston "):
            case (d.Location == " Liverpool Street "):
            case (d.Location == " Paddington "):
            case (d.Location == " Charing Cross "):
            case (d.Location == " Marylebone "):
            case (d.Location == " Blackfriars "):
            case (d.Location == " Moorgate "):
            case (d.Location == " Cannon Street "):

                return "North";

            case (d.Location == " London Bridge "):
            case (d.Location == "Waterloo"):
                return "South";

        }
    });


    var northSouthGroup = northSouthDimension.group();

    dc.pieChart("#show_north_vs_south")
        .height(180)
        .width(180)
        .dimension(northSouthDimension)
        .group(northSouthGroup)
        .label(function(d) {
            return d.key + ': ' + d.value;
        });
}

//Theft, Robbery and Burglary stacked bar chart

function showTheftDistribution(ndx) {


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
        .width(1100)
        .height(500)
        .useViewBoxResizing(true)
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
        .legend(dc.legend().x(50).y(0).itemHeight(13).gap(5).horizontal(true).autoItemWidth(true).itemWidth(60))
        .xAxisLabel("Station")
        .yAxisLabel("Incidents")
        .ordinalColors(d3.scale.category20().range())
        .renderHorizontalGridLines(true);

    stackedChart.margins().right = 100;

};

//crime by station across the year composite chart
function showCrimeTimeStation(ndx) {
    var date_dim = ndx.dimension(dc.pluck('Month'));
    var minDate = date_dim.bottom(1)[0].Month;
    var maxDate = date_dim.top(1)[0].Month;

    function spend_by_name(Location) {
        return function(d) {
            if (d.Location === Location) {
                return +d.Counter;
            }
            else {
                return 0;
            }
        }
    }
    var victoriaCrimesByMonth = date_dim.group().reduceSum(spend_by_name(' London Victoria '));
    var waterlooCrimesByMonth = date_dim.group().reduceSum(spend_by_name('Waterloo'));
    var eustonCrimesByMonth = date_dim.group().reduceSum(spend_by_name(' Euston '));
    var liverpoolStreetCrimesByMonth = date_dim.group().reduceSum(spend_by_name(' Liverpool Street '));
    var londonBridgeCrimesByMonth = date_dim.group().reduceSum(spend_by_name(' London Bridge '));

    var compositeChart = dc.compositeChart('#crime-time-station');
     compositeChart
         .width(990)
         .height(300)
         .useViewBoxResizing(true)
         .dimension(date_dim)
         .x(d3.time.scale().domain([minDate, maxDate]))
         .legend(dc.legend().x(50).y(0).itemHeight(13).gap(5).horizontal(true).autoItemWidth(true).itemWidth(60))
         .yAxisLabel("Incidents")
         .renderHorizontalGridLines(true)
         .compose([
             dc.lineChart(compositeChart)
             .colors('#0099CC')
             .group(victoriaCrimesByMonth, ' London Victoria '),
             dc.lineChart(compositeChart)
             .colors('#66CCCC')
             .group(waterlooCrimesByMonth, 'Waterloo'),
             dc.lineChart(compositeChart)
             .colors('#000000')
             .group(eustonCrimesByMonth, ' Euston '),
             dc.lineChart(compositeChart)
             .colors('#CC3333')
             .group(liverpoolStreetCrimesByMonth, ' Liverpool Street '),
             dc.lineChart(compositeChart)
             .colors('#868F98')
             .group(londonBridgeCrimesByMonth, ' London Bridge ')
         ])
         .brushOn(false)
         
         
         
         


}
