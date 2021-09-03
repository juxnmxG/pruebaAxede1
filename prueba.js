var elementos = {
  tabla: document.querySelector("#tabla"),
};

var acciones = {
  iniciar: () => {
    acciones.consumir();
    
  },

  consumir: async () => {
    let response = await fetch("http://localhost:3002/");
    let res = await response.json();
    console.log(res);
    acciones.mostrar(res);
  },

  mostrar: (data) => {

    let template = "";
    data.map(
      (dato) =>
        (template = `<tr>
      <td>${dato.nombre}</td>
      <td>${dato.disponibilidad}</td>
      <td>${dato.fecha}</td>
    </tr>`)
    );

    elementos.tabla.innerHTML += template;
  },
};

acciones.iniciar();
