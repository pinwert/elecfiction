//Regular pie chart example
function pintar_nv(datos){
  $('#chart').html('<svg></svg>');
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.nombre; })
        .y(function(d) { return d.esc; })
        .showLabels(true);
  
      d3.select("#chart svg")
          .datum(datos)
          .transition().duration(350)
          .call(chart);
  
    return chart;
  });
}