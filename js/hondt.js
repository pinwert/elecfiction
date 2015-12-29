function setEscano(arr,esc){
  var imax=0, max=0;
  arr.forEach(function(a,i){
    var votos = a.votos/(a.esc+1);
    imax = max < votos ? i : imax;
    max = max < votos ? votos : max;
  });
  arr[imax].esc++;
  if(esc){
    return setEscano(arr,esc-1);
  }
  else{
    return arr;
  }
}

function FormularioHondt(datos)
{
  var liston=0;
  var num_min_votos=Math.ceil(datos.totalVotos*liston/100);
  datos.cal = setEscano(datos.items.filter(function(a){
    return a.votos>=num_min_votos;
  }).map(function(a){
    return{
      votos:a.votos,
      nombre: a.siglas,
      esc: 0
    };
  }), datos.totalEscanos-1).sort(function(a,b){return b.esc-a.esc;});
 return datos;
}

function agrupar(arr){
  var res = {};
  arr.forEach(function(a){
    FormularioHondt(a).cal.forEach(function(a){
      res[a.nombre] = res[a.nombre] ? res[a.nombre] + a.esc : a.esc;
    });
  });
  arr.cal = Object.keys(res).map(function(key){return {nombre:key,esc:res[key]};}).sort(function(a,b){return b.esc-a.esc;});
  return arr;
}

function agrupar_muni(arr){
  var res = {};
  arr.forEach(function(a){
    a.provincias.forEach(function(a){
      FormularioHondt(a.resultado).cal.forEach(function(a){
        res[a.nombre] = res[a.nombre] ? res[a.nombre] + a.esc : a.esc;
      });
    });
  });
  arr.cal = Object.keys(res).map(function(key){return {nombre:key,esc:res[key]};}).sort(function(a,b){return b.esc-a.esc;});
  return arr;
}

function isInConv(partido,con){
  var isIn = false;
  if(!!~con[1].indexOf(partido.siglas)){
    con[2] = Number.parseInt(con[2]) + Number.parseInt(partido.votos);
    isIn = true;
  }
  return isIn;
}

function conver(dat){
  var datos = JSON.parse(JSON.stringify(dat));
  conv.forEach(function(con){
    con = con.map(function(a){return a;});
    datos.items = datos.items.filter(function(a){
      return !isInConv(a,con);
    });
    datos.items.push({siglas:con[0],votos:con[2]});
  });
  datos.items.sort(function(a,b){return b.votos-a.votos;});
  return datos;
}

function conver_comu(dat){
  var datos = JSON.parse(JSON.stringify(dat));
  return datos.map(function(a,i){
    conv.forEach(function(con){
      con = con.map(function(a){return a;});
      a.items = a.items.filter(function(a){
        return !isInConv(a,con);
      });
      a.items.push({siglas:con[0],votos:con[2]});
    });
    a.items.sort(function(a,b){return b.votos-a.votos;});
    return a;
  });
}

function conver_prov(datos){
  return datos.map(function(a){
    a.provincias.map(function(a){
      conv.forEach(function(con){
        con = con.map(function(a){return a;});
        a.resultado.items = a.resultado.items.filter(function(a){
          return !isInConv(a,con);
        });
        a.resultado.items.push({siglas:con[0],votos:con[2]});
      });
      a.resultado.items.sort(function(a,b){return b.votos-a.votos;});
      return a;
    });
    return a;
  });
}
