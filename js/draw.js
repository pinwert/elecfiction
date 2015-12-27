
var html = "<table class='table table-condensed table-bordered'>"+
  "<thead><tr><th>#</th>"+
  "<th>Unica</th><th>Comunidad</th><th>Provincia</th>"+
  "</tr></thead><tbody>";
html = html+"<tr><th>Sin</th>";
html = html+pintar(FormularioHondt(estatales));
html = html+pintar(agrupar(comunidades));
html = html+pintar(agrupar(provincias));
html = html+"</tr>";

var conv = [
  ['CONV-IZ',['UP-IU','PODEMOS','EN COMÚ','PODEMOS-COMPROMÍS','PODEMOS-En Marea-ANOVA-EU'],0]
];

html = html+"<tr><th>De Izquierdas</th>";
html = html+pintar(FormularioHondt(conver(estatales)));
html = html+pintar(agrupar(conver_comu(comunidades)));
html = html+pintar(agrupar(conver_comu(provincias)));
html = html+"</tr>";

conv = [
  ['CONV-DE',['PP','CIUDADANOS'],0]
];

html = html+"<tr><th>De Derechas</th>";
html = html+pintar(FormularioHondt(conver(estatales)));
html = html+pintar(agrupar(conver_comu(comunidades)));
html = html+pintar(agrupar(conver_comu(provincias)));
html = html+"</tr>";

conv = [
  ['CONV-IZ',['UP-IU','PODEMOS','EN COMÚ','PODEMOS-COMPROMÍS','PODEMOS-En Marea-ANOVA-EU'],0],
  ['CONV-DE',['PP','CIUDADANOS'],0]
];

html = html+"<tr><th>Ambas</th>";
html = html+pintar(FormularioHondt(conver(estatales)));
html = html+pintar(agrupar(conver_comu(comunidades)));
html = html+pintar(agrupar(conver_comu(provincias)));
html = html+"</tr>";


html = html+"</tbody></table>";

function pintar(datos){
  var html = "<td></div><div class='sub-tab' data-datos='"+JSON.stringify(datos.cal.filter(function(a){return !!a.esc;}))+"'><table class='table'><tr><th><p class='text-left nombre'>Partido</p></th><th><p class='text-right votos'>Escaños</p></th></tr>";
  html = html+datos.cal.map(function(a){return a.esc ? "<tr><td><p class='text-left nombre'>"+a.nombre+"</p></td><td><p class='text-right votos'>"+a.esc+"</p></td></tr>" : "";}).join("\n");
  html = html+"</table></div></td>";
  return html;
}

$(document).ready(function(){
  $('#datos').append(html);
  
  $('.sub-tab').click(function(e){
    pintar_nv($(e.currentTarget).data('datos'));
  });
});