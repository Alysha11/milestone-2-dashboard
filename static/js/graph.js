queue()
    .defer(d3.csv, "data/2018-btp.csv")
    .await(makeGraphs);
    
    function (makeGraphs)