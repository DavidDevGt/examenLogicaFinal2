const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let costos_semestre = [
  // Primer semestre
  ["Edificio LP","Enero",4500],
  ["Plaza América","Marzo",30000],
  ["Las Fuentes","Febrero",12500],
  ["Plaza América","Enero",18600],
  ["Las Fuentes","Febrero",35000],
  ["Edificio LP","Febrero",125000],
  ["Plaza América","Abril",39000],
  ["Las Fuentes","Mayo",17000],
  ["Las Fuentes","Junio",64300],

  // Segundo semestre
  ["Edificio LP","Julio",5500],
  ["Plaza América","Agosto",45000],
  ["Las Fuentes","Septiembre",23500],
  ["Plaza América","Octubre",25600],
  ["Las Fuentes","Noviembre",45000],
  ["Edificio LP","Diciembre",150000],
  ["Plaza América","Julio",49000],
  ["Las Fuentes","Agosto",27000],
  ["Las Fuentes","Diciembre",74300]
];

let proyectos = {};

costos_semestre.forEach(([proyecto, mes, costo]) => {
  if (!proyectos[proyecto]) {
    proyectos[proyecto] = new Array(12).fill(0);
  }
  proyectos[proyecto][meses.indexOf(mes)] += costo;
});

function generarReporte() {
  let semestre = document.querySelector("#semestreList").value;
  let inicio = semestre == 1 ? 0 : 6;
  let fin = semestre == 1 ? 6 : 12;


  let thead = document.querySelector("#reportTable thead");
  thead.innerHTML = '';
  let filaEncabezado = document.createElement("tr");
  let encabezados = ["Proyecto", ...meses.slice(inicio, fin), "Total"];
  encabezados.forEach(encabezado => {
    let th = document.createElement("th");
    th.textContent = encabezado;
    filaEncabezado.appendChild(th);
  });
  thead.appendChild(filaEncabezado);


  let reporte = [];
  for (let proyecto in proyectos) {
    let fila = [proyecto, ...proyectos[proyecto].slice(inicio, fin), proyectos[proyecto].slice(inicio, fin).reduce((a, b) => a + b, 0)];
    reporte.push(fila);
  }

  let tbody = document.querySelector("#reportTable tbody");
  tbody.innerHTML = '';
  reporte.forEach(fila => {
    let tr = document.createElement("tr");
    fila.forEach(celda => {
      let td = document.createElement("td");
      td.textContent = celda;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
